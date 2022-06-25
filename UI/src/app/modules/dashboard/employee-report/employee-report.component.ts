import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { PERMISSION, Epermission } from '@app/modules/shared/model/leave.model';
import { SetupService } from '@app/modules/shared/services/setup.service';
import { SharedPermissionService } from '@app/modules/shared/services/shared-permission.service';
import { Workbook } from 'exceljs';
import _ from 'lodash';
import moment from 'moment';
import * as fs from 'file-saver';
import { MessageService, ConfirmationService } from 'primeng/api';
import jsPDF from 'jspdf';

@Component({
  selector: 'sb-employee-report',
  templateUrl: './employee-report.component.html',
  styleUrls: ['./employee-report.component.scss']
})
export class EmployeeReportComponent implements OnInit {
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  mobileNoPattern = "^[0-9]{10}$";
  result: any;
  $event:any;
  submitted = false;
  isErrorMessage = false;
  Getrole: any;
  public enumPer = PERMISSION;
  public enumModule = Epermission;
  searchKey:any;
  formatDate = "YYYY-MM-DD";
  currentDate = moment().format(this.formatDate);

  route: any;
  isAddEmployee = false;
  dataList: any;
  // isView = false;
  rowsPerPageOptions = [5, 10, 15, 25]

  // registerEmployeeForm = this.fb.group({
  //   employeeNo: ['', [Validators.required]],
  //   employeeName: ['', [Validators.required]],
  // //   mobileNo: ['', [Validators.required, Validators.pattern(this.mobileNoPattern)]],
  // //   emailId: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
  // //   password: ['123456', [Validators.required]],
  // //   roleId: [null, [Validators.required]],
  // //   gender: ['', [Validators.required]],
  // //   joiningDate: ['', [Validators.required]],
  // //   division: ['', [Validators.required]],
  // //   department: ['', [Validators.required,Validators.maxLength(50)]],
  // //   employeeStatus: ['', [Validators.required,Validators.maxLength(50)]],
  // //   emergencyNo: ['', [Validators.required, Validators.pattern(this.mobileNoPattern)]],
  // // });

  errorExists = '';
  defaultFromValue: any;
  registerEmployeeForm: any;
  columns: any[] = [];

  get f() {
    return this.registerEmployeeForm.controls;
  }
  get fv() {
    return this.registerEmployeeForm.value;
  }


  getEmployees() {
    this.setup.getData('Employee/GetEmployee').subscribe(res => {
      this.dataList = _.orderBy(res, ['employeeNo'], ['asc']);
    })
  }

  

  getRole() {
    this.setup.getRole().subscribe(res => {
      this.Getrole = res;

    })
  }


  constructor(private setup: SetupService,
    private fb: FormBuilder, private messageService: MessageService,
    private confirmationService: ConfirmationService,
    public sharedPermission: SharedPermissionService) {

    // this.defaultFromValue = this.registerEmployeeForm.value;
  }

