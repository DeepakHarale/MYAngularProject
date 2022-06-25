import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Epermission, PERMISSION } from '@app/modules/shared/model/leave.model';
import { SetupService } from '@app/modules/shared/services/setup.service';
import { SharedPermissionService } from '@app/modules/shared/services/shared-permission.service';
import moment from 'moment';
import { ConfirmationService, MessageService } from 'primeng/api';
import * as _ from 'lodash';
import { MustMatch } from '../containers/change-password/must-match';
@Component({
  selector: 'sb-employee-register',
  templateUrl: './employee-register.component.html',
  styleUrls: ['./employee-register.component.scss']
})
export class EmployeeRegisterComponent implements OnInit {
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  mobileNoPattern = "^[0-9]{10}$";
  result: any;
  submitted = false;
  isErrorMessage = false;
  Getrole: any;
  public enumPer=PERMISSION;
  public enumModule=Epermission;
  
  formatDate = "YYYY-MM-DD";
  currentDate = moment().format(this.formatDate);

  route: any;
  isAddEmployee = false;
  dataList: any;
  isView = false;
  rowsPerPageOptions = [5, 10, 15, 25]
  registerEmployeeForm = this.fb.group({
    employeeNo: ['', [Validators.required]],
    employeeName: ['', [Validators.required]],
    mobileNo: ['', [Validators.required, Validators.pattern(this.mobileNoPattern)]],
    emailId: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
    password: ['123456', [Validators.required]],
    roleId: [null, [Validators.required]],
    gender: ['', [Validators.required]],
    joiningDate: ['', [Validators.required]],
    division: ['', [Validators.required]],
    department: ['', [Validators.required,Validators.maxLength(50)]],
    employeeStatus: ['', [Validators.required,Validators.maxLength(50)]],
    emergencyNo: ['', [Validators.required, Validators.pattern(this.mobileNoPattern)]],
    // emergencyNo:['',Validators.required, Validators.pattern(this.mobileNoPattern)]
    }, {
    validator: MustMatch('mobileNo', 'emergencyNo'),
  });
  errorExists = '';
  defaultFromValue: any;
  constructor(private setup: SetupService, 
              private fb: FormBuilder, private messageService: MessageService,
              private confirmationService: ConfirmationService ,
              public sharedPermission:SharedPermissionService) {

    this.defaultFromValue = this.registerEmployeeForm.value;
  }

  ngOnInit(): void {
    this.loadAlldataList();
    this.getRole();
   
 
  }

  loadAlldataList() {
    this.setup.getData('Employee/GetEmployee').subscribe(res => {
     this.dataList = _.orderBy(res, ['employeeNo'], ['asc']);
    })
  }

  getRole() {
    this.setup.getRole().subscribe(res => {
      this.Getrole = res;

    })
  }

  get f() {
    return this.registerEmployeeForm.controls;
  }
  get fv() {
    return this.registerEmployeeForm.value;
  }


  onSubmit() {
    this.submitted = true;
    this.errorExists = '';
    if (this.registerEmployeeForm.invalid) {
      return;
    }
    const postData = {
      ...this.fv,
      employeeNo: `AT${this.fv.employeeNo}`,
      password: '123456',
      roleId: this.fv.roleId
    };
    this.setup.postData('User/AddUserDetails', postData).subscribe(
      res => {
        if (res && res.statusCode === 500) {
          this.errorExists = res.message;
        } else {
          if (res > 0) {
            this.onBackToList(true);
          }
        }
      });
  }

  // onDeleted(event: Event, item: any) {
  //   this.confirmationService.confirm({
  //     target: event.target || undefined,
  //     message: 'Are you sure that you want to proceed?',
  //     icon: 'pi pi-exclamation-triangle',
  //     accept: () => {
  //       //confirm action
  //       if (item) {
  //         this.setup.postData('Employee/DeleteDocumentEmployee','').subscribe(
  //           res => {
  //             if (res === true) {
  //               this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Deleted Data successfully..' });
  //               this.loadAlldataList();

  //             } else {
  //               this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something wrong...' });
  //             }
  //           }
  //         )
  //       }
  //     },
  //     reject: () => {
  //       //reject action
  //     }
  //   });
  // }

  addEmployee() {
    this.registerEmployeeForm.get('joiningDate')?.setValue(this.currentDate);

    this.registerEmployeeForm.patchValue(this.defaultFromValue);
    this.isAddEmployee = true;
    this.submitted = false;
  }
  onBackToList(hardReload: boolean = false) {
    this.isAddEmployee = false;
    this.submitted = false;
    this.registerEmployeeForm.patchValue(this.defaultFromValue);
    if (hardReload) {
      this.loadAlldataList();
    }
  }
  

}
