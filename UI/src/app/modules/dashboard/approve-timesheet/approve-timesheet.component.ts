import { Component, OnInit } from '@angular/core';
import { ELeaveStatus } from '@app/modules/shared/model/leave.model';
import { TimesheetStatus } from '@app/modules/shared/model/timesheet.model';
import { ApproveTimesheetService } from './approve-timesheet.service';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { InputTextareaModule } from "primeng/inputtextarea";
import moment from 'moment';
import _ from 'lodash';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';

import jsPDF from 'jspdf';


@Component({
  selector: 'sb-approve-timesheet',
  templateUrl: './approve-timesheet.component.html',
  styleUrls: ['./approve-timesheet.component.scss']
})
export class ApproveTimesheetComponent implements OnInit {
  msgs: any;
  timesheetData: any;
  data: any;
  currentDate:any;

  weekDate:any;
  weekYear:any;
  currentYear:any;
  prevoiusDate:any;
  nextDate:any;
  message!: string;
  daysData: any = [];
  weekNumber: number =0;
  currentWeekNumber: number = 0;
  timesheetId: any;
  filteredData: any;
  timeTracker: any = moment();
  public items: MenuItem[] = [];
  errors: any;
  selectStatus: any;
  public statusItem = {};
  projectData:any;
  constructor(private approveTimesheetService: ApproveTimesheetService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  rowsPerPageOptions = [5, 10, 15, 25];



  ngOnInit(): void {
    this.displayCurrentWeek();
    

    this.getTimesheet();
  }


  getTimesheet() {

    this.approveTimesheetService.getTimesheet(this.weekNumber).subscribe(
      res => {
        this.timesheetData = res
        
      
        this.filteredData = _.uniqBy(this.timesheetData, 'employeeNo');
        this.filteredData = this.filteredData.filter((x:any) => x.weeklyTimeSheet.status !='PENDING' )
        
     
       
       
        this.filteredData.forEach((x: any) => {
          const weekData = this.timesheetData.filter((item: any) =>  item.employeeNo == x.employeeNo );
          x['weekData'] = weekData;
          this.statusItem = {
            ...this.statusItem,
            [x.weeklyTimeSheet.employeeId]: [
              {
                label: 'PENDING', icon: 'pi pi-refresh', disabled: x.weeklyTimeSheet.status == TimesheetStatus.SUBMITTED, command: () => {
                 
                  this.updateTimesheetApproval(TimesheetStatus.PENDING, x);

                },
              },
              {
                label: 'APPROVED', icon: 'pi pi-refresh', disabled: x.weeklyTimeSheet.status == TimesheetStatus.APPROVED, command: () => {
                  this.updateTimesheetApproval(TimesheetStatus.APPROVED, x);
                },
              },
              {
                label: 'REJECTED', icon: 'pi pi-refresh', disabled: x.weeklyTimeSheet.status == TimesheetStatus.REJECTED, command: () => {
                    this.updateTimesheetApproval(TimesheetStatus.REJECTED,x);
                },
           }
            ],



          }
        });
      },
      err => { this.errors = err }
    );

  }

  updateTimesheetApproval(status: string, x: any) {
  

    
    if (status) {


      this.confirmationService.confirm({

      
        header: 'Confirmation',
        accept: () => {
          const postData = {
            "reason" : this.message,
            "timeSheetID": 0,
            "status": status,
            "employeeId":  x.weeklyTimeSheet.employeeId ,
            "weekNo":  x.weeklyTimeSheet.weekNo
          };
          this.approveTimesheetService.updateStatus(postData).subscribe(res => {

            if (res) {
              this.message="";
              this.getTimesheet();
            }
          })
          
        },
        reject: () => {
          this.msgs = [{ severity: 'info', summary: 'REJECTED', detail: 'You have rejected' }];
        }
      });
    }
    //


  }

  getColor(status: string) {
    switch (status) {
      case TimesheetStatus.APPROVED:
        return 'custom-success';
      case TimesheetStatus.PENDING:
        return 'custom-warning';
      case TimesheetStatus.REJECTED:
          return 'custom-danger';
      default:
        ''

    }
  }

  selectLeaveItem(item: TimesheetStatus) {
    this.selectStatus = item;
  }
  getDateWeekName(mydate: any) {
    return moment(mydate).format('dddd');
  }


  displayCurrentWeek() {
    this.daysData = this.getDays(0);
    // this.weekDate = moment(new Date).startOf('week').format('YYYY-MM-DD');
    this.weekDate = moment(new Date).isoWeek(1).format('YYYY-MM-DD');
    this.currentDate = this.weekDate;
    this.weekYear=moment(this.weekDate).year();
    this.weekNumber = moment(this.daysData[0]).isoWeek();
    this.currentWeekNumber = this.weekNumber;
  }


  displayPrevWeek() {

    this.daysData = this.getDays(-1);
    this.currentDate =moment(this.currentDate).subtract(7, 'days').format('YYYY-MM-DD');
    this.currentYear=moment(this.currentDate).year();
    this.weekNumber = moment(this.daysData[0]).isoWeek();
    this.getTimesheet();
  }
  displayNextWeek() {
this.daysData = this.getDays(1);
    this.currentDate =moment(this.currentDate).add(7, 'days').format('YYYY-MM-DD');
    this.weekNumber = moment(this.daysData[0]).isoWeek();
    this.getTimesheet();
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


  exportexcel(data : any) {
 
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet(data.employeeName+' Timesheet', {
      headerFooter: { firstHeader: "Hello Exceljs", firstFooter: "Hello World" }
    });
   
    worksheet.columns = [
      { header: 'Project Name', key: 'id', width: 32 },
      { header: moment(data.weeklyTimeSheet.mondayDate).format('DD-MM-YYYY'), key: 'monday', width: 10 },
      { header: 'Monday Task Description', key: 'mDesc', width: 10 },
      { header: moment(data.weeklyTimeSheet.tuesdayDate).format('DD-MM-YYYY'), key: 'tuesday', width: 10 },
      { header: 'Tuesday Task Description', key: 'tDesc', width: 10 },
      { header: moment(data.weeklyTimeSheet.wednesdayDate).format('DD-MM-YYYY'), key: 'wednesday', width: 10 },
      { header: 'Wednesday Task Description', key: 'wDesc', width: 10 },
      { header: moment(data.weeklyTimeSheet.thursdayDate).format('DD-MM-YYYY'), key: 'thursday', width: 10 },
      { header: 'Thursday Task Description', key: 'thDesc', width: 10 },
      { header: moment(data.weeklyTimeSheet.fridayDate).format('DD-MM-YYYY'), key: 'friday', width: 10 },
      { header: 'Friday Task Description', key: 'fDesc', width: 10 },
      { header: moment(data.weeklyTimeSheet.saturdayDate).format('DD-MM-YYYY'), key: 'saturday', width: 10 },
      { header: 'Saturday Task Description', key: 'sDesc', width: 10 },
      { header: moment(data.weeklyTimeSheet.sundayDate).format('DD-MM-YYYY'), key: 'sunday', width: 10 },
      { header: 'Sunday Task Description', key: 'suDesc', width: 10 },
      { header: 'Total Hours', key: 'total', width: 10 },
    ];
      data.weekData.forEach((element:any) => {
        worksheet.addRow({
          id:element.projectName+" - "+element.projectTask.projectsTaskType,
          monday: element.weeklyTimeSheet.mondayhr ? element.weeklyTimeSheet.mondayhr + " hr" : 0 + " hr", mDesc: element.weeklyTimeSheet.mondayDelementscription,
          tuesday: element.weeklyTimeSheet.tuesdayhr ? element.weeklyTimeSheet.tuesdayhr + " hr" : 0 + " hr", tDesc: element.weeklyTimeSheet.tuesdayDescription,
          wednesday: element.weeklyTimeSheet.wednesdayhr ? element.weeklyTimeSheet.wednesdayhr + " hr" : 0 + " hr", wDesc: element.weeklyTimeSheet.wednesdayDescription,
          thursday: element.weeklyTimeSheet.thursdayhr ? element.weeklyTimeSheet.thursdayhr + " hr" : 0 + " hr", thDesc: element.weeklyTimeSheet.thursdayDescription,
          friday: element.weeklyTimeSheet.fridayhr ? element.weeklyTimeSheet.fridayhr + " hr" : 0 + " hr", fDesc: element.weeklyTimeSheet.fridayDescription,
          saturday: element.weeklyTimeSheet.saturdayhr ? element.weeklyTimeSheet.saturdayhr + " hr" : 0 + " hr", sDesc: element.weeklyTimeSheet.saturdayDescription,
          sunday: element.weeklyTimeSheet.sundayhr ? element.weeklyTimeSheet.sundayhr + " hr" : 0 + " hr", suDesc: element.weeklyTimeSheet.sundayDescription,
          total: +element.weeklyTimeSheet.mondayhr + +element.weeklyTimeSheet.tuesdayhr + +element.weeklyTimeSheet.wednesdayhr + +element.weeklyTimeSheet.thursdayhr + + element.weeklyTimeSheet.fridayhr + + element.weeklyTimeSheet.saturdayhr + +element.weeklyTimeSheet.sundayhr ? +element.weeklyTimeSheet.mondayhr + +element.weeklyTimeSheet.tuesdayhr + +element.weeklyTimeSheet.wednesdayhr + +element.weeklyTimeSheet.thursdayhr + + element.weeklyTimeSheet.fridayhr + + element.weeklyTimeSheet.saturdayhr + +element.weeklyTimeSheet.sundayhr + " hr" : 0 + " hr"
        });
      });
    
    workbook.xlsx.writeBuffer().then((dataa: any) => {
      let blob = new Blob([dataa], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob,data.employeeName+' '+moment(data.weeklyTimeSheet.mondayDate).format('DD-MM-YYYY')+' to '+
      moment(data.weeklyTimeSheet.sundayDate).format('DD-MM-YYYY')+' Timesheet.xlsx');
    })
  }

  // initializeButton(){
  //   this.items = [
  //     {label: 'EXCEL', icon: 'pi pi-file-excel', command: () => {
  //         this.exportexcel();
  //     }},
  //     {label: 'PDf', icon: 'pi  pi-file-pdf', command: () => {
  //         this.exportPdf();
  //     }}
  //     ];
  // }


  exportPdf(data:any){
    console.log("data => ", data)
    var doc = new jsPDF('l', 'mm', [297, 210]);
    var col = ['Project Name',moment(data.weeklyTimeSheet.mondayDate).format('DD-MM-YYYY'), moment(data.weeklyTimeSheet.tuesdayDate).format('DD-MM-YYYY'),
    moment(data.weeklyTimeSheet.wednesdayDate).format('DD-MM-YYYY'), moment(data.weeklyTimeSheet.thursdayDate).format('DD-MM-YYYY'),
    moment(data.weeklyTimeSheet.fridayDate).format('DD-MM-YYYY'), moment(data.weeklyTimeSheet.saturdayDate).format('DD-MM-YYYY'),
    moment(data.weeklyTimeSheet.sundayDate).format('DD-MM-YYYY'), 'Total Hours'];
    var rows: string[][] = [];
  
    // element.weeklyTimeSheet.sundayhr ? element.weeklyTimeSheet.sundayhr

    data.weekData.forEach((element:any) => {     
    var temp = [
      element.projectName+" - "+element.projectTask.projectsTaskType,
      element.weeklyTimeSheet.mondayhr ? element.weeklyTimeSheet.mondayhr + " hr" +"\n\n Description-\n\n"+element.weeklyTimeSheet.mondayDescription : 0 + " hr",
      element.weeklyTimeSheet.tuesdayhr ? element.weeklyTimeSheet.tuesdayhr + " hr" +"\n\n Description-\n\n"+element.weeklyTimeSheet.tuesdayDescription : 0 + " hr",
      element.weeklyTimeSheet.wednesdayhr ? element.weeklyTimeSheet.wednesdayhr + " hr" +"\n\n Description-\n\n"+element.weeklyTimeSheet.wednesdayDescription : 0 + " hr",
      element.weeklyTimeSheet.thursdayhr ? element.weeklyTimeSheet.thursdayhr + " hr" +"\n\n Description-\n\n"+element.weeklyTimeSheet.thursdayDescription : 0 + " hr",
      element.weeklyTimeSheet.fridayhr ? element.weeklyTimeSheet.fridayhr + " hr" +"\n\n Description-\n\n"+element.weeklyTimeSheet.fridayDescription : 0 + " hr",
      element.weeklyTimeSheet.saturdayhr ? element.weeklyTimeSheet.saturdayhr + " hr" +"\n\n Description-\n\n"+element.weeklyTimeSheet.saturdayDescription : 0 + " hr",
      element.weeklyTimeSheet.sundayhr ? element.weeklyTimeSheet.sundayhr + " hr" +"\n\n Description-\n\n"+element.weeklyTimeSheet.sundayDescription : 0 + " hr",
      +element.weeklyTimeSheet.mondayhr + +element.weeklyTimeSheet.tuesdayhr + +element.weeklyTimeSheet.wednesdayhr + +element.weeklyTimeSheet.thursdayhr + + element.weeklyTimeSheet.fridayhr + + element.weeklyTimeSheet.saturdayhr + +element.weeklyTimeSheet.sundayhr ? +element.weeklyTimeSheet.mondayhr + +element.weeklyTimeSheet.tuesdayhr + +element.weeklyTimeSheet.wednesdayhr + +element.weeklyTimeSheet.thursdayhr + + element.weeklyTimeSheet.fridayhr + + element.weeklyTimeSheet.saturdayhr + +element.weeklyTimeSheet.sundayhr + " hr" : 0 + " hr"
    ];
    rows.push(temp);
});  

var lineBreak="\r\n";
    // var img = new Image()
    // img.src = 'assets/img/assimilatet_logo.png'
    // doc.addImage(img, 'png', 10 , 10, 30, 10);
doc.text(lineBreak+" Timesheet ", 120, 5 );
doc.setFontSize(10);
doc.text(lineBreak+"From Date - "+ moment(data.weeklyTimeSheet.mondayDate).format('DD-MM-YYYY')+"    To Date - "+ moment(data.weeklyTimeSheet.sundayDate).format('DD-MM-YYYY')+lineBreak ,10,10);
doc.text(lineBreak+lineBreak+"Employee Name : "+data.employeeName,10,10);
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

}