  ngOnInit(): void {

    this.columns = [
      { id: 1, header: 'Employee ID', field: 'employeeId', width: 100 },
      { id: 2, header: 'Employee Name', field: 'employeeName', width: 100 },
      { id: 3, header: 'Phone No.', field: 'mobileNo', width: 100 },
      { id: 4, header: 'Email Id', field: 'emailId', width: 200 },
      // { id: 5, header: 'First Name', field: 'firstName', width: 100 },
      // { id: 6, header: 'Middle Name', field: 'middleName', width: 100 },
      // { id: 7, header: 'Last Name', field: 'lastName', width: 100 },
      { id: 8, header: 'Gender', field: 'gender', width: 80 },
      { id: 9, header: 'Mother Name', field: 'mothersName', width: 100 },
      { id: 10, header: 'Date Of Birth', field: 'dateOfBirth', width: 100 },
      { id: 11, header: 'Marital Status', field: 'maritalStatus', width: 100 },
      { id: 12, header: 'Spouse Name', field: 'spouseName', width: 100 },
      // { id: 13, header: 'Child Name', field: 'childName', width: 100 },
      { id: 14, header: 'Address Line 1', field: 'paddressLine1', width: 200 },
      { id: 15, header: 'Address Line 2', field: 'paddressLine2', width: 200 },
      { id: 16, header: 'City', field: 'pcity', width: 100 },
      { id: 17, header: 'State', field: 'pstate', width: 100 },
      { id: 18, header: 'Joining Date', field: 'joiningDate', width: 100 },
      { id: 19, header: 'Division', field: 'division', width: 100 },
      // { id: 20, header: 'Department', field: 'department', width: 100 },
      { id: 21, header: 'Employee Status', field: 'employeeStatus', width: 100 },
      { id: 22, header: 'Action', field: 'action', width:100},

    ]
    this.getEmployees();
    this.getRole();
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

  // addEmployee() {
  //   this.registerEmployeeForm.get('joiningDate')?.setValue(this.currentDate);

  //   this.registerEmployeeForm.patchValue(this.defaultFromValue);
  //   this.isAddEmployee = true;
  //   this.submitted = false;
  // }
  exportExcel(data : any) {

    let filteredData = data.filter((item:any)=>
     item.employeeName.toLowerCase().includes(this.searchKey.toLowerCase()))
    
     
    console.log("filteredData => ",filteredData)
    
    
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet(data.employeeName+' Timesheet', {
      headerFooter: { firstHeader: "Hello Exceljs", firstFooter: "Hello World" }
    });

    
   
     

    worksheet.columns = [
      { header: 'Employee Id', key: 'employeeId', width: 20 },
      { header: 'user Id', key: 'userId', width: 20},
      { header: 'employee No', key: 'employeeNo', width: 20 },
      { header: 'employee Name', key: 'employeeName', width: 20},
      { header: 'mobile No', key: 'mobileNo', width: 20 },
      { header: 'email Id', key: 'emailId', width: 20},
      // { header: 'first Name', key: 'firstName', width: 20},
      // { header: 'middle Name', key: 'middleName', width: 20},
      // { header: 'last Name', key: 'lastName', width: 20},
      { header: 'gender', key: 'gender', width: 20},
      { header: 'mothers Name', key: 'mothersName', width: 20 },
      { header: 'date Of Birth', key: 'dateOfBirth', width: 20 },
      { header: 'marital Status', key: 'maritalStatus', width: 20 },
      { header: 'spouse Name', key: 'spouseName', width: 20 },
      { header: 'child Name1', key: 'childName1', width: 20 },
      { header: 'child Name2', key: 'childName2', width: 20},
      { header: 'paddress Line1', key: 'paddressLine1', width: 20 },
      { header: 'paddress Line2', key: 'paddressLine2', width: 20 },
      { header: 'pcity', key: 'pcity', width: 20 },
      { header: 'pstate', key: 'pstate', width: 20 },
      { header: 'ppincode', key: 'ppincode', width: 20 },
      { header: 'isSameAddress', key: 'isSameAddress', width: 20},
      { header: 'caddress Line1', key: 'caddressLine1', width: 20},
      { header: 'caddress Line2', key: 'caddressLine2', width: 20},
      { header: 'ccity', key: 'ccity', width: 20 },
      { header: 'cpstate', key: 'ccpstate', width: 20 },
      { header: 'cpincode', key: 'cpincode', width: 20 },
      { header: 'joiningDate', key: 'joiningDate', width: 20 },
      { header: 'division', key: 'division', width: 20},
      // { header: 'department', key: 'department', width: 20},
      { header: 'employeeStatus', key: 'employeeStatus', width: 20 },
      { header: 'profilePhotoPath', key: 'profilePhotoPath', width: 20 },
      // { header: 'createdAt', key: 'createdAt', width: 20},
      // { header: 'updatedAt', key: 'updatedAt', width: 20 },
      // { header: 'createdBy', key: 'createdBy', width: 20 },
      // { header: 'updatedBy', key: 'updatedBy', width: 20 },
      { header: 'role Name', key: 'roleName', width: 20},
      { header: 'role Id', key: 'roleId', width: 20},
      // { header: 'emergency No', key: 'emergencyNo', width: 20},
      
      
    ];

    filteredData.forEach((data: any) => {
      worksheet.addRow({
        employeeId:data.employeeId,
        userId: data.userId,
        employeeNo: data.employeeNo,
        employeeName: data.employeeName,
        mobileNo: data.mobileNo,
        emailId: data.emailId,
        // firstName: data.firstName,
        // middleName: data.middleName,
        // lastName: data.lastName,
        gender: data.gender,
        mothersName: data.mothersName,
        dateOfBirth: data.dateOfBirth,
        maritalStatus: data.maritalStatus,
        spouseName: data.spouseName,
        childName1: data.childName1,
        childName2: data.childName2,
        paddressLine2: data.paddressLine2,
        pcity: data.pcity,
        pstate: data.pstate,
        ppincode: data.ppincode,
        isSameAddress: data.isSameAddress,
        caddressLine1: data.caddressLine1,
        caddressLine2: data.caddressLine2,
        cpstate: data.cpstate,
        cpincode: data.cpincode,
        joiningDate: data.joiningDate,
        division: data.division,
        // department: data.department,
        employeeStatus: data.employeeStatus,
        profilePhotoPath: data.profilePhotoPath,
        // createdAt: data.createdAt,
        // updatedAt: data.updatedAt,
        // createdBy: data.createdBy,
        // updatedBy: data.updatedBy,
        roleName: data.roleName,
        roleId: data.roleId,
       });
    });
    
        // worksheet.addRow({
        //   employeeId:data.employeeId,
        //   userId: data.userId,
        //   employeeNo: data.employeeNo,
        //   employeeName: data.employeeName,
        //   mobileNo: data.mobileNo,
        //   emailId: data.emailId,
        //   // firstName: data.firstName,
        //   // middleName: data.middleName,
        //   // lastName: data.lastName,
        //   gender: data.gender,
        //   mothersName: data.mothersName,
        //   dateOfBirth: data.dateOfBirth,
        //   maritalStatus: data.maritalStatus,
        //   spouseName: data.spouseName,
        //   childName1: data.childName1,
        //   childName2: data.childName2,
        //   paddressLine2: data.paddressLine2,
        //   pcity: data.pcity,
        //   pstate: data.pstate,
        //   ppincode: data.ppincode,
        //   isSameAddress: data.isSameAddress,
        //   caddressLine1: data.caddressLine1,
        //   caddressLine2: data.caddressLine2,
        //   cpstate: data.cpstate,
        //   cpincode: data.cpincode,
        //   joiningDate: data.joiningDate,
        //   division: data.division,
        //   // department: data.department,
        //   employeeStatus: data.employeeStatus,
        //   profilePhotoPath: data.profilePhotoPath,
        //   // createdAt: data.createdAt,
        //   // updatedAt: data.updatedAt,
        //   // createdBy: data.createdBy,
        //   // updatedBy: data.updatedBy,
        //   roleName: data.roleName,
        //   roleId: data.roleId,
        //   // emergencyNo: data.emergencyNo,
        
        // });
     
    
        workbook.xlsx.writeBuffer().then((data: any) => {
          let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
          fs.saveAs(blob,' Employee Report.xlsx');
        })
  }

  filterExcel(todoTable : any) {
    
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet(todoTable.employeeName+' Timesheet', {
      headerFooter: { firstHeader: "Hello Exceljs", firstFooter: "Hello Filter Data" }

    
    });
   
    

    worksheet.columns = [
      { header: 'Employee Id', key: 'employeeId', width: 20 },
      { header: 'user Id', key: 'userId', width: 20},
      { header: 'employee No', key: 'employeeNo', width: 20 },
      { header: 'employee Name', key: 'employeeName', width: 20},
      { header: 'mobile No', key: 'mobileNo', width: 20 },
      { header: 'email Id', key: 'emailId', width: 20},
      // { header: 'first Name', key: 'firstName', width: 20},
      // { header: 'middle Name', key: 'middleName', width: 20},
      // { header: 'last Name', key: 'lastName', width: 20},
      { header: 'gender', key: 'gender', width: 20},
      { header: 'mothers Name', key: 'mothersName', width: 20 },
      { header: 'date Of Birth', key: 'dateOfBirth', width: 20 },
      { header: 'marital Status', key: 'maritalStatus', width: 20 },
      { header: 'spouse Name', key: 'spouseName', width: 20 },
      { header: 'child Name1', key: 'childName1', width: 20 },
      { header: 'child Name2', key: 'childName2', width: 20},
      { header: 'paddress Line1', key: 'paddressLine1', width: 20 },
      { header: 'paddress Line2', key: 'paddressLine2', width: 20 },
      { header: 'pcity', key: 'pcity', width: 20 },
      { header: 'pstate', key: 'pstate', width: 20 },
      { header: 'ppincode', key: 'ppincode', width: 20 },
      { header: 'isSameAddress', key: 'isSameAddress', width: 20},
      { header: 'caddress Line1', key: 'caddressLine1', width: 20},
      { header: 'caddress Line2', key: 'caddressLine2', width: 20},
      { header: 'ccity', key: 'ccity', width: 20 },
      { header: 'cpstate', key: 'ccpstate', width: 20 },
      { header: 'cpincode', key: 'cpincode', width: 20 },
      { header: 'joiningDate', key: 'joiningDate', width: 20 },
      { header: 'division', key: 'division', width: 20},
      // { header: 'department', key: 'department', width: 20},
      { header: 'employeeStatus', key: 'employeeStatus', width: 20 },
      { header: 'profilePhotoPath', key: 'profilePhotoPath', width: 20 },
      // { header: 'createdAt', key: 'createdAt', width: 20},
      // { header: 'updatedAt', key: 'updatedAt', width: 20 },
      // { header: 'createdBy', key: 'createdBy', width: 20 },
      // { header: 'updatedBy', key: 'updatedBy', width: 20 },
      { header: 'role Name', key: 'roleName', width: 20},
      { header: 'role Id', key: 'roleId', width: 20},
      // { header: 'emergency No', key: 'emergencyNo', width: 20},
      
      
    ];

   
    
        worksheet.addRow({
          employeeId:todoTable.employeeId,
          userId: todoTable.userId,
          employeeNo: todoTable.employeeNo,
          employeeName: todoTable.employeeName,
          mobileNo: todoTable.mobileNo,
          emailId: todoTable.emailId,
          // firstName: data.firstName,
          // middleName: data.middleName,
          // lastName: data.lastName,
          gender: todoTable.gender,
          mothersName: todoTable.mothersName,
          dateOfBirth: todoTable.dateOfBirth,
          maritalStatus: todoTable.maritalStatus,
          spouseName: todoTable.spouseName,
          childName1: todoTable.childName1,
          childName2: todoTable.childName2,
          paddressLine2: todoTable.paddressLine2,
          pcity: todoTable.pcity,
          pstate: todoTable.pstate,
          ppincode: todoTable.ppincode,
          isSameAddress: todoTable.isSameAddress,
          caddressLine1: todoTable.caddressLine1,
          caddressLine2: todoTable.caddressLine2,
          cpstate: todoTable.cpstate,
          cpincode: todoTable.cpincode,
          joiningDate: todoTable.joiningDate,
          division: todoTable.division,
          // department: data.department,
          employeeStatus: todoTable.employeeStatus,
          profilePhotoPath: todoTable.profilePhotoPath,
          // createdAt: data.createdAt,
          // updatedAt: data.updatedAt,
          // createdBy: data.createdBy,
          // updatedBy: data.updatedBy,
          roleName: todoTable.roleName,
          roleId: todoTable.roleId,
          // emergencyNo: data.emergencyNo,
        
        });
     
    
        workbook.xlsx.writeBuffer().then((todoTable: any) => {
          let blob = new Blob([todoTable], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
          fs.saveAs(blob,' Employee Report.xlsx');
        })
  }

  exportPdf(data:any){
    let filteredData = data.filter((item:any)=>
    item.employeeName.toLowerCase().includes(this.searchKey.toLowerCase()))
   console.log("filteredData => ",filteredData);

  
    var doc = new jsPDF('l', 'mm', [297, 210]);
    var col = ['Employee Id','employee Name','mobile No','email Id',
                'date Of Birth',
               
               'caddress Line1','joiningDate', 
               'employeeStatus',];
    var rows: string[][] = [];
  
    // element.weeklyTimeSheet.sundayhr ? element.weeklyTimeSheet.sundayhr
    filteredData.forEach((element:any) => {      
      var temp: any = [element.employeeId, element.employeeName, element.mobileNo, element.emailId,element.dateOfBirth, 
        element.caddressLine1, 
        element.joiningDate,
        element.employeeStatus, 
        ];
      rows.push(temp);
  });  
    
    // var temp: any = [filteredData.employeeId, filteredData.employeeName, filteredData.mobileNo, filteredData.emailId,filteredData.dateOfBirth, 
    //                  filteredData.caddressLine1, 
    //                  filteredData.joiningDate,
    //                  filteredData.employeeStatus, 


    // ];
    // rows.push(temp);


var lineBreak="\r\n";
    // var img = new Image()
    // img.src = 'assets/img/assimilatet_logo.png'
    // doc.addImage(img, 'png', 10 , 10, 30, 10);
// doc.text(lineBreak+" Timesheet ", 120, 5 );
// doc.setFontSize(10);
// doc.text(lineBreak+"From Date - "+ moment(data.weeklyTimeSheet.mondayDate).format('DD-MM-YYYY')+"    To Date - "+ moment(data.weeklyTimeSheet.sundayDate).format('DD-MM-YYYY')+lineBreak ,10,10);
// doc.text(lineBreak+lineBreak+"Employee Name : "+data.employeeName,10,10);
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
    doc.save('Employee Report.pdf');
  }

  onBackToList(hardReload: boolean = false) {
    this.isAddEmployee = false;
    this.submitted = false;
    this.registerEmployeeForm.patchValue(this.defaultFromValue);
    if (hardReload) {
      this.getEmployees();
    }
  }




  

}
