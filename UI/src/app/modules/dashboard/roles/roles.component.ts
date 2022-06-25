import { Component, OnInit } from '@angular/core';
import { RoleService } from './role.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationService } from '@app/modules/navigation/services';
import { ConfirmationService, MessageService } from 'primeng/api';
import _ from 'lodash';
import { PermissionsService } from '../permissions/permissions.service';
import { Epermission, PERMISSION } from '@app/modules/shared/model/leave.model';
import { SharedPermissionService } from '@app/modules/shared/services/shared-permission.service';

@Component(
  {
  selector: 'sb-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss'],
  providers: [RoleService],
  })
export class RolesComponent implements OnInit
 {
  RolesList: any[] = [];
  RolesForm:FormGroup;
  getRole : any;
  isAddRole:boolean=false;
  isUpdateRole:boolean=false;
  IsAddEdit : boolean=false;
  submitted = false;
  defaultValueForm : any;
  isDeleteHide = false;
  userInfo: any;

  public enumPer=PERMISSION;
  public enumModule=Epermission;
  
  constructor(
    private fb: FormBuilder, 
    private getRoleService: RoleService, 
    private navigate: NavigationService,
    private confirmationService: ConfirmationService, 
    private messageService: MessageService, public sharedPermission:SharedPermissionService) 
    {           
      this.RolesForm = new FormGroup(
        {
        roleId: new FormControl(0),
        roleName: new FormControl('', [Validators.required]),    
        addedOn: new FormControl(new Date()),
        addedBy: new FormControl(),
        IsActive:new FormControl(false),
        } );
      
  this.userInfo = this.navigate.getUserInfo();
  this.defaultValueForm = this.RolesForm.value;
    }
    
  

  get formValues() 
  {
    return this.RolesForm.value;
  }

  ngOnInit(): void {this.GetRoleDetails();
this.UpdateRole();

  }  

  get getControl() {
    return this.RolesForm.controls;
}
get fv() {
    return this.RolesForm.value;
}
  
  public GetRoleDetails() 
  {
  
    this.getRoleService.GetRoleDetails().subscribe(
        res => {
            this.getRole = res;            
        },
        err => {
            this.getRole = err;
        }
    );
  }

  resetForm() {
    this.RolesForm.patchValue(this.defaultValueForm);
}

AddRole(users: any) 
{
  this.submitted=false;
  this.isAddRole = true;
  this.IsAddEdit=true;
  this.isUpdateRole = false;
  this.disabledEnableControl(false);
  this.resetForm();

}
onUpdate(data: any)  
{  
  this.isAddRole = false;
  this.isUpdateRole = true;
  this.IsAddEdit = true;
  this.disabledEnableControl(false);
  this.RolesForm.patchValue(data);  
}

disabledEnableControl(isenable: boolean) 
{
  if (isenable) { this.RolesForm.get('roleId')?.enable();} 
  else {this.RolesForm.get('roleId')?.disable(); }

}
onBackToList(IsReload: boolean = false) {
  this.submitted = false;
  this.isAddRole = false;
  this.IsAddEdit=false;
  if (IsReload) {
      this.GetRoleDetails();
  }
}

onSubmit() {
  this.submitted = true;
  if (this.RolesForm.invalid) {
      return;
  }
  const postData = {
      ...this.formValues,
      roleId:0,
      addedBy: this.RolesForm.get('addedBy')?.value
      
  };
  this.getRoleService.postData(postData).subscribe(res => {
      if (res.roleId > 0) { 
          this.onBackToList(true);
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Role saved successfully..' });       
      }
      else{
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Unable to save Role ..' });
        }
  });
}

UpdateRole() 
{
  this.submitted = true;
  if (this.RolesForm.invalid) 
  {
      return;
  }
  const roleUpdate = {
      ...this.formValues,
      roleId: this.RolesForm.get('roleId')?.value,
      isActive: this.RolesForm.get('IsActive')?.value,
      addedBy: this.RolesForm.get('addedBy')?.value
  };
  if (roleUpdate.roleId > 0) {
    roleUpdate.Isactive=true;
   
      this.getRoleService.UpdateRole(roleUpdate).subscribe(res => {
          if (res) {
              this.IsAddEdit=false;
              this.onBackToList(true);
              this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Role Updated Successfully ..' });
          }
          else {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Unable to update Role..' });
          }
         
          
      });
  }
}

DeleteRole(event: Event, item: any) {
  this.confirmationService.confirm({
      target: event.target || undefined,
      message: 'Are you sure that you want to proceed?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          // confirm action
          if (item) {
              this.getRoleService.DeleteRole(item).subscribe(res => {
                  if (res === true) {
                      this.messageService.add({
                          severity: 'success',
                          summary: 'Success',
                          detail: ' Role Deleted Sucessfully..',
                      });
                      this.GetRoleDetails();
                  } else {
                      this.messageService.add({
                          severity: 'error',
                          summary: 'Error',
                          detail: 'Unable to delete Role...',
                      });
                  }
              });
          }
      },
      reject: () => {
          // reject action
      },
  });
}



}
