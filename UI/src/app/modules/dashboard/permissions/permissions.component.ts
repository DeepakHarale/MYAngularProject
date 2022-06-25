import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationService } from '@app/modules/navigation/services';
import { SetupService } from '@app/modules/shared/services/setup.service';
import { SharedPermissionService } from '@app/modules/shared/services/shared-permission.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PermissionsService } from './permissions.service';

@Component({
  selector: 'sb-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.scss']
})
export class PermissionsComponent implements OnInit {
  roleId: any = 1;
  Getrole: any;
  isView = false;
  isAddPermission = false;
  getPermission: any;
  submitted = false;
  isDeleteHide = false;
  checks = true;
  moduleDetils: any
  userInfo: any;

  constructor(private setup: SetupService,
    private fb: FormBuilder, private permissionservice: PermissionsService,
    private messageService: MessageService,  public navigationService: NavigationService,
    private sharedPermissionService:SharedPermissionService) {
      this.userInfo = this.navigationService.getUserInfo();
  }

  ngOnInit(): void {
    this.getRole();
    this.getModuleDetails();
  }

  getModuleDetails() {
    this.moduleDetils = [];
    if (this.roleId > 0) {
      this.permissionservice.getModuleDetails(this.roleId).subscribe(res => { this.moduleDetils = res; });
    }
  }

  getRole() {
    this.setup.getData('User/GetRoles').subscribe(res => {
      this.Getrole = res;
    });
  }
  public GetPermissionDetails() {
    this.permissionservice.GetPermissionDetails().subscribe(
      res => {
        this.getPermission = res;
      },

    );
  }

  AddPermission(users: any) {
    this.isAddPermission = true;
  }

  onSubmit() {
    this.submitted = true;
    if (!this.roleId || ((this.moduleDetils || []).length <= 0)) {
      return;
    }

    this.permissionservice.AddPermission(this.roleId, this.moduleDetils).subscribe(res => {  
       this.sharedPermissionService.getModuleDetails(this.userInfo.roleId);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Permission successfully assigned.' });

        // this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Save  data failed..' });
      
    });
  }

  onBackToList(hardReload: boolean = false) {
    this.submitted = false;
    this.isAddPermission = false;
    if (hardReload) {
      this.GetPermissionDetails();
    }
  }

  bulk(e: any) {
    if (e.target.checked == true) {
      this.moduleDetils.forEach((el:any) => {
        el.permissionList.forEach((item:any) => {
        item.apprvedStatus=true;
          
        });
        return el;
      });
    }

    else {
      this.moduleDetils.forEach((el:any) => {
        el.permissionList.forEach((item:any) => {
        item.apprvedStatus=false;
          
        });
        return el;
      });

    }
  }

}
