import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NavigationService } from '@app/modules/navigation/services';
import { SetupService } from '@app/modules/shared/services/setup.service';
import { environment } from 'environments/environment';
import { DomSanitizer } from '@angular/platform-browser';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SharedPermissionService } from '@app/modules/shared/services/shared-permission.service';
import { Epermission, PERMISSION } from '@app/modules/shared/model/leave.model';
import * as _ from 'lodash';

@Component({
  selector: 'sb-upload-document',
  templateUrl: './upload-document.component.html',
  styleUrls: ['./upload-document.component.scss']
})
export class UploadDocumentComponent implements OnInit {
  public enumPer=PERMISSION;
  public enumModule=Epermission;
  apiUrl = environment.mainUrl;
  display: boolean = false;
  selectedDocument: any;
  fileType:any = null;

  numberOnly(event: { which: any; keyCode: any; }): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode != 46 && charCode > 31
      && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }
  cols = [
    { field: 'documentType.documentName', header: 'Document Type' },
    { field: 'document.documentName', header: 'Document / Company Name' },
    { field: 'document.universityName', header: 'Bord /University Name/ Designation' },
    { field: 'document.percentage', header: 'Percentage' },
    { field: 'document.passYear', header: 'Passing /End Year' },
    { field: 'document.createdAt', header: 'Date' },
   // { field: 'action', header: 'Action' }
    {field:'edit',header:'Edit'},
    {field:'view',header:'View'},
    {field:'download',header:'Download'},
    {field:'delete',header:'Delete'}
  ];
  currentYear = new Date().getFullYear();
  rowData:any[]=[];
  submitted = false;
  isAddDocument = false;

  isView = false;
  userInfo: any;
  documentTypeList: any;
  passYearPattern = "^[0-9]{4}$"
  percentagePattern = " ^(100\.00|100\.0|100)|([0-9]{1,2}){0,1}(\.[0-9]{1,2}){0,1}$"
  uploadDocumentForm = this._fb.group({
    documentId: [0],
    employeeId: [0],
      documentTypeId: [1, [Validators.required]],
    documentName: ['', [Validators.required]],
    universityName: ['', [Validators.required]],
    percentage: [null, [Validators.required, Validators.min(40.00), Validators.max(99.99)]],
    passYear: [null, [Validators.required, Validators.maxLength(4), Validators.minLength(4), Validators.min(1950)
      , Validators.max(this.currentYear), Validators.pattern(this.passYearPattern)]],
    documentPath: [''],
    createdAt: [new Date()],
    updatedAt: [new Date()],
    file: [''],
  });
  documentLebel = {
    documentName: 'Document Name', documentNamePH: 'Enter a Document Name', documentNameRq: true,
    universityName:'Board/University Name',universityNamePH:'Enter a University Name',universityNameRq:true,
    percentage:'Percentage',percentagePH:'Enter a percentage',percentageRq:true,
    passYear:'Passing Year',passYearPH:'Enter a Passing Year',passYearRq:true,
    companyName:'Company Name',companyNamePH:'Enter a Company Name',companyNameRq:false,
    endYear:'End Year',endYearPH:'Enter a End Year',endYearRq:true,
    designation:'Designation',designationPH:'Enter a Designation',designationRq:true,
    otherDetails:'Other Details',otherDetailsPH:'Enter a Other Details',otherDetailsRq:true,
    cardNo:'Document No ',cardNoPH:'Enter a  Document No',cardNorq:true


  }
  permission = { add: false, edit: false, delete: false, view: false };

  InputValue: any;
  percentDone: number = 0;
  uploadSuccess: boolean = false;
  isLoader: boolean = false;
  rowsPerPageOptions = [5, 10, 15, 25]
  isDeleteHide = false;
  isUpdateDocument = false;
  defaultValueForm: any;
  constructor(private setup: SetupService, private navigate: NavigationService, private _fb: FormBuilder,
    private dom: DomSanitizer, private messageService: MessageService,
    private confirmationService: ConfirmationService,public sharedPermission:SharedPermissionService) {
    this.userInfo = this.navigate.getUserInfo();
    this.defaultValueForm = this.uploadDocumentForm.value;
  }
  get f() {
    return this.uploadDocumentForm.controls;
  }
  get fv() {
    return this.uploadDocumentForm.value;
  }
  resetForm() {
    this.uploadDocumentForm.patchValue(this.defaultValueForm);
  }


  ngOnInit(): void {
    this.checkDeleteOptionAvailable();
    this.getUserDetails();
    this.getEmployeeDocument();
    this.getDocmentType();
    this.selectDocumentType();
    // setTimeout(() => {
    //   this.getPermission();
    // }, 500)
  }
  getEmployeeDocument() {
    if (this.userInfo) {
      this.setup.getData(`Employee/GetDocumentByEmployee/${this.userInfo?.employeeId}`).subscribe(res => {
        this.rowData = _.orderBy(res, ['document.createdAt'], ['desc']);
      });
    }
  }

  
  getDocmentType() {
    this.setup.getData(`Employee/GetDocumentType`).subscribe(res => {
      if (res) {
        this.documentTypeList = res;

      }
    });
  }
  getUserDetails() {
    this.setup.getData(`User/GetUserById/${this.userInfo.userId}`).subscribe(res => {
      if (res && res?.userId > 0) {
        sessionStorage.setItem('userInfo', JSON.stringify(res));
        this.userInfo = res;
        //this.checkDeleteOptionAvailable();
      }
    })
  }
  onAddDocument() {
    this.isAddDocument = true;
    // this.resetForm();
    this.isUpdateDocument = true;
    this.fileValidation(true);
    //this.disabledEnableControl(true);
    this.resetForm();
    this.selectDocumentType();

  }
  myUploader(event: any) {
    this.submitted = true;
    this.isLoader = false;
    if (this.uploadDocumentForm.invalid) {

      return;
    }

    else {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: ' Document uploaded successfully..' });
    }

    const post = {
      ...this.uploadDocumentForm.value,
      documentId: 0,
      employeeId: this.userInfo?.employeeId
    };
    const formData = new FormData();
    const fileVToUpload = post.file as File;
    formData.append('file', fileVToUpload, fileVToUpload.name);
    formData.append('document.DocumentId', post.documentId);
    formData.append('document.DocumentTypeId', post.documentTypeId);
    formData.append('document.EmployeeId', post.employeeId);
    formData.append('document.DocumentName', post.documentName);
    formData.append('document.UniversityName', post.universityName);
    formData.append('document.Percentage', post.percentage);
    formData.append('document.PassYear', post.passYear);
    formData.append('document.DocumentPath', '');
    formData.append('document.CreatedAt', new Date().toUTCString());
    formData.append('document.UpdatedAt', new Date().toUTCString());
    this.isLoader = true;
    this.setup.postDataUpload('Employee/UploadDocumentEmployee', formData)
      .subscribe(response => {
        if (response.type === HttpEventType.UploadProgress) {
          this.percentDone = Math.round((100 * response.loaded) / response.total);
          console.log(this.percentDone, " this.percentDone");
          // tslint:disable-next-line: deprecation
        } else if (event instanceof HttpResponse) {
          this.uploadSuccess = true;
        }
        this.loadData(response['body']);
      });
  }
  onSelectFile(event: any) {
    if (event?.currentFiles && event?.currentFiles?.length > 0) {
      this.uploadDocumentForm.get('file')?.setValue(event?.currentFiles[0])
    } else {
      this.uploadDocumentForm.get('file')?.setValue(null)
    }
  }
  loadData(body: any) {
    if (!body) {
      return;
    } else {
      this.onBackToList(true);
    }
  }
  onBackToList(hardReload: boolean) {
    this.submitted = false;
    this.isAddDocument = false;
    this.isLoader = false;
    this.uploadSuccess = false;
    if (hardReload) {
      this.getEmployeeDocument();
    }
  }
  onView(item: any) {
    this.selectedDocument = item;
    if (item.document.documentPath) {
      let ext = item.document.documentPath.substring(item.document.documentPath.lastIndexOf('.') + 1);
      this.fileType = ext;
      this.display = true;
    }
  }
  download(doc: any): void {
    this.setup
      .download(this.apiUrl + doc['document']['documentPath'])
      .subscribe(blob => {
        const a = document.createElement('a')
        const objectUrl = URL.createObjectURL(blob)
        a.href = objectUrl
        let ext = doc['document']['documentPath'].substring(doc['document']['documentPath'].lastIndexOf('/') + 1);
        a.download = ext;
        a.click();
        URL.revokeObjectURL(objectUrl);
      })
  }
  onDeleted(event: Event, item: any) {
    this.confirmationService.confirm({
      target: event.target || undefined,
      message: 'Are you sure that you want to proceed?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        //confirm action
        if (item?.document) {
          this.setup.postData('Employee/DeleteDocumentEmployee', item?.document).subscribe(
            res => {
              if (res === true) {
                this.messageService.add({ severity: 'success', summary: 'Success', detail: ' Document deleted successfully..' });
                this.getEmployeeDocument();
              } else {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something wrong...' });
              }
            }
          )
        }
      },
      reject: () => {
        //reject action
      }
    });
  }
  
      UpdatedDocument(event: Event) 
      {
        console.log(this.uploadDocumentForm);
        this.submitted = true;
        if (this.uploadDocumentForm.invalid) {
            return;
        }
        const UpdateDocument = {
            ...this.fv,
            documentId: this.uploadDocumentForm.get('documentId')?.value
        };
        if (UpdateDocument.documentTypeId > 0) {
            this.setup.UpdateDoc(UpdateDocument).subscribe(res => {
                if (res) {
                    this.onBackToList(true);
                     this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Document list successfully updated ..' });
               }
                else {
                     this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Update Data failed..' });
               }
            });
        }
    }

  
  updatedData(data: any) {
    this.uploadDocumentForm.patchValue(data.document);
    this.fileValidation(false);
    console.log(data);
    console.log(data.uploadDocumentForm);
    this.isAddDocument = true;
    this.isUpdateDocument = false;
    this.disabledEnableControl(true);
    this.selectDocumentType();
  }

  disabledEnableControl(isenable: boolean) {
    if (isenable) {
      this.uploadDocumentForm.get('documentId')?.enable();

    } else {
      this.uploadDocumentForm.get('documentId')?.disable();
    }
  }
  fileValidation(file:boolean){
    if(file){
      this.uploadDocumentForm.get('file')?.setValidators([Validators.required])

    }
    else{
      this.uploadDocumentForm.get('file')?.setValidators(null)
    }
    this.uploadDocumentForm.get('file')?.updateValueAndValidity()
  }

  getSefUrl(url: string) {
    return this.dom.bypassSecurityTrustResourceUrl(url)
  }

  geturl() {
    return this.apiUrl + this.selectedDocument['document']['documentPath']
  }

  checkDeleteOptionAvailable() {
    var date1 = new Date(this.userInfo.createdAt);
    var date2 = new Date();
    var Time = date2.getTime() - date1.getTime();
    var Days = Time / (1000 * 3600 * 24); //Diference in Days
    this.isDeleteHide = false;
  }
  onClear() {
    this.resetForm();
  }
  selectDocumentType() {
    switch (this.fv.documentTypeId) {
      case 1: {
        // EducationDetails
        this.documentLebel.documentName = "Document Name";
        this.documentLebel.documentNamePH = "Enter a Document Name";
        this.documentLebel.documentNameRq = true;
        this.documentLebel.universityName="Board/University Name";
        this.documentLebel.universityNamePH="Enter a University Name";
        this.documentLebel.universityNameRq=true;
        // this.uploadDocumentForm.get('documentName')?.setValidators(null)
        this.documentLebel.percentage="Percentage";
        this.documentLebel.percentagePH="Enter a Percentage";
        this.documentLebel.percentageRq=true;
        // this.uploadDocumentForm.get('documentName')?.setValidators(null)
        this.documentLebel.passYear="Passing Year";
        this.documentLebel.passYearPH="Enter a Passing Year";
        this.documentLebel.passYearRq=true;

        this.uploadDocumentForm.get('documentTypeId')?.setValidators(Validators.required)  
        this.uploadDocumentForm.get('documentName')?.setValidators(Validators.required)
        this.uploadDocumentForm.get('universityName')?.setValidators(Validators.required)
        this.uploadDocumentForm.get('percentage')?.setValidators([Validators.required, Validators.min(40.00), Validators.max(99.99)])
        this.uploadDocumentForm.get('passYear')?.setValidators([Validators.required, Validators.maxLength(4), Validators.minLength(4), Validators.min(1950)
          , Validators.max(this.currentYear), Validators.pattern(this.passYearPattern)])


          // documentTypeId: [1, [Validators.required]],
          // documentName: ['', [Validators.required]],
          // universityName: ['', [Validators.required]],
          // percentage: [null, [Validators.required, Validators.min(40.00), Validators.max(99.99)]],
          // passYear: [null, [Validators.required, Validators.maxLength(4), Validators.minLength(4), Validators.min(1950)
          //   , Validators.max(this.currentYear), Validators.pattern(this.passYearPattern)]],
       


        this.updateValueAndValidity();
        return true;
      }
      case 2:{
        // ProfessionalDetails
        this.documentLebel.documentName="Company Name";
        this.documentLebel.documentNamePH="Enter a Company Name";
        this.documentLebel.documentNameRq=true;
        this.uploadDocumentForm.get('documentName')?.setValidators(null)
        this.documentLebel.universityName="Designation";
        this.documentLebel.universityNamePH="Enter a Designation";
        this.documentLebel.universityNameRq=true;
        // this.uploadDocumentForm.get('fromDate')?.setValidators(null)
        this.documentLebel.passYear="End Year";
        this.documentLebel.passYearPH="Enter a End Year";
        this.documentLebel.passYearRq=true;
         // this.uploadDocumentForm.get('fromDate')?.setValidators(null)
        this.documentLebel.percentage="";
         this.documentLebel.percentagePH="";
         this.documentLebel.percentageRq=true;

         this.uploadDocumentForm.get('documentTypeId')?.setValidators(Validators.required)  
        this.uploadDocumentForm.get('documentName')?.setValidators(Validators.required)
        this.uploadDocumentForm.get('universityName')?.setValidators(Validators.required)
        this.uploadDocumentForm.get('percentage')?.setValidators(null)
        this.uploadDocumentForm.get('passYear')?.setValidators([Validators.required, Validators.maxLength(4), Validators.minLength(4), Validators.min(1950)
          , Validators.max(this.currentYear), Validators.pattern(this.passYearPattern)])


           // documentTypeId: [1, [Validators.required]],
          // documentName: ['', [Validators.required]],
          // universityName: ['', [Validators.required]],
          // percentage: [null, [Validators.required, Validators.min(40.00), Validators.max(99.99)]],
          // passYear: [null, [Validators.required, Validators.maxLength(4), Validators.minLength(4), Validators.min(1950)
          //   , Validators.max(this.currentYear), Validators.pattern(this.passYearPattern)]],

         this.updateValueAndValidity();
        return true;
      }
      case 3:{
        // CompanyDocument
        this.documentLebel.documentName="Company Name";
        this.documentLebel.documentNamePH="Enter a Company Name ";
        this.documentLebel.documentNameRq=false;
        // this.uploadDocumentForm.get('documentName')?.setValidators(null)
        this.documentLebel.universityName="Designation";
        this.documentLebel.universityNamePH="Enter a Designation";
        this.documentLebel.universityNameRq=false;
        //  this.uploadDocumentForm.get('universityName')?.setValidators(null)
        this.documentLebel.passYear="End Year";
        this.documentLebel.passYearPH="Enter a End Year";
        this.documentLebel.passYearRq=false;
        // this.uploadDocumentForm.get('passYear')?.setValidators(null)
        this.documentLebel.percentage="";
        this.documentLebel.percentagePH="";
        this.documentLebel.percentageRq=false;
        // this.uploadDocumentForm.get('percentage')?.setValidators(null)


        this.uploadDocumentForm.get('documentTypeId')?.setValidators(Validators.required)  
        this.uploadDocumentForm.get('documentName')?.setValidators(Validators.required)
        this.uploadDocumentForm.get('universityName')?.setValidators(Validators.required)
        this.uploadDocumentForm.get('percentage')?.setValidators(null)
        this.uploadDocumentForm.get('passYear')?.setValidators([Validators.required, Validators.maxLength(4), Validators.minLength(4), Validators.min(1950)
          , Validators.max(this.currentYear), Validators.pattern(this.passYearPattern)])


           // documentTypeId: [1, [Validators.required]],
          // documentName: ['', [Validators.required]],
          // universityName: ['', [Validators.required]],
          // percentage: [null, [Validators.required, Validators.min(40.00), Validators.max(99.99)]],
          // passYear: [null, [Validators.required, Validators.maxLength(4), Validators.minLength(4), Validators.min(1950)
          //   , Validators.max(this.currentYear), Validators.pattern(this.passYearPattern)]],

        this.updateValueAndValidity();
        return true;
      }
      case 4:{
        // personaldocumet
        this.documentLebel.documentName="Document Name";
        this.documentLebel.documentNamePH="Enter a Document Name";
        this.documentLebel.documentNameRq=true;
        // this.uploadDocumentForm.get('documentName')?.setValidators(null)
        this.documentLebel.universityName="Document No";
        this.documentLebel.universityNamePH="Enter a Document No";
        this.documentLebel.universityNameRq=true;
        // this.uploadDocumentForm.get('fromDate')?.setValidators(null)
        this.documentLebel.percentage="";
        this.documentLebel.percentagePH="";
        this.documentLebel.percentageRq=false;
         // this.uploadDocumentForm.get('fromDate')?.setValidators(null)
        this.documentLebel.passYear="";
        this.documentLebel.passYearPH="";
        this.documentLebel.passYearRq=false;

        this.uploadDocumentForm.get('documentTypeId')?.setValidators(Validators.required)  
        this.uploadDocumentForm.get('documentName')?.setValidators(Validators.required)
        this.uploadDocumentForm.get('universityName')?.setValidators(Validators.required)
        this.uploadDocumentForm.get('percentage')?.setValidators(null)
        this.uploadDocumentForm.get('passYear')?.setValidators(null)

             // documentTypeId: [1, [Validators.required]],
          // documentName: ['', [Validators.required]],
          // universityName: ['', [Validators.required]],
          // percentage: [null, [Validators.required, Validators.min(40.00), Validators.max(99.99)]],
          // passYear: [null, [Validators.required, Validators.maxLength(4), Validators.minLength(4), Validators.min(1950)
          //   , Validators.max(this.currentYear), Validators.pattern(this.passYearPattern)]],

        this.updateValueAndValidity();
        return true;
      }

      default: {
        this.documentLebel.documentName = "Document Name";
        this.documentLebel.documentNamePH = "Enter a Document Name";
        this.documentLebel.documentNameRq = true;
        // this.uploadDocumentForm.get('documentName')?.setValidators(null)
        this.documentLebel.universityName="University Name";
        this.documentLebel.universityNamePH="Enter a University Name";
        this.documentLebel.universityNameRq=true;
        // this.uploadDocumentForm.get('documentName')?.setValidators(null)
        this.documentLebel.percentage="Percentage";
        this.documentLebel.percentagePH="Enter a Percentage";
        this.documentLebel.percentageRq=true;
        // this.uploadDocumentForm.get('documentName')?.setValidators(null)
        this.documentLebel.passYear="Passing Year";
        this.documentLebel.passYearPH="Enter a Passing Year";
        this.documentLebel.passYearRq=true;

        this.uploadDocumentForm.get('documentTypeId')?.setValidators(Validators.required)  
        this.uploadDocumentForm.get('documentName')?.setValidators(Validators.required)
        this.uploadDocumentForm.get('universityName')?.setValidators(Validators.required)
        this.uploadDocumentForm.get('percentage')?.setValidators([Validators.required, Validators.min(40.00), Validators.max(99.99)])
        this.uploadDocumentForm.get('passYear')?.setValidators([Validators.required, Validators.maxLength(4), Validators.minLength(4), Validators.min(1950)
          , Validators.max(this.currentYear), Validators.pattern(this.passYearPattern)])

             // documentTypeId: [1, [Validators.required]],
          // documentName: ['', [Validators.required]],
          // universityName: ['', [Validators.required]],
          // percentage: [null, [Validators.required, Validators.min(40.00), Validators.max(99.99)]],
          // passYear: [null, [Validators.required, Validators.maxLength(4), Validators.minLength(4), Validators.min(1950)
          //   , Validators.max(this.currentYear), Validators.pattern(this.passYearPattern)]],




        this.updateValueAndValidity();
        return true;

      }
    }
    
  }
  updateValueAndValidity(){
    this.uploadDocumentForm.get('documentName')?.updateValueAndValidity();
    this.uploadDocumentForm.get('universityName')?.updateValueAndValidity();
    this.uploadDocumentForm.get('percentage')?.updateValueAndValidity();
    this.uploadDocumentForm.get('passYear')?.updateValueAndValidity();
    this.uploadDocumentForm.get('companyName')?.updateValueAndValidity();
    this.uploadDocumentForm.get('fromDate')?.updateValueAndValidity();
    this.uploadDocumentForm.get('toDate')?.updateValueAndValidity();
    this.uploadDocumentForm.get('otherDetails')?.updateValueAndValidity();
    this.uploadDocumentForm.get('cardNo')?.updateValueAndValidity();

  }
//   getPermission() {
//     const documentPermission = this.sharedPermission.getPermission(Epermission.Document);

//     documentPermission.permissionList.forEach((item: any) => {
//       if (item.permissionId == 1) {
//         this.permission.add = item.apprvedStatus;
//       }
//       if (item.permissionId == 2) {
//         this.permission.edit = item.apprvedStatus;
//       }
//       if (item.permissionId == 3) {
//         this.permission.delete = item.apprvedStatus;
//       }
//       if (item.permissionId == 4) {
//         this.permission.view = item.apprvedStatus;
//       }
//     })

// }
 }

function data(data: any, any: any) {
  throw new Error('Function not implemented.');
}

