import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ErrorMsg } from '@app/modules/app-common/constants/error-msg';
import { NavigationService } from '@app/modules/navigation/services';
import { SharedPermissionService } from '@app/modules/shared/services/shared-permission.service';
import _ from 'lodash';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AccessoriesStorageService } from './accessories-storage.service';

@Component({
  selector: 'sb-accessories-storage',
  templateUrl: './accessories-storage.component.html',
  styleUrls: ['./accessories-storage.component.scss']
})
export class AccessoriesStorageComponent implements OnInit {

  isAddStorage = false;
  isUpdateStorage: boolean = false;
  storageForm: FormGroup;
  defaultValueForm: any;
  submitted = false;
  rowsPerPageOptions = [5, 10, 15, 25]
  GetStorage: any;
  userInfo: any = {}
  constructor(private accessoriesStorage: AccessoriesStorageService, private navigate: NavigationService, private messageService: MessageService, public sharedPermission: SharedPermissionService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.storageForm = new FormGroup({
      accessoriesStorageId: new FormControl('', [Validators.required]),
      accessoriesName: new FormControl('', [Validators.required]),
      accessoriesStorage1: new FormControl('', [Validators.required]),
    });

    this.userInfo = this.navigate.getUserInfo();
    this.defaultValueForm = this.storageForm.value;
    this.GetStorageDetails();
    //this.UpdateStorage();
  }

  get accessoriesStorageId() { return this.storageForm.get('accessoriesStorageId') }
  get accessoriesName() { return this.storageForm.get('accessoriesName') }
  get accessoriesStorage1() { return this.storageForm.get('accessoriesStorage1') }

  get f() {
    return this.storageForm.controls;
  }

  get fv() {
    return this.storageForm.value;
  }
  onBackToList(hardReload: boolean = false) {
    this.isAddStorage = false;
    this.submitted = false;
    this.storageForm.patchValue(this.defaultValueForm);
    if (hardReload) {
      this.GetStorageDetails();
    }
  }


  AddStorageDetails(users: any) {
    this.isAddStorage = true;
    this.isUpdateStorage = false;

    this.resetForm();
    this.disabledEnableControl(true);
  }
  disabledEnableControl(isenable: boolean) {
    if (isenable) {
      this.storageForm.get('accessoriesStorageId')?.enable();

    } else {
      this.storageForm.get('accessoriesStorageId')?.disable();

    }
  }
  resetForm() {
    this.storageForm.patchValue(this.defaultValueForm);
  }


  GetStorageDetails() {
    this.accessoriesStorage.GetStorageAccessoriesDetails().subscribe(
      res => {
        this.GetStorage = res;
      },
      err => {
        this.GetStorage = err;
      }
    );
  }

  updatedData(item: any) {
    this.storageForm.patchValue(item);
    this.isAddStorage = true;
    this.isUpdateStorage = true;
    this.disabledEnableControl(true);
  }


  onSubmit() {
    this.submitted = true;
    if (this.storageForm.invalid) {
      return;
    }
    const postData = {
      ...this.fv
    }
    const existsList = _.find(this.GetStorage, ['accessoriesName', postData.accessoriesName]);
    if (existsList) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'This accessories name is already Exist..' });
      return;
    }
    this.accessoriesStorage.postData(postData).subscribe(res => {
      if (res.accessoriesStorageId > 0) {
        this.onBackToList(true);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Approval Saved successfully..' });
        this.GetStorageDetails();
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'This data is already Exist..' });
      }
    });
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
          this.accessoriesStorage.DeleteData('AccessoriesStorage/DeleteAccessoriesStorage?AccessoriesStorageId=' + item.accessoriesStorageId, '').subscribe(
            res => {
              if (res === true) {
                this.messageService.add({ severity: 'success', summary: 'Success', detail: ' Accessories Storage deleted succefully' });
                this.GetStorageDetails();

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





  UpdateTask() {

    if (this.storageForm.invalid) {
      return;
    }
    const UpdateTask = {
      ...this.fv,
      accessoriesStorageId: this.storageForm.get('accessoriesStorageId')?.value
    };
    if (UpdateTask.accessoriesStorageId > 0) {
      this.accessoriesStorage.UpdateData(UpdateTask).subscribe(res => {
        if (res) {
          this.onBackToList(true);
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Accessories Storage successfully updated ..' });
        }
        else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Update data failed..' });
        }
      });
    }
  }




}


