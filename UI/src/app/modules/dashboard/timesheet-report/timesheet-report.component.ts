import { Component, OnInit } from '@angular/core';
import { NavigationService } from '@app/modules/navigation/services';
import { SetupService } from '@app/modules/shared/services/setup.service';
import { Workbook } from 'exceljs';
import _ from 'lodash';
import * as fs from 'file-saver';
import { ProjectTaskDetailsService } from '../project-task-details/project-task-details.service';
import { TimesheetreportService } from './timesheetreport.service';

@Component({
  selector: 'sb-timesheet-report',
  templateUrl: './timesheet-report.component.html',
  styleUrls: ['./timesheet-report.component.scss']
})
export class TimesheetReportComponent implements OnInit {

  getemployee:any;
  userInfo: any;
  timesheetData:any;
  errors:any;
  taskEmployee:any;
  projectTaskId:any;
  taskList:any;
  columns: any[] = [];

  constructor(private setup:SetupService,private timesheet:TimesheetreportService,private dataService: NavigationService,private projectTaskDetailsService: ProjectTaskDetailsService,) 
  { this.userInfo = this.dataService.getUserInfo(); }

  ngOnInit(): void {

    this.columns = [
      { header: 'From Date', field: 'mondsayDate', width: 100 },
      { header: 'To Date', field: 'sundayDate', width: 100 },
      { header: 'Employee Name', field: 'employeeId', width: 100 },
      { header: 'Project Name', field: 'projectTypeId', width: 200 }
    ]
    this.getEmployees();
    this.gettimesheet();
    this.getTaskData();
  }
  getEmployees() {
    this.setup.getData('Employee/GetEmployee').subscribe(res => {
      this.getemployee=res;
    },
    err=>{
      this.getemployee=err;
    })
  }

  exportexcel(todoTable : any) {
    
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet(todoTable.employeeId+' Timesheet', {
      headerFooter: { firstHeader: "Hello Exceljs", firstFooter: "Hello Filter Data" }
    });
   
     

    worksheet.columns = [
      { header: 'Employee Id', key: 'employeeId', width: 20 },
      { header: 'Project Name', key: 'projectTypeId', width: 20},
      { header: 'From Date', key: 'mondayDate', width: 20 },
      { header: 'To Date', key: 'sundayDate', width: 20},
      // { header: 'mobile No', key: 'mobileNo', width: 20 },
      // { header: 'email Id', key: 'emailId', width: 20},
      // { header: 'first Name', key: 'firstName', width: 20},
      // { header: 'middle Name', key: 'middleName', width: 20},
      // { header: 'last Name', key: 'lastName', width: 20},
      // { header: 'gender', key: 'gender', width: 20},
      // { header: 'mothers Name', key: 'mothersName', width: 20 },
      // { header: 'date Of Birth', key: 'dateOfBirth', width: 20 },
      // { header: 'marital Status', key: 'maritalStatus', width: 20 },
      // { header: 'spouse Name', key: 'spouseName', width: 20 },
      // { header: 'child Name1', key: 'childName1', width: 20 },
      // { header: 'child Name2', key: 'childName2', width: 20},
      // { header: 'paddress Line1', key: 'paddressLine1', width: 20 },
      // { header: 'paddress Line2', key: 'paddressLine2', width: 20 },
      // { header: 'pcity', key: 'pcity', width: 20 },
      // { header: 'pstate', key: 'pstate', width: 20 },
      // { header: 'ppincode', key: 'ppincode', width: 20 },
      // { header: 'isSameAddress', key: 'isSameAddress', width: 20},
      // { header: 'caddress Line1', key: 'caddressLine1', width: 20},
      // { header: 'caddress Line2', key: 'caddressLine2', width: 20},
      // { header: 'ccity', key: 'ccity', width: 20 },
      // { header: 'cpstate', key: 'ccpstate', width: 20 },
      // { header: 'cpincode', key: 'cpincode', width: 20 },
      // { header: 'joiningDate', key: 'joiningDate', width: 20 },
      // { header: 'division', key: 'division', width: 20},
      // // { header: 'department', key: 'department', width: 20},
      // { header: 'employeeStatus', key: 'employeeStatus', width: 20 },
      // { header: 'profilePhotoPath', key: 'profilePhotoPath', width: 20 },
      // // { header: 'createdAt', key: 'createdAt', width: 20},
      // // { header: 'updatedAt', key: 'updatedAt', width: 20 },
      // // { header: 'createdBy', key: 'createdBy', width: 20 },
      // // { header: 'updatedBy', key: 'updatedBy', width: 20 },
      // { header: 'role Name', key: 'roleName', width: 20},
      // { header: 'role Id', key: 'roleId', width: 20},
      // // { header: 'emergency No', key: 'emergencyNo', width: 20},
      
      
    ];
    
        worksheet.addRow({
          employeeId:todoTable.employeeId,
          projectTaskId: todoTable.projectTaskId,
          sundayDate: todoTable.sundayDate,
          mondayDate: todoTable.mondayDate,
          // mobileNo: todoTable.mobileNo,
          // emailId: todoTable.emailId,
          // firstName: data.firstName,
          // middleName: data.middleName,
          // lastName: data.lastName,
          // gender: todoTable.gender,
          // mothersName: todoTable.mothersName,
          // dateOfBirth: todoTable.dateOfBirth,
          // maritalStatus: todoTable.maritalStatus,
          // spouseName: todoTable.spouseName,
          // childName1: todoTable.childName1,
          // childName2: todoTable.childName2,
          // paddressLine2: todoTable.paddressLine2,
          // pcity: todoTable.pcity,
          // pstate: todoTable.pstate,
          // ppincode: todoTable.ppincode,
          // isSameAddress: todoTable.isSameAddress,
          // caddressLine1: todoTable.caddressLine1,
          // caddressLine2: todoTable.caddressLine2,
          // cpstate: todoTable.cpstate,
          // cpincode: todoTable.cpincode,
          // joiningDate: todoTable.joiningDate,
          // division: todoTable.division,
          // // department: data.department,
          // employeeStatus: todoTable.employeeStatus,
          // profilePhotoPath: todoTable.profilePhotoPath,
          // // createdAt: data.createdAt,
          // // updatedAt: data.updatedAt,
          // // createdBy: data.createdBy,
          // // updatedBy: data.updatedBy,
          // roleName: todoTable.roleName,
          // roleId: todoTable.roleId,
          // // emergencyNo: data.emergencyNo,
        
        });
     
    
        workbook.xlsx.writeBuffer().then((todoTable: any) => {
          let blob = new Blob([todoTable], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
          fs.saveAs(blob,' Timesheet Report.xlsx');
        })
  }

  getTaskData() {
    this.timesheet.getTaskData('Project/ProjectTask').subscribe(
      res => {
        this.taskList = res

      },
      err => { this.errors = err }
    );
  }


 
  gettimesheet(){
    this.timesheet.getData(this.userInfo.employeeId).subscribe(res=>{
      this.timesheetData = res;

    },
    err => { this.errors = err }
  );
}
  }

