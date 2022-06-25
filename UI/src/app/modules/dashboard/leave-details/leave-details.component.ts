import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationService } from '@app/modules/navigation/services';
import { EmplyeeLeaveDTO, LeaveDetail, LeaveDTO, LeaveType, LeaveTypeEnum, MaleFemaleEnum, PERMISSION } from '@app/modules/shared/model/leave.model';
import { UserDTO } from '@app/modules/shared/model/user.model';
import { SetupService } from '@app/modules/shared/services/setup.service';
import { SharedPermissionService } from '@app/modules/shared/services/shared-permission.service';
import moment from 'moment';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Epermission } from '@app/modules/shared/model/leave.model';
import { ErrorMsg } from '@app/modules/app-common/constants/error-msg';
import { DeleteMsg } from '@app/modules/app-common/constants/delete-msg';
import { JsonpClientBackend } from '@angular/common/http';

@Component({
  selector: 'sb-leave-details',
  templateUrl: './leave-details.component.html',
  styleUrls: ['./leave-details.component.scss']
})
export class LeaveDetailsComponent implements OnInit {

  public enumPer = PERMISSION;
  public enumModule = Epermission;

  LWS: any;
  leaveTypesList: LeaveType[] = [];
  availableLeaveList: EmplyeeLeaveDTO[] = [];//leaveId ;leaveCount;
  empGender: any; // for employee gender
  leaveBalanceValidation: boolean = false;
  oneFullHalfDayBox: boolean = false;
  leaveDetailsList: LeaveDTO[] = [];
  userInfo!: UserDTO;
  falseDate: boolean = false;
  isAddedLeave: boolean = false;
  isUpdateLeave: boolean = false;
  fromDate = new Date();
  formatDate = "YYYY-MM-DD";
  currentDate = moment().format(this.formatDate);
  defaultValueForm: any;
  submitted: boolean = false;
  addButton: boolean = false;
  rowsPerPageOptions = [5, 10, 15, 25];

  StartYear: any;
  EndYear: any;

  startOfCalenderYear: any;
  endOfCalenderYear: any;

  leaveDetailForm: FormGroup = this.fb.group({
    "leaveId": 0,
    "leaveTypeId": ['', Validators.required],
    "leaveTypeFrom": ['Full Day', Validators.required],
    "fromDate": this.currentDate,
    "leaveTypeTo": ['Full Day', Validators.required],
    "toDate": this.currentDate,
    "leaveDescription": ['', Validators.required],
    "employeeId": null,
    "createdBy": null,
    "createdOn": this.currentDate,
    totalDays: 1
  });
  selectedLeaveType: any;
  isShowLeaveBal: boolean = false;
  isShowLeaveCount = false;
  EarnedLeave: any;
  selectedCount: number = 0;

  constructor(private fb: FormBuilder,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private setupService: SetupService,
    public sharedPermission: SharedPermissionService,
    private navigate: NavigationService) {
    this.userInfo = this.navigate.getUserInfo();
    this.leaveDetailForm.get('employeeId')?.setValue(this.userInfo.employeeId);
    this.leaveDetailForm.get('createdBy')?.setValue(this.userInfo.userName);
    this.defaultValueForm = this.leaveDetailForm.value;
  }

  ngOnInit(): void {
    this.getAllDetails();
  }

