import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DeleteMsg } from '@app/modules/app-common/constants/delete-msg';
import { ErrorMsg } from '@app/modules/app-common/constants/error-msg';
import { NavigationService } from '@app/modules/navigation/services';
import { SharedPermissionService } from '@app/modules/shared/services/shared-permission.service';
import moment from 'moment';
import { ConfirmationService, MessageService } from 'primeng/api';
import { GenerateDocumentService } from './generate-document.service';

@Component({
  selector: 'sb-genrate-documents',
  templateUrl: './genrate-documents.component.html',
  styleUrls: ['./genrate-documents.component.scss'],
  providers: [GenerateDocumentService],
})
export class GenrateDocumentsComponent implements OnInit {
  isAddOfficialDocument= false;
  isUpdateDocument: boolean =false;
  userInfo: any = {};
  defaultValueForm: any;
  GetOfficialDocument:any;
  submitted:any;
  OfficialDocumentForm:FormGroup;

  constructor(private fb: FormBuilder,private getDocumentService:GenerateDocumentService,private navigate: NavigationService,private confirmationService: ConfirmationService,
    private messageService: MessageService, public sharedPermission:SharedPermissionService) { 
      this.OfficialDocumentForm=new FormGroup({
          documentId:new FormControl(0),
          referenceNo:new FormControl('',[Validators.required]),
          documentName:new FormControl('',[Validators.required, Validators.maxLength(50)]),
          employeeName:new FormControl('',[Validators.required, Validators.maxLength(50)]),
          designation:new FormControl('',[Validators.required]),
          documentDate:new FormControl('', [Validators.required]),
          ctc:new FormControl('',[Validators.required]),
          emailId:new FormControl('',[Validators.required]),
          mobileNo:new FormControl('',[Validators.required]),
          status:new FormControl('',[Validators.required])

      });
      this.userInfo = this.navigate.getUserInfo();
        this.defaultValueForm = this.OfficialDocumentForm.value;
    }

    //get documentName() { return this.OfficialDocumentForm.get('documentName') }
    get documentDate() { return this.OfficialDocumentForm.get('date') }

    get f() {
      return this.OfficialDocumentForm.controls;
  }
  get fv() {
      return this.OfficialDocumentForm.value;
  }

  startOfCalenderYear: any;
  endOfCalenderYear: any;    

  ngOnInit(){
    this.GetOfficialDocuments();
    const newDate = new Date();
    const currentMonth = new Date().getMonth();
    const currentDate: Date = new Date();
    var currentYear = currentDate.setFullYear(currentDate.getFullYear());

    if (newDate.getMonth() < 3) {
        this.startOfCalenderYear = moment(moment(currentYear).subtract(1, 'years').format("YYYY") + "-01-01", "YYYY-MM-DD");
        this.endOfCalenderYear = moment(moment(currentYear).format("YYYY") + "-12-31", "YYYY-MM-DD");
    }
    else {
        this.startOfCalenderYear = moment(moment(currentYear).format("YYYY") + "-01-01", "YYYY-MM-DD");
        this.endOfCalenderYear = moment(moment(currentYear).add(1, 'years').format("YYYY") + "-12-31", "YYYY-MM-DD");
    }
        
  }
  onBackToList(hardReload: boolean = false) {
    this.isAddOfficialDocument = false;
    this.submitted = false;
    this.OfficialDocumentForm.patchValue(this.defaultValueForm);
    if (hardReload) {
      this.GetOfficialDocuments();
    }
  }

  public GetOfficialDocuments() {
    this.getDocumentService.GetOfficialDocument().subscribe(
        res => {
            this.GetOfficialDocument = res;
        },
        err => {
            this.GetOfficialDocument = err;
        }
    );
    // console.log("data=>",this.GetOfficialDocument)
}

  AddOfficialDocument(users: any) {
    this.isAddOfficialDocument = true;
    this.isUpdateDocument = false;

    this.resetForm();
    this.disabledEnableControl(true);

}
disabledEnableControl(isenable: boolean) {
  if (isenable) {
      this.OfficialDocumentForm.get('documentId')?.enable();

  } else {
      this.OfficialDocumentForm.get('documentId')?.disable();

  }
}   
  resetForm() {
    this.OfficialDocumentForm.patchValue(this.defaultValueForm);
  }

  onSubmit() {
    this.submitted = true;
    if (this.OfficialDocumentForm.invalid) {
        return;
    }
    const postData = {
        ...this.fv
    };
    this.getDocumentService.postData(postData).subscribe(res => {
        if (res.documentId > 0) {
            this.onBackToList(true);
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Holiday details Saved successfully..' });
        }
        else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'This data is already Exist..' });
        }
    });

    this.GetOfficialDocuments();
}



updatedData(data: any) {
  this.OfficialDocumentForm.patchValue(data);
  this.isAddOfficialDocument = true;
  this.isUpdateDocument = true;
  this.disabledEnableControl(true);
  this.OfficialDocumentForm.get('date')?.setValue(moment(data.date).format('YYYY-MM-DD'));
}
UpdateDocument() {
    // this.submitted = true;
    if (this.OfficialDocumentForm.invalid) {
        return;
    }
    const updateDocs = {
        ...this.fv,
        documentId: this.OfficialDocumentForm.get('documentId')?.value
    };
    if (updateDocs.documentId > 0) {
        this.getDocumentService.UpdateData(updateDocs).subscribe(res => {
            if (res) {
                this.onBackToList(true);
                this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Holiday details successfully Updated ..' });
            }
            else {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Update Data failed..' });
            }
        });
    }
}

isDeleteHide = false;




onDeleted(event: Event, item: any) {
    this.confirmationService.confirm({
        target: event.target || undefined,
        message: 'Are you sure that you want to proceed?',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            //confirm action
            if (item) {
                this.getDocumentService.deletedata('OfficialDocument/DeleteOfficialDocument?DocumentId=' + item.documentId, '').subscribe(
                    res => {
                        if (res === true) {
                            this.messageService.add({ severity: 'success', summary: 'Success', detail: DeleteMsg.deleteDataSuccessfully });
                            this.GetOfficialDocuments();

                        } else {
                            this.messageService.add({ severity: 'error', summary: 'Error', detail: ErrorMsg.somethingWentWrong });
                        }
                    }
                )
            }
        },
        reject: () => {

        }
    });
}

}
