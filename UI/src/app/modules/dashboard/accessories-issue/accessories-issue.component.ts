import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ErrorMsg } from '@app/modules/app-common/constants/error-msg';
import { NavigationService } from '@app/modules/navigation/services';
import { SetupService } from '@app/modules/shared/services/setup.service';
import { SharedPermissionService } from '@app/modules/shared/services/shared-permission.service';
import { ItemsList } from '@ng-select/ng-select/lib/items-list';
import { url } from 'inspector';
import _ from 'lodash';
import moment from 'moment';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AccessoriesStorageService } from '../accessories-storage/accessories-storage.service';
import { AccessoriesIssueService } from './accessories-issue.service';

@Component({
  selector: 'sb-accessories-issue',
  templateUrl: './accessories-issue.component.html',
  styleUrls: ['./accessories-issue.component.scss']
})
export class AccessoriesIssueComponent implements OnInit {

  isAddApproval=false;
  isUpdateApproval: boolean = false;
  approvalForm:FormGroup;
  defaultValueForm: any;
  startOfCalenderYear: any;
  endOfCalenderYear: any;    
  submitted = false;
  getCount:any;
  Quantity:any;
  getApproval:any;
  getAstorage:any;
  getEmployee:any;
  accessoriesNameList: any[] = [];
  userInfo: any = {};
  constructor(private accessories:AccessoriesIssueService,private accessoriesStorage:AccessoriesStorageService,private setup1:SetupService,private navigate: NavigationService,private messageService: MessageService,public sharedPermission:SharedPermissionService,private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.approvalForm = new FormGroup({
        accessoriesId: new FormControl('', [Validators.required]),
       quantity: new FormControl('', [Validators.required]),
        employeeId: new FormControl('', [Validators.required]),
        accessoriesStorageId: new FormControl('', [Validators.required]),
        dateOfIssues: new FormControl(moment().format("MMM-y-d"),[Validators.required]),
      dateOfReturn: new FormControl(moment().format("MMM-y-d"),[Validators.required]),
      damageCharges:new FormControl('',[Validators.required]),
    });
   
    this.userInfo = this.navigate.getUserInfo();
    this.defaultValueForm = this.approvalForm.value;
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
     // this.getCountDetails();
     this.GetEmployeeDetails();
     this.GetAstorageDetails();
     this.GetApprovalDetails();     
   
    
  }
  get quantity() { return this.approvalForm.get('quantity') }
  get employeeId() { return this.approvalForm.get('employeeId') }
  get accessoriesStorageId() { return this.approvalForm.get('accessoriesStorageId') }
  get dateOfIssues() { return this.approvalForm.get('dateOfIssues') }
  get dateOfReturn() { return this.approvalForm.get('dateOfReturn') }
  get damageCharges() { return this.approvalForm.get('damageCharges') }

  get fv() {
    return this.approvalForm.value;
}
onBackToList(hardReload: boolean = false) {
    this.isAddApproval = false;
    this.submitted = false;
    this.approvalForm.patchValue(this.defaultValueForm);
    if (hardReload) {
      this.getApproval();
    }
  }


  AddApprovalDetails(users: any) {
    this.isAddApproval = true;
    this.isUpdateApproval = false;

    this.resetForm();
    this.disabledEnableControl(true);

}
disabledEnableControl(isenable: boolean) {
    if (isenable) {
        this.approvalForm.get('accessoriesId')?.enable();

    } else {
        this.approvalForm.get('accessoriesId')?.disable();

    }
}   
resetForm() {
    this.approvalForm.patchValue(this.defaultValueForm);
}

public GetApprovalDetails() {
  this.accessories.GetApproval().subscribe(
      res => {
        this.getApproval =  _.orderBy(res, ['date'], ['asc']);
        this.accessoriesNameList = _.uniqBy(res, 'accessoriesStorageId');
        
      },
      err => {
          this.getApproval = err;
      }
  );
}
public GetEmployeeDetails() {
  this.setup1.getData('Employee/GetEmployee').subscribe(
      res => {
          this. getEmployee=res;
      },
      err => {
          this. getEmployee = err;
      }
  );
}
public GetAstorageDetails() {
  this.accessoriesStorage.GetStorageAccessoriesDetails().subscribe(
      res => {
          this.getAstorage=res;
      },
      err => {
          this.getAstorage = err;
      }
  );
}
getCountDetails(){
    this.accessories.getCount('AccessoriesStorage/GetAccessoriesCount?AccessoriesStorageId',this.accessoriesStorageId).subscribe(
        res => {
          this.getCount = res;
        }
      )
}
totalCount(){
    var diff=this.getCount-this.Quantity;
    let totalC=diff;
}
    
onSubmit() {
  this.submitted = true;
  if (this.approvalForm.invalid) {
      return;
  }
  const insertData = {
      ...this.fv
  };
//   const existsList = _.find(this.getApproval, ['accessoriesStorageId', insertData.accessoriesStorageId]);
//   if (existsList) {
//       this.messageService.add({ severity: 'error', summary: 'Error', detail: 'This Accessories Name is already Exist..' });
//       return;
//   }
  this.accessories.postData(insertData).subscribe(res => {
      if (res.accessoriesId > 0) {
          this.onBackToList(true);
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Approved successfully..' });
      }
      else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'This data is already Exist..' });
      }
  });
}
onDeleted(event: Event, item: any) {
    this.confirmationService.confirm({
        target: event.target || undefined,
        message: 'Are you sure that you want to proceed?',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            //confirm action
            if (item) {
                this.accessories.DeleteData('AccessoriesStorage/DeleteAccessories?AccessoriesId=' + item.accessoriesId, '').subscribe(
                    res => {
                        if (res === true) {
                            this.messageService.add({ severity: 'success', summary: 'Success', detail: ' Accessories Approval deleted succefully' });
                            this.GetApprovalDetails();
  
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

 
     
                    
updateApproval() {
 this.submitted = true;
  if (this.approvalForm.invalid) {
      return;
  }
  const updateStorage = {
      ...this.fv,
      accessoriesId: this.approvalForm.get('accessoriesId')?.value
  };
  if (updateStorage.accessoriesId > 0) {
      this.accessories.UpdateData(updateStorage).subscribe(res => {
          if (res) {
              this.onBackToList(true);
              this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Storage details successfully Updated ..' });
          }
          else {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Update Data failed..' });
          }
      });
  }
}
updatedData(data: any) {
    this.approvalForm.patchValue(data);
    this.isAddApproval = true;
    this.isUpdateApproval = true;
    this.disabledEnableControl(true);
    this.approvalForm.get('dateOfIssues')?.setValue(moment(data.dateOfIssues).format('YYYY-MM-DD'));
    this.approvalForm.get('dateOfReturn')?.setValue(moment(data.dateOfReturn).format('YYYY-MM-DD'));

}
}