  leaveManupulation() {
    this.GetLeaveById();
    this.getLeaveTypes();
    this.getAvailableLeaves();
    this.addButton = false;

    //  //*****************THIS CODE FOR (APRIL TO MARCH) FINANCIAL YEAR ,BUT CURRENT YEAR *************************** */
    // var currentYear = moment().set({'year': 2023})                 //to test next year changes
    const currentMonth = new Date().getMonth();
    const currentDate1: Date = new Date();
    var currentYear = currentDate1.setFullYear(currentDate1.getFullYear());
    if (currentMonth < 3) {
      this.StartYear = moment(currentYear).subtract(1, 'years').format("YYYY");
      // this.startOfCalenderYear = moment(this.StartYear+"-04-01","YYYY-MM-DD");
      this.endOfCalenderYear = moment(moment(currentYear).format("YYYY") + "-03-31", "YYYY-MM-DD");
    }
    else {
      this.EndYear = moment(currentYear).add(1, 'years').format("YYYY");
      // this.startOfCalenderYear = moment(moment(currentYear).format("YYYY")+"-04-01","YYYY-MM-DD");
      this.endOfCalenderYear = moment(this.EndYear + "-03-31", "YYYY-MM-DD");
    }
    //******************************************************************************************************************
  }
  //----------------------------Get Leave and Employee Data -------------------------------------------------
  getAllDetails() {
    this.setupService.getData('Employee/GetEmployeeById/' + this.userInfo.employeeId).subscribe(
      (res) => {
        this.empGender = res['employee']['gender'];
        this.leaveManupulation();
      }
    )
  }
  // ------------------------------For Add Leave Button--------------------------------------
  onAddLeave() {
    this.getAvailableLeaves();
    this.isShowLeaveBal = false;
    this.addButton = true;
    this.isUpdateLeave = false;
    this.leaveBalanceValidation = false;
    this.resetForm();
  }
  /**
   * @method - this method is for leave type dropdown 
   */
  GetLeaveById() {
    this.setupService.getData('Leave/GetLeaveById/' + this.userInfo.employeeId).subscribe(
      (res: LeaveDTO[]) => {
        this.leaveDetailsList = res;
      }
    )
  }
  // ----------------------------GET LEAVE COUNT -----------------------------
  getAvailableLeaves() {
    this.setupService.getData('LeaveManagement/AvailableLeaves/' + this.userInfo.employeeId).subscribe(
      res => {
        this.availableLeaveList = res;
      }
    )
  }
  //-------------------------------Get Leaves Type drop down------------------------------
  getLeaveTypes() {
    this.leaveTypesList.length = 0;

    this.setupService.getData('Leave/LeaveType').subscribe(result => {
      if (this.empGender === MaleFemaleEnum.MALE) {
        this.leaveTypesList = result.filter((leaveType: any) => {
          return leaveType.leaveName != LeaveTypeEnum.Miscariage && leaveType.leaveName != LeaveTypeEnum.Matternity && leaveType.leaveName!=LeaveTypeEnum.Annivarsary;
        });
      } else {
        this.leaveTypesList = result.filter((leaveType: any) => {
          return leaveType.leaveName != LeaveTypeEnum.Paternity && leaveType.leaveName!=LeaveTypeEnum.Annivarsary;
        });
      }
    });
  }

  get ld() {
    return this.leaveDetailForm.controls;
  }
  get formValue() {
    return this.leaveDetailForm.value;
  }

  resetForm(reload = false) {
    this.leaveBalanceValidation = false;
    this.isShowLeaveCount = false

    this.leaveDetailForm.patchValue(this.defaultValueForm);
    this.isUpdateLeave = false;
    if (reload) {
      this.GetLeaveById();
      this.getAvailableLeaves();            //To get latest leaveCount
    }
  }
//-------------------------------Full Day, Half Day ,TotalDays Logic------------------
  onChangeCount(type: any) {
    this.falseDate = false;
    if (this.formValue.leaveTypeTo == "Half Day") {
      this.oneFullHalfDayBox = true;
    }
    if (this.formValue.fromDate && this.formValue.toDate) {
      if (type == 'f') {
        if (this.formValue.toDate < this.formValue.fromDate) {
          this.leaveDetailForm.get('toDate')?.setValue(this.formValue.fromDate);
        }
      }
      var diff = Math.abs(new Date(this.formValue.fromDate).getTime() - new Date(this.formValue.toDate).getTime());
      var diffDays = Math.ceil(diff / (1000 * 3600 * 24));

      let t = diffDays + 1;

      if (this.formValue.leaveTypeFrom == 'Half Day' || this.formValue.leaveTypeTo == 'Half Day') {
        t = (t - 0.5);
      }
      if (this.formValue.leaveTypeFrom == 'Half Day' && this.formValue.leaveTypeTo == 'Half Day') {
        t = (t - 0.5);
      }
      if (this.formValue.fromDate == this.formValue.toDate && this.formValue.leaveTypeFrom == 'Half Day') {
        t = 0.5;
      }
      if (this.formValue.fromDate == this.formValue.toDate && this.formValue.leaveTypeFrom == 'Full Day') {
        t = 1;
      }
      this.leaveDetailForm.patchValue({
        ...this.formValue,
        totalDays: t
      });
    }
  }
// -----------------------------------TotalDays Function--------------------------------
  totalCountDisplay(item: any) {
    var diff = Math.abs(new Date(item.leave.fromDate).getTime() - new Date(item.leave.toDate).getTime());
    var diffDays = Math.ceil(diff / (1000 * 3600 * 24));
    let t = diffDays + 1;
    if (item.leave.leaveTypeFrom == 'Half Day') {
      t = (t - 0.5);
    }
    if (item.leave.leaveTypeTo == 'Half Day') {
      t = (t - 0.5);
    }
    return t;
  }

  onLeaveTypeChange(data: any) {
    this.isShowLeaveCount = true;
    if (data == '') {
      this.isShowLeaveCount = false;
      return;
    }
    this.isShowLeaveBal = true;
    this.availableLeaveList.find((x) => {
      if (data == x.leaveId) {
        this.LWS = x.leaveId;
        this.selectedCount = Number(x.leaveCount);
      }
    });
    this.leaveBalanceValidation = false;
    if (this.selectedCount <= 0) {
      
      if (this.LWS == 3 || this.LWS == 6||this.isShowLeaveCount) {
        this.leaveBalanceValidation = false;  //this will not display errormsg on leaveId=3,6
        return;
      } else {
        this.leaveBalanceValidation = true;
        this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'You dont have enough leave balance' });
      }
    }
  }

  LeaveDetailsSubmit(): void {
    this.submitted = true;
    if (this.leaveDetailForm.invalid || this.falseDate) {
      return;
    }

    if (this.leaveBalanceValidation == true||(this.selectedCount < this.formValue.totalDays)) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'You are applying for more leave than your current leave balance' });
    }
    else {
      if (this.validation()) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'You already applied leave on this date' });
        return;
      }
      const total = this.selectedCount - (this.formValue.totalDays);

      const postData: LeaveDetail = {
        ...this.formValue,

        employeeId: this.userInfo.employeeId,
        createdBy: this.userInfo.userName,
        createdOn: new Date(),
        leaveStatus: 'PENDING',
        leaveBalance: total
      };

      this.setupService.postData('Leave/LeaveDetail', postData).subscribe(
        (res: LeaveDetail) => {
          if (res && res.leaveId > 0) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Leave applied successfully..' });
            this.getAvailableLeaves();
            this.resetForm(true);
            this.addButton = false;
          }
        });


    }
  }
//--------------------validate FromDate - ToDate---------------------------------------------------------------
  validation(isEdit = false) {
    let isvalid = false;
    (this.leaveDetailsList || []).forEach((item: any, i: number) => {
      const dates = this.enumerateDaysBetweenDates(moment(item.leave.fromDate), moment(item.leave.toDate));
      if (!isEdit) {
        if (dates.includes(moment(this.formValue.fromDate).format(this.formatDate)) || dates.includes(moment(this.formValue.toDate).format(this.formatDate))) {
          isvalid = true;
        }
      }
      if (isEdit && item.leave.leaveId != this.formValue.leaveId) {
        if (dates.includes(moment(this.formValue.fromDate).format(this.formatDate)) || dates.includes(moment(this.formValue.toDate).format(this.formatDate))) {
          isvalid = true;
        }
      }
    });
    return isvalid;
  }
  enumerateDaysBetweenDates(startDate: any, endDate: any) {
    var dates = [];
    while (startDate.format(this.formatDate) !== endDate.format(this.formatDate)) {
      dates.push(startDate.format(this.formatDate));
      startDate = startDate.add(1, 'days');
    }
    dates.push(endDate.format(this.formatDate));
    return dates;
  }

  onDeleted(event: Event, item: any) {
    this.confirmationService.confirm({
      target: event.target || undefined,
      message: 'Are you sure that you want to proceed?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        //confirm action
        if (item) {
          this.setupService.postData('Leave/DeleteLeaveDetail?LeaveId=' + item.leave.leaveId, '').subscribe(
            res => {
              if (res === true) {
                this.messageService.add({ severity: 'success', summary: 'Success', detail: DeleteMsg.deleteDataSuccessfully });
                this.GetLeaveById();

              } else {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: ErrorMsg.somethingWentWrong });
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
  leaveTotal: any;
  editLeave() {
    this.submitted = true;
    if (this.leaveDetailForm.invalid || !this.formValue.leaveId) {
      return;
    }
    if (this.validation(true)) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Leave already  applied at the same date' });
      return;
    }
    const postData = {
      "leaveId": this.formValue.leaveId,
      "leaveTypeId": this.formValue.leaveTypeId,
      "leaveTypeFrom": this.formValue.leaveTypeFrom,
      "fromDate": this.formValue.fromDate,
      "leaveTypeTo": this.formValue.leaveTypeTo,
      "toDate": this.formValue.toDate,
      "leaveDescription": this.formValue.leaveDescription,
      "employeeId": this.userInfo.employeeId,
      "createdBy": this.userInfo.userName,
      "createdOn": new Date(),
      "totalDays": this.formValue.totalDays,
      leaveStatus: 'PENDING',
    };
    this.setupService.postData('Leave/UpdateLeaveDetail', postData).subscribe(res => {
      if (res) {
        this.resetForm(true);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Update Data successfully..' });
        this.getAvailableLeaves();
      } else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Update Data failed..' });
      }
    });
    this.addButton = false
  }

  UpdateLeave(data: any) {
    this.isShowLeaveCount = false
    this.addButton = true;
    this.leaveDetailForm.patchValue(data.leave);
    this.leaveDetailForm.get('fromDate')?.setValue(moment(data.leave.fromDate).format('YYYY-MM-DD'));
    this.leaveDetailForm.get('toDate')?.setValue(moment(data.leave.toDate).format('YYYY-MM-DD'));
    this.onChangeCount('t');
    this.isUpdateLeave = true;
  }
}