import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators ,FormControl} from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { NavigationService } from '@app/modules/navigation/services';
import { Epermission, PERMISSION } from '@app/modules/shared/model/leave.model';
import { SetupService } from '@app/modules/shared/services/setup.service';
import { SharedPermissionService } from '@app/modules/shared/services/shared-permission.service';
import { environment } from 'environments/environment';
import moment from 'moment';

import { ConfirmationService, MessageService } from 'primeng/api';






@Component({
  selector: 'sb-view-details',
  templateUrl: './view-details.component.html',
  styleUrls: ['./view-details.component.scss'],
  providers: [DatePipe]
})
export class ViewDetailsComponent implements OnInit {
  value:Date | undefined;
  apiUrl = environment.mainUrl;
  employeeDetails: any;
  currentDate =  moment().subtract(18, 'years').format('yyyy-MM-DD');
  cpincodePattern = "/^\d{6}$/"
  rowsPerPageOptions = [5, 10, 15, 25];
  cols = [
    { field: 'documentType.documentName', header: 'Document Type' },
    { field: 'document.documentName', header: 'Document Name' },
    { field: 'document.universityName', header: 'University' },
    { field: 'document.percentage', header: 'Percentage' },
    { field: 'document.passYear', header: 'Pass Year' },
    { field: 'document.createdAt', header: 'Date' },
    { field: 'action', header: 'Action' }
  ];

  registerForm = this.fb.group({
    employeeId: [0],
    userId: [0],
    employeeNo: [''],
    employeeName: [''],
    mobileNo: [''],
    emailId: [''],
    firstName: ['', [Validators.required,Validators.max(50)]],
    middleName: [''],
    lastName: ['', [Validators.required,Validators.max(50)]],
    gender: ['', [Validators.required]],
    mothersName: [''],
    dateOfBirth:['', [Validators.required]],
    maritalStatus: ['', [Validators.required]],
    spouseName: [''],
    childName1: [''],
    childName2: [''],
    paddressLine1: ['', [Validators.required,Validators.maxLength(500)]],
    paddressLine2: [''],
    pcity: ['', [Validators.required,Validators.maxLength(50)]],
    pstate: ['', [Validators.required,Validators.maxLength(50)]],
    ppincode: ['', [Validators.required, Validators.minLength(6)]],
    isSameAddress: [false],
    caddressLine1: ['', [Validators.required,Validators.maxLength(500)]],
    caddressLine2: [''],
    ccity: ['', [Validators.required,Validators.maxLength(50)]],
    cpstate: ['', [Validators.required,Validators.maxLength(50)]],
    cpincode:['',[Validators.required, Validators.minLength(6)]],
    joiningDate: ['', [Validators.required]],
    division: [''],
    department: ['', [Validators.required,Validators.maxLength(50)]],
    employeeStatus: ['', [Validators.required,Validators.maxLength(50)]],
    emergencyNo:['',[Validators.required]],
    profilePhotoPath: [''],
    createdAt: new Date(),
    updatedAt: new Date(),
    roleName: ['']
  });
  userInfo: any;
  rowData:any = [];
  

