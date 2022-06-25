import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormGroup, FormArray, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NavigationService } from '@app/modules/navigation/services';
import _, { findIndex } from 'lodash';
import { Workbook } from 'exceljs';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

import * as fs from 'file-saver';
import moment from 'moment';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TimesheetService } from './timesheet.service';
// import { sideNavItemsHR } from 'app/modules/navigation/data/side-nav.data';
import { Epermission, ERoles, PERMISSION } from '@app/modules/shared/model/leave.model';
import { SharedPermissionService } from '@app/modules/shared/services/shared-permission.service';
import { AppStatus } from '@app/modules/app-common/constants/app-status';
// import { ElementRef } from '@angular/core';
// import * as xlsx from 'xlsx';
import * as XLSX from 'xlsx';


@Component({
  selector: 'sb-add-timesheet',
  templateUrl: './add-timesheet.component.html',
  styleUrls: ['./add-timesheet.component.scss']
})
export class AddTimesheetComponent implements OnInit {
  public enumPer = PERMISSION;
  public enumModule = Epermission;
  task: any;
  @ViewChild('closebutton') closebutton: any;
  @ViewChild('loginForm') public userLoginForm: NgForm | undefined;
  // @ViewChild('epltable', { static: false }) epltable!: ElementRef;
  message: string | undefined;
  public realValue: any;
  submitted = false;
  error !: string;

  projectData: any;
  currentWeekNumber!: number;
  weekNumber !: number;
  toUpdateData: any;
  response: any;
  id: number = 0;
  taskDescription: any;
  selectedId: any;
  weekStart: any;
  weekEnd: any;
  model: any = {};
  Swal: any;
  statusFlag: any = "PENDING";
  counter = 4;
  errors: any;
  messageError = "";
  taskData: any;
  days: any = [];
  projectTaskId!: number
  daysData: any = [];
  timeTracker: any = moment();
  private fieldArray: Array<any> = [];
  private newAttribute: any = {};
  flag: boolean = false;
  total: number | undefined;
  toBeDeleted: any = [];
  timesheetForm!: FormGroup;
  timesheetsTitle!: FormArray;
  updateRecord: any;
  selectedColumn = '';
  userInfo: any;
  timesheetData: any;
  taskList: any = [];
  updateData: any;
  weekNo!: any;
  weekDate: any;
  currentDate: any;
  weekYear: any;
  currentYear: any;
  allList: any
  disable: boolean = true;
  items:any=[];


  statusList = ERoles;

  taskDataInfo = this.fb.group({
    id: [''],
    taskType: ['', Validators.required],
    taskDescription: ['', Validators.required]
  });


  constructor(private router: Router,
    private fb: FormBuilder,
    private activatedroute: ActivatedRoute,
    private timesheetService: TimesheetService,
    private dataService: NavigationService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    public sharedPermission: SharedPermissionService
  ) {
    this.userInfo = this.dataService.getUserInfo();
    this.initializeTable();
  }

  ngOnInit() {

    this.getProjectData();
    this.displayCurrentWeek();
    const id = Number(this.activatedroute.snapshot.paramMap.get('weekId'));
    if (id) {
      this.weekNumber = id;
    }
    this.loadTimesheet();
    this.initializeButton();
    
  }

  getTaskData() {
    this.timesheetService.getTaskData('Project/ProjectTask').subscribe(
      res => {
        this.taskList = res

      },
      err => { this.errors = err }
    );
  }

  loadTimesheet() {
    this.timesheetService.getTimesheet('WeeklyTimeSheet/GetWeekTimeSheetByWeekId', this.weekNumber, this.userInfo.employeeId).subscribe(
      res => {
        this.timesheetData = res;
        if (res.length > 0) {
          this.daysData = [res[0].mondayDate, res[0].tuesdayDate, res[0].wednesdayDate, res[0].thursdayDate,
          res[0].fridayDate, res[0].saturdayDate, res[0].sundayDate
          ];

          res.forEach((element: any, index: number) => {
            this.replaceZeroToEmpty('mondayhr', element);
            this.replaceZeroToEmpty('tuesdayhr', element);
            this.replaceZeroToEmpty('wednesdayhr', element);
            this.replaceZeroToEmpty('thursdayhr', element);
            this.replaceZeroToEmpty('fridayhr', element);
            this.replaceZeroToEmpty('saturdayhr', element);
            this.replaceZeroToEmpty('sundayhr', element);
            if (index != 0) {
              this.addRow();
            }
          });
          this.timesheetForm.patchValue({
            timesheetsTitle: res
          });
          if (res[0].status.toUpperCase() === AppStatus.SUBMITTED || res[0].status.toUpperCase() === AppStatus.APPROVED || res[0].status.toUpperCase() === AppStatus.REJECTED
          ) {
            this.statusFlag = res[0].status;
            this.disabledForm();
          } else {
            this.statusFlag = AppStatus.PENDING;
            this.enabledForm();
          }

        } else {
          this.initializeTable();
          this.enabledForm();
        }
      },
      err => { this.errors = err }
    )


  }
  replaceZeroToEmpty(key: any, element: any) {
    return element[key] = Number(element[key]) == 0 ? "" : element[key];
  }

  getProjectData() {
    this.timesheetService.getAllProject(`EmployeeProject/GetProjectByEmployee/${this.userInfo.employeeId}`).subscribe(
      res => {

        this.allList = res.map((e: any) => {
          e['displayName'] = `${e.project.projectName} - ${e.projectTask.projectsTaskType}`;
          e['id'] = e.projectTask.projectsTaskId;
          return e;
        });
        this.projectData = [...this.allList];

      },
      err => { this.errors = err }
    )
  }
  createItem() {
    return this.fb.group({
      timeSheetId: 0,
      employeeId: this.userInfo.employeeId,
      projectsTaskId: [null, Validators.required],
      mondayhr: ['', [Validators.max(15)]],
      mondayDate: [''],
      mondayDescription: [''],
      tuesdayhr: ['', [Validators.max(15)]],
      tuesdayDate: [''],
      tuesdayDescription: [''],
      wednesdayhr: ['', [Validators.max(15)]],
      wednesdayDate: [''],
      wednesdayDescription: [''],
      thursdayhr: ['', [Validators.max(15)]],
      thursdayDate: [''],
      thursdayDescription: [''],
      fridayhr: ['', [Validators.max(15)]],
      fridayDate: [''],
      fridayDescription: [''],
      saturdayhr: ['', [Validators.max(15)]],
      saturdayDate: [''],
      saturdayDescription: [''],
      sundayhr: ['', [Validators.max(15)]],
      sundayDate: [''],
      sundayDescription: [''],
      weekNo: ['']
    });
  }

  addRow(): void {
    this.timesheetsTitle = this.timesheetForm.get('timesheetsTitle') as FormArray;
    this.timesheetsTitle.push(this.createItem());
    this.submitted = false;
  }
  disabledForm() {
    this.timesheetForm.get('timesheetsTitle')?.disable();

  }
  enabledForm() {
    this.timesheetForm.get('timesheetsTitle')?.enable();
  }

  getTasks(projectId: number) {
    this.task = [];

    if (projectId != 0) {
      this.task = this.taskList.filter((item: any) => item.projectId == projectId);
    }
  }

  removeRow(event: Event, id: number, i: number) {
    const formData = this.timesheetForm.getRawValue();
    this.confirmationService.confirm({
      target: event.target || undefined,
      message: 'Are you sure that you want to proceed?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        if (id > 0) {

          if (this.timesheetsTitle.length != 1) {
            this.timesheetService.deleteRow('WeeklyTimeSheet/DeleteTimesheet/', id).subscribe(
              res => {
                if (res) {
                  this.timesheetsTitle.removeAt((formData.timesheetsTitle).findIndex((item: any) => item.timeSheetId === id));
                  this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'Row deleted successfully',
                  });
                }
              }
            )
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'You can not delete the row when there is only one row',
            });
          }

        } else {
          this.timesheetsTitle.removeAt(i);
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Row deleted successfully',
          });
        }
      },
      reject: () => {
        // reject action
      },
    });

  }

  get getControls() {
    return (this.timesheetForm.get('timesheetsTitle') as FormArray).controls;
  }

  initializeTable() {
    this.timesheetForm = this.fb.group({
      timesheetsTitle: this.fb.array([this.createItem()])
    });
  }

  numberOnly(event: { which: any; keyCode: any; }): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;

    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  letterOnly(event: { keyCode: any; }) {
    var charCode = event.keyCode;
    if (charCode = 32 || (charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) || charCode == 8 || charCode == 10)
      return true;
    else
      return false;
  }

  get g() { return this.taskDataInfo.controls; }

  remove(index: any) {
    const formData = this.timesheetForm.getRawValue();
    formData.timesheetsTitle['']
  }
  get fe() {
    const formData = this.timesheetForm.getRawValue();
    return formData.timesheetsTitle;
  }
  idSelected(selectedCol: any, idx: number) {
    this.id = idx;
    this.selectedColumn = selectedCol.target.id;


    const formData = this.timesheetForm.getRawValue();
    this.taskDescription = formData.timesheetsTitle[this.id][this.selectedColumn];

  }
  submitTaskData() {
    const formData = this.timesheetForm.getRawValue();
    formData.timesheetsTitle[this.id][this.selectedColumn] = this.taskDescription;
    this.timesheetForm.patchValue(formData);

    this.closebutton.nativeElement.click();
    this.userLoginForm?.form?.reset();
  }
  validation() {
    var isValid = false;
    this.messageError = '';
    let messageError = '';
    const formData = this.timesheetForm.getRawValue();
    const monday = _.sumBy(formData.timesheetsTitle, function (o: any) { return Number(o.mondayhr) })
    const tuesday = _.sumBy(formData.timesheetsTitle, function (o: any) { return Number(o.tuesdayhr) })
    const wednesday = _.sumBy(formData.timesheetsTitle, function (o: any) { return Number(o.wednesdayhr) })
    const thursday = _.sumBy(formData.timesheetsTitle, function (o: any) { return Number(o.thursdayhr) })
    const friday = _.sumBy(formData.timesheetsTitle, function (o: any) { return Number(o.fridayhr) })
    const saturday = _.sumBy(formData.timesheetsTitle, function (o: any) { return Number(o.saturdayhr) })
    const sunday = _.sumBy(formData.timesheetsTitle, function (o: any) { return Number(o.sundayhr) })

    if (monday > 15) {
      isValid = true;
      messageError = messageError ? `${messageError} Monday` : 'Monday';
    }

    if (tuesday > 15) {
      isValid = true;
      messageError = messageError ? `${messageError} ,tuesday` : 'tuesday';
    }

    if (wednesday > 15) {
      isValid = true;
      messageError = messageError ? `${messageError} ,wednesday` : 'wednesday';
    }

    if (thursday > 15) {
      isValid = true;
      messageError = messageError ? `${messageError} ,thursday` : 'thursday';
    }

    if (friday > 15) {
      isValid = true;
      messageError = messageError ? `${messageError} ,friday` : 'friday';
    }

    if (saturday > 15) {
      isValid = true;
      messageError = messageError ? `${messageError} ,saturday` : 'saturday';
    }

    if (sunday > 15) {
      isValid = true;
      messageError = messageError ? `${messageError} ,sunday` : 'sunday';
    }


    this.messageError = messageError;

    return isValid;
  }

  updatedData() {
    const formData = this.timesheetForm.getRawValue();
    formData.timesheetsTitle.forEach((object: any) => {
      object.mondayDate = moment(this.daysData[0]).format('YYYY-MM-DD');
      object.tuesdayDate = moment(this.daysData[1]).format('YYYY-MM-DD');
      object.wednesdayDate = moment(this.daysData[2]).format('YYYY-MM-DD');
      object.thursdayDate = moment(this.daysData[3]).format('YYYY-MM-DD');
      object.fridayDate = moment(this.daysData[4]).format('YYYY-MM-DD');
      object.saturdayDate = moment(this.daysData[5]).format('YYYY-MM-DD');
      object.sundayDate = moment(this.daysData[6]).format('YYYY-MM-DD');
      object.weekNo = this.weekNumber;
    });

    return formData;
  }
  ValidateProjectTask() {
    const formData = this.timesheetForm.getRawValue();
    const task = formData.timesheetsTitle;
    if (task.length > 1) {
      const _UTask = _.uniqBy(task, 'projectsTaskId');
      if (task.length != _UTask.length) { return true }
    }
    return false;
  }
  onSubmitConfim(event: Event, status: any = "PENDING") {
    this.confirmationService.confirm({
      target: event.target || undefined,
      message: 'Once you submit timesheet , you can not change it , do you want to continue ?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.onSubmitTimesheetForm(status);
      }, reject: () => {
        //reject action
      }
    });
  }
  onSubmitTimesheetForm(status: any = "PENDING") {

    this.submitted = true;

    this.flag = false;
    if (this.validation()) {
      this.flag = true;
      return;
    }
    if (this.timesheetForm.invalid) {
      return;
    }
    else {
      if (this.ValidateProjectTask()) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Project-Task should be unique' });
        return;
      }
      this.timesheetForm.patchValue(this.updatedData());
      const formData = this.timesheetForm.getRawValue();
      const postData: any[] = [];
      formData.timesheetsTitle.forEach((item: any) => {
        postData.push(
          {
            "timeSheetId": item['timeSheetId'] || 0,
            "projectsTaskId": item['projectsTaskId'],
            "employeeId": this.userInfo.employeeId,
            "weekNo": this.weekNumber,
            "mondayhr": Number(item['mondayhr']),
            "mondayDescription": item['mondayDescription'] || "",
            "mondayDate": item['mondayDate'],
            "tuesdayhr": Number(item['tuesdayhr']),
            "tuesdayDescription": item['tuesdayDescription'] || "",
            "tuesdayDate": item['tuesdayDate'],
            "wednesdayhr": Number(item['wednesdayhr']),
            "wednesdayDescription": item['wednesdayDescription'] || "",
            "wednesdayDate": item['wednesdayDate'],
            "thursdayhr": Number(item['thursdayhr']),
            "thursdayDescription": item['thursdayDescription'] || "",
            "thursdayDate": item['thursdayDate'],
            "fridayhr": Number(item['fridayhr']),
            "fridayDescription": item['fridayDescription'] || "",
            "fridayDate": item['fridayDate'],
            "saturdayhr": Number(item['saturdayhr']),
            "saturdayDescription": item['saturdayDescription'] || "",
            "saturdayDate": item['saturdayDate'],
            "sundayhr": Number(item['sundayhr']),
            "sundayDescription": item['sundayDescription'] || "",
            "sundayDate": item['sundayDate'],
            "status": status
          }
        )
      });

      this.timesheetService.postData('WeeklyTimeSheet/AddTimesheetBulk', postData).subscribe(
        res => {
          this.submitted = false;

          if (res > 0) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Timesheet added successfully..' });
            this.onReset();
          } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something wrong...' });
          }



        },
        (err: any) => {
          this.submitted = false;
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something wrong...' });
        }
      );
    }
  }

  onReset() {
    this.submitted = false;
    this.total = undefined;
    this.initializeTable();
    this.loadTimesheet();
  }

  get f() {
    return this.timesheetForm.controls;
  }
  get fv() {
    return this.timesheetForm.value;
  }

  getDays(e: number) {
    this.timeTracker = moment(this.daysData[0]);
    this.timeTracker.add(e, 'weeks');
    const startOfWeek = this.timeTracker.clone("dddd Do MMMM YYYY").startOf('isoWeek');
    const endOfWeek = this.timeTracker.clone("dddd Do MMMM YYYY").endOf('isoWeek');
    let day = startOfWeek;
    const days = [];
    while (day.isSameOrBefore(endOfWeek)) {
      days.push(day.toDate());
      day = day.add(1, 'days');
    }
    return days;
  }

  displayPrevWeek() {
    this.initializeTable();
    this.daysData = this.getDays(-1);

    this.currentDate = moment(this.currentDate).subtract(7, 'days').format('YYYY-MM-DD');
    this.currentYear = moment(this.currentDate).year();

    this.weekNumber = moment(this.daysData[0]).isoWeek();
    this.submitted = false;
    this.flag = false;
    this.total = undefined;
    this.loadTimesheet();
  }

  displayCurrentWeek() {
    this.daysData = this.getDays(0);
    this.weekDate = moment(new Date).isoWeek(1).format('YYYY-MM-DD');
    this.currentDate = this.weekDate;
    this.weekYear = moment(this.weekDate).year();
    this.weekNumber = moment(this.daysData[0]).isoWeek();
    this.currentWeekNumber = this.weekNumber;
  }

  displayNextWeek() {
    this.initializeTable();
    this.daysData = this.getDays(1);
    this.currentDate = moment(this.currentDate).add(7, 'days').format('YYYY-MM-DD');
    this.weekNumber = moment(this.daysData[0]).isoWeek();
    this.submitted = false;
    this.flag = false;
    this.total = undefined;
    this.loadTimesheet();
  }
  getDateWeekName(mydate: any) {
    return moment(mydate).format('dddd');
  }

  toNormaliseStatusKey(appStatusValue: string) {
    return appStatusValue.toUpperCase() === AppStatus.PENDING;
  }

  exportexcel(): void {

    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet(this.projectData[0].employee.employeeName+' Timesheet', {
      headerFooter: { firstHeader: "Hello Exceljs", firstFooter: "Hello World" }
    });

    worksheet.columns = [
      { header: 'Project Name', key: 'id', width: 32 },
      { header: moment(this.daysData[0]).format('DD-MM-YYYY'), key: 'monday', width: 10 },
      { header: 'Monday Task Description', key: 'mDesc', width: 10 },
      { header: moment(this.daysData[1]).format('DD-MM-YYYY'), key: 'tuesday', width: 10 },
      { header: 'Tuesday Task Description', key: 'tDesc', width: 10 },
      { header: moment(this.daysData[2]).format('DD-MM-YYYY'), key: 'wednesday', width: 10 },
      { header: 'Wednesday Task Description', key: 'wDesc', width: 10 },
      { header: moment(this.daysData[3]).format('DD-MM-YYYY'), key: 'thursday', width: 10 },
      { header: 'Thursday Task Description', key: 'thDesc', width: 10 },
      { header: moment(this.daysData[4]).format('DD-MM-YYYY'), key: 'friday', width: 10 },
      { header: 'Friday Task Description', key: 'fDesc', width: 10 },
      { header: moment(this.daysData[5]).format('DD-MM-YYYY'), key: 'saturday', width: 10 },
      { header: 'Saturday Task Description', key: 'sDesc', width: 10 },
      { header: moment(this.daysData[6]).format('DD-MM-YYYY'), key: 'sunday', width: 10 },
      { header: 'Sunday Task Description', key: 'suDesc', width: 10 },
      { header: 'Total Hours', key: 'total', width: 10 },
    ];

    this.timesheetData.forEach((e: any) => {
      worksheet.addRow({
        id: this.projectData.filter((item: any) => {
          if (e.projectsTaskId === item.projectTask.projectsTaskId) {
            return item;
          }
        }).map((data: any) => {
          return data.displayName;
        })[0],
        monday: e.mondayhr ? e.mondayhr + " hr" : 0 + " hr", mDesc: e.mondayDescription,
        tuesday: e.tuesdayhr ? e.tuesdayhr + " hr" : 0 + " hr", tDesc: e.tuesdayDescription,
        wednesday: e.wednesdayhr ? e.wednesdayhr + " hr" : 0 + " hr", wDesc: e.wednesdayDescription,
        thursday: e.thursdayhr ? e.thursdayhr + " hr" : 0 + " hr", thDesc: e.thursdayDescription,
        friday: e.fridayhr ? e.fridayhr + " hr" : 0 + " hr", fDesc: e.fridayDescription,
        saturday: e.saturdayhr ? e.saturdayhr + " hr" : 0 + " hr", sDesc: e.saturdayDescription,
        sunday: e.sundayhr ? e.sundayhr + " hr" : 0 + " hr", suDesc: e.sundayDescription,
        total: +e.mondayhr + +e.tuesdayhr + +e.wednesdayhr + +e.thursdayhr + + e.fridayhr + + e.saturdayhr + +e.sundayhr ? +e.mondayhr + +e.tuesdayhr + +e.wednesdayhr + +e.thursdayhr + + e.fridayhr + + e.saturdayhr + +e.sundayhr + " hr" : 0 + " hr"
      });
    });
  
    workbook.xlsx.writeBuffer().then((data: any) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, this.projectData[0].employee.employeeName+' Timesheet.xlsx');
    })
  }

  initializeButton(){
    this.items = [
      {label: 'EXCEL', icon: 'pi pi-file-excel', command: () => {
          this.exportexcel();
      }},
      {label: 'PDf', icon: 'pi  pi-file-pdf', command: () => {
          this.exportPdf();
      }}
      ];
  }
  exportPdf(){
    var doc = new jsPDF('l', 'mm', [297, 210]);
    var col = ['Project Name',moment(this.daysData[0]).format('DD-MM-YYYY'), moment(this.daysData[1]).format('DD-MM-YYYY'),
    moment(this.daysData[2]).format('DD-MM-YYYY'), moment(this.daysData[3]).format('DD-MM-YYYY'),
    moment(this.daysData[4]).format('DD-MM-YYYY'), moment(this.daysData[5]).format('DD-MM-YYYY'),
    moment(this.daysData[6]).format('DD-MM-YYYY'), 'Total Hours'];
    var rows: string[][] = [];
  
this.timesheetData.forEach((element:any) => {      
    var temp = [this.projectData.filter((item: any) => {
      if (element.projectsTaskId === item.projectTask.projectsTaskId) {
        return item;
      }
    }).map((data: any) => {
      return data.displayName;
    })[0],element.mondayhr ? element.mondayhr + " hr"+"\n\n Description:-\n\n"+element.mondayDescription : 0 + " hr",element.tuesdayhr ? element.tuesdayhr + " hr"+"\n Description-\n"+element.tuesdayDescription : 0 + " hr",
    element.wednesdayhr ? element.wednesdayhr + " hr"+"\n\n Description:-\n\n"+element.wednesdayDescription : 0 + " hr",
    element.thursdayhr ? element.thursdayhr + " hr"+"\n\n Description:-\n\n"+element.thursdayDescription : 0 + " hr",
    element.fridayhr ? element.fridayhr + " hr"+"\n\n Description:-\n\n"+element.fridayDescription : 0 + " hr",
    element.saturdayhr ? element.saturdayhr + " hr"+"\n\n Description:-\n\n"+element.saturdayDescription : 0 + " hr",
    element.sundayhr ? element.sundayhr + " hr"+"\n\n Description:-\n\n"+element.sundayDescription : 0 + " hr",
    +element.mondayhr + +element.tuesdayhr + +element.wednesdayhr + +element.thursdayhr + + element.fridayhr + + element.saturdayhr + +element.sundayhr ? +element.mondayhr + +element.tuesdayhr + +element.wednesdayhr + +element.thursdayhr + + element.fridayhr + + element.saturdayhr + +element.sundayhr + " hr" : 0 + " hr"
  ];
    rows.push(temp);
});  

var lineBreak="\r\n";
    // var img = new Image()
    // img.src = 'assets/img/assimilatet_logo.png'
    // doc.addImage(img, 'png', 10 , 10, 30, 10);
doc.text(lineBreak+" Timesheet ", 120, 5 );
doc.setFontSize(10);
doc.text(lineBreak+"From Date - "+ moment(this.daysData[0]).format('DD-MM-YYYY')+"    To Date - "+ moment(this.daysData[6]).format('DD-MM-YYYY')+lineBreak ,10,10);
doc.text(lineBreak+lineBreak+"Employee Name : "+this.projectData[0].employee.employeeName,10,10);
var options = {    
          
  margin: { horizontal: 10 , top:25},
  bodyStyles: { valign: 'top'},
  columnStyles: {
    0: {cellWidth: 30},
    1: {cellWidth: 30},
    2: {cellWidth: 30},
    3: {cellWidth: 30},
    4: {cellWidth: 30},
    5: {cellWidth: 30},
    6: {cellWidth: 30},
    7: {cellWidth: 30},
    8: {cellWidth: 30},
    9: {cellWidth: 8}
  },
  headerStyles: {
      fillColor: [51, 122, 183],
      textColor: [255],
      halign: 'center'
  },            
  theme: 'grid'
};

(doc as any).autoTable(col, rows,options );
    doc.save(this.projectData[0].employee.employeeName+" "+ moment(this.daysData[0]).format('DD-MM-YYYY')+" to "+ moment(this.daysData[6]).format('DD-MM-YYYY')+' Timesheet.pdf');
  }

}
