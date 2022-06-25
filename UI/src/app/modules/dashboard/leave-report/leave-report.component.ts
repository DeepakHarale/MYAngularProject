import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import jsPDF from 'jspdf';
import _ from 'lodash';
import moment from 'moment';
import { GetLeave } from './leave-report-interface';
import { LeaveReportService } from './leave-report.service';

import { fromJSDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-calendar';


@Component({
  selector: 'sb-leave-report',
  templateUrl: './leave-report.component.html',
  styleUrls: ['./leave-report.component.scss']
})
export class LeaveReportComponent implements OnInit {

//dataSource=new MatTableDataSource(worksheet);
getleave : GetLeave []=[];
GetLeaved:any;
employeeName:any;
filteredData: any;
monthData:any;
Table:any;

statuses: any[];

loading: boolean = true;

activityValues: number[] = [0, 100];
form2: FormGroup;
  constructor( private setup:LeaveReportService,private fb: FormBuilder) {
    this.form2 = new FormGroup({
      month: new FormControl(''),
      search: new FormControl('')
    });
   }
  //  onSubmit(form2:any) {
  //   console.log(
  //       {
  //         month:new Date(this.form2.value.month).toLocaleString('en-us',{month:'long'}),
  //         search:this.form2.value.search
  //       }
  //     ); // Output: {month: "February", search: "16"}
  // }

  ngOnInit() {
    this.getAllLeaves();
  }

getAllLeaves(){

  this.setup.getData().subscribe((res)=>{
    this.getleave=res;
   
});
}
// applyFilter(filterValue:any){
//   this.applyFilter=filterValue.trim().toLowerCase();
// }
// Search(){
//   if(this.employeeName == ''){
//    this.ngOnInit()
//   }
//   else{
//     this.getleave=this.getleave.filter(response =>{
//      return response.employeeName.toLocaleLowerCase().match(this.employeeName.toLocaleLowerCase());
//     });
//   }
// }
projectData:any;
LeaveData:any;
items:any=[];
daysData: any = [];
leavefromdate:any;
leavetodate:any;

clear(table: any) {
  table.clear();
}
ExportDataByEmployee(data:any): void {

  let workbook = new Workbook();
  let worksheet = workbook.addWorksheet( data.employee.employeeName +'leave', {
    headerFooter: { firstHeader: "Hello Exceljs", firstFooter: "Hello World" }
  });

  worksheet.columns = [
    { header: 'Employee ID', key: 'eid', width: 10 },
    { header: 'Employee Name', key: 'ename', width: 10 },
    { header: 'Leave From Date', key: 'leaveFrom', width: 10 },
    { header: 'Leave Type', key: 'leaveType', width: 10 },
    { header: 'Leave To Date', key: 'leaveTo', width: 10 },
    { header: 'Leave Description', key: 'leaveDes', width: 10 },
    { header: 'Reamains monthly Balance', key: 'reamains', width: 10 },
    { header: 'Leave Type', key: 'leaveTy', width: 10 },
    { header:'Total Days', key: 'total', width: 10 } 
  ];

  data.getleave.forEach((e: any) => {
    worksheet.addRow({
      eid: e.employee.employeeId,
      ename: e.employee.employeeName ,
      leaveFrom:  moment(e.leave.fromDate).format('MMM d, y'),
      leaveType: e.leave.leaveTypeTo ,
      leaveTo: e.leave.toDate,
      leaveDes: e.leave.leaveDescription ,
      reamains: e.leave.leaveBalance ,
      leaveTy: e.leaveType.leaveName,
      total: e.leaveType.assignedDays
    });
  });
  
  workbook.xlsx.writeBuffer().then((data: any) => {
    let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    fs.saveAs(blob, data.employeeName+' '+moment(data.leave.fromDate).format('MMM d, y')+' to '+
    moment(data.leave.toDate).format('MMM d, y')+' leave.xlsx');
  })
}




exportexcel(): void {

  let workbook = new Workbook();
  let worksheet = workbook.addWorksheet('leave', {
    headerFooter: { firstHeader: "Hello Exceljs", firstFooter: "Hello World" }
  });

  worksheet.columns = [
    { header: 'Employee ID', key: 'eid', width: 10 },
    { header: 'Employee Name', key: 'ename', width: 10 },
    { header: 'Leave From Date', key: 'leaveFrom', width: 10 },
    { header: 'Leave Type', key: 'leaveType', width: 10 },
    { header: 'Leave To Date', key: 'leaveTo', width: 10 },
    { header: 'Leave Description', key: 'leaveDes', width: 10 },
    { header: 'Reamains monthly Balance', key: 'reamains', width: 10 },
    { header: 'Leave Type', key: 'leaveTy', width: 10 },
    { header:'Total Days', key: 'total', width: 10 } 
  ];

  this.getleave.forEach((e: any) => {
    worksheet.addRow({
      eid: e.employee.employeeId,
      ename: e.employee.employeeName ,
      leaveFrom:  moment(e.leave.fromDate).format('MM/dd/yyyy'),
      leaveType: e.leave.leaveTypeTo ,
      leaveTo: e.leave.toDate,
      leaveDes: e.leave.leaveDescription ,
      reamains: e.leave.leaveBalance ,
      leaveTy: e.leaveType.leaveName,
      total: e.leaveType.assignedDays
    });
  });

  workbook.xlsx.writeBuffer().then((data: any) => {
    let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    fs.saveAs(blob,'leave.xlsx');
  })
}
  
  
Downloadexcel(){

  
  
    var leavereport = { 
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalseparator: '.',
    showLabels: true, 
    showTitle: true,
    title: 'Leave Report',
    useBom: true,
   
    headers: ["employeeId", "employeeName", "fromDate","fromTo","leaveTypeTo","leaveDescription","leaveBalance","leaveType","assignedDays"]
  };
 
  //  new ngxCsv(this.getleave, "report", leavereport);
   //new ngxCsv(this.getleave, 'My Report');
}
exportPdf(){
  var doc = new jsPDF('l', 'mm', [297, 210]);
  var col = ['Employee ID' , 'Employee Name' , 'Leave From Date', 'Leave Type','Leave To Date','Leave Description',
  'Reamains monthly Balance','Leave Type','Total Days'
];
  var rows: string[][] = [];

var data = this.getleave.forEach((element:any) => {      
  
    element.employee.employeeId,
    element.employee.employeeName ,
    moment(element.leave.fromDate).format('MM/dd/yyyy'),
    element.leave.leaveTypeTo ,
    element.leave.toDate,
    element.leave.leaveDescription ,
    element.leave.leaveBalance ,
    element.leaveType.leaveName,
    element.leaveType.assignedDays
  });
 // rows.push(data);


var lineBreak="\r\n";
  // var img = new Image()
  // img.src = 'assets/img/assimilatet_logo.png'
  // doc.addImage(img, 'png', 10 , 10, 30, 10);

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
  doc.save(' Timesheet.pdf');
}

initializeButton(){
  this.items = [
    {label: 'EXCEL', icon: 'pi pi-file-excel', command: () => {
        this.exportexcel();
    }},
    // {label: 'PDf', icon: 'pi  pi-file-pdf', command: () => {
    //     this.exportPdf();
    // }}
    ];
}


}