  public enumPer=PERMISSION;
  public enumModule=Epermission;
  employeeId: any;
  isView = false;
  selectedDocument: any;
  fileType: any;
  display: boolean = false;
  submitted=false;
  e: any;
  constructor(private setup: SetupService, private dom: DomSanitizer, private Activatedroute: ActivatedRoute, 
    private fb: FormBuilder, private navigate: NavigationService, private datePipe: DatePipe,private messageService: MessageService,
    private confirmationService: ConfirmationService,public sharedPermission:SharedPermissionService) {
    this.userInfo = this.navigate.getUserInfo();
  }
  numberOnly(event: { which: any; keyCode: any; }): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode != 46 && charCode > 31 
      && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

  
omit_special_char(evnt:any)
{
   var k;
   document.all ? k = this.e.keyCode : k = this.e.which;
   return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57));
}
  ngOnInit(): void {
    this.employeeId = this.Activatedroute.snapshot.queryParamMap.get('id');
    if (Number(this.employeeId) > 0) {
      this.isView = true;
    }
   this.loadAlldataList();

  }
  loadAlldataList() {
    const employeeId = this.employeeId || this.userInfo?.employeeId;
    this.setup.getData(`Employee/GetEmployeeById/${employeeId}`).subscribe(res => {
      if (res) {
        this.registerForm.patchValue(res['employee']);
        if (res['employee']['joiningDate']) {
        this.registerForm.get('joiningDate')?.setValue(this.datePipe.transform(new Date(res['employee']['joiningDate']), 'yyyy-MM-dd'));
        }
        // console.log("joining date"+JSON.stringify(res))

        if (res['employee']['dateOfBirth']) {
          this.registerForm.get('dateOfBirth')?.setValue(this.datePipe.transform(new Date(res['employee']['dateOfBirth']), 'yyyy-MM-dd'));
        }
        const gender = res['employee']['gender'] || "";
        this.registerForm.get('gender')?.setValue(gender);

        const maritalStatus = res['employee']['maritalStatus'] || "";
        this.registerForm.get('maritalStatus')?.setValue(maritalStatus);
        const employeeStatus = res['employee']['employeeStatus'] || "";
        this.registerForm.get('employeeStatus')?.setValue(employeeStatus);
        this.employeeDetails = res;
      }
    })
  }
  get f() {
    return this.registerForm.controls;
  }
  get fv() {
    return this.registerForm.value;
  }

  // updateRecord() {
  //   const postData = {
  //     ...this.registerForm.value
  //   };
  //   if (postData.employeeId > 0) {
  //     this.setup.postData('Employee/UpdateEmployee', postData).subscribe(res => {
  //       console.log(res);
  //       this.loadAlldataList();
  //     });
  //   }
  // }

  updateRecord(event: Event) {
    // console.log("data => "+item);
    this.submitted =true;
    if (this.registerForm.invalid) {
      return;
    }
    this.confirmationService.confirm({
      target: event.target || undefined,
      message: 'Are you sure that you want to proceed?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        //confirm action
        const postData = {
          ...this.registerForm.value
        };
        if (postData.employeeId > 0) {
          this.setup.postData('Employee/UpdateEmployee', postData).subscribe(
            res => {
              if (res === true) {
                this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Update successfully..' });
                this.getViewDetail();
              } else {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something wrong...' });
              }
            }
          )
        }
      },
      reject: () => {
        //reject action
        console.log("reject");
      }
    });
  }
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    const postData = {
      "firstName": this.userInfo.firstName,
      "middleName": this.userInfo.middleName,
      "lastName" :this.userInfo.lastName,
      "gender":this.userInfo.gender,
      "mothersName":this.userInfo.mothersName,
      "dateOfBirth":this.userInfo.dateOfBirth,
      "maritalStatus":this.userInfo.maritalStatus,
      "spouseName": this.userInfo.spouseName,
      "childName1":this.userInfo.childName1,
     "childName2":this.userInfo.childName2,
      "paddressLine1":this.userInfo.paddressLine1,
      " paddressLine2":this.userInfo. paddressLine2,
      "pcity":this.userInfo.pcity,
      "pstate":this.userInfo.pstate,
      "ppincode":this.userInfo.ppincode,
      "caddressLine1":this.userInfo.caddressLine1,
      "caddressLine2":this.userInfo.caddressLine2,
      "ccity":this.userInfo.ccity,
      "cpstate":this.userInfo.cpstate,
      "cpincode":this.userInfo.cpincode,
      "joiningDate":this.userInfo.joiningDate,
      "department":this.userInfo.department,
      "division":this.userInfo.division,
      "employeeStatus":this.userInfo.employeeStatus

      // "middleName":this.userInfo.middleName
      // "oldPassword": this.registerForm.value.oldPassword,
      // "newPassword": this.registerForm.value.newPassword
    }
    this.setup.postData('User/ChangePassword', postData).subscribe(
      res => {
        if (res && res.message) {
          if (res.message === "Password change successfully") {
            this.submitted = false;
            this.messageService.add({ severity: 'success', summary: 'Service Message', detail: res.message });
            this.registerForm.reset();
          } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
          }

        }
      }
    )
  }
 
  getViewDetail() {
    if (this.userInfo) {
      this.setup.getData(`Employee/GetDocumentByEmployee/${this.userInfo?.employeeId}`).subscribe(res => {
        this.rowData = res;
      });
    }
  }
  onChangeSameAddress() {
    if (this.fv.isSameAddress) {
      this.registerForm.get('paddressLine1')?.setValue(this.fv.caddressLine1);
      this.registerForm.get('paddressLine2')?.setValue(this.fv.caddressLine2);
      this.registerForm.get('pcity')?.setValue(this.fv.ccity);
      this.registerForm.get('pstate')?.setValue(this.fv.cpstate);
      this.registerForm.get('ppincode')?.setValue(this.fv.cpincode);

    } else {
      this.registerForm.get('paddressLine1')?.setValue("");
      this.registerForm.get('paddressLine2')?.setValue("");
      this.registerForm.get('pcity')?.setValue("");
      this.registerForm.get('pstate')?.setValue("");
      this.registerForm.get('ppincode')?.setValue("");
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
  getSefUrl(url: string) {
    return this.dom.bypassSecurityTrustResourceUrl(url)
  }

  geturl() {
    return this.apiUrl + this.selectedDocument['document']['documentPath']
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


}