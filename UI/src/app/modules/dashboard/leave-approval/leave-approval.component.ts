import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationService } from '@app/modules/navigation/services/navigation.service';
import { SetupService } from '@app/modules/shared/services/setup.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { LeaveApprovalService } from './leave-approval.service';
import { MenuItem } from 'primeng/api';
import * as _ from 'lodash';
import { AllLeaveDTO, ELeaveStatus, Epermission, LeaveDTO, PERMISSION } from '@app/modules/shared/model/leave.model';
import { SharedPermissionService } from '@app/modules/shared/services/shared-permission.service';
@Component({
    selector: 'sb-leave-approval',
    templateUrl: './leave-approval.component.html',
    styleUrls: ['./leave-approval.component.scss'],
    providers: [LeaveApprovalService]
})
export class LeaveApprovalComponent implements OnInit {

    public enumPer=PERMISSION;
    public enumModule=Epermission;
    getTotalLeaves:any;
    leaveApprovalData: AllLeaveDTO[] = [];
    defaultValueForm: any;
    updateLeave: any;
    updateId: any;
    rowsPerPageOptions = [5, 10, 15, 25];

    LeaveApprovalForm: FormGroup;
    statusList = ELeaveStatus;
    selectLeave!: LeaveDTO;
    constructor(
        private fb: FormBuilder,
        private getLeaveApprovalService: LeaveApprovalService, private setup: SetupService, 
        private messageService: MessageService,public sharedPermission:SharedPermissionService,
        private confirmationService: ConfirmationService) {
        this.LeaveApprovalForm = new FormGroup({
            employeeId: new FormControl(),
            fromDate: new FormControl(null, [Validators.required]),
            toDate: new FormControl('', [Validators.required]),
            leaveDescription: new FormControl('', [Validators.required,]),
            createdOn:new FormControl('',[Validators.required]),
            leaveStatus: new FormControl('PENDING'),
        });

        this.defaultValueForm = this.LeaveApprovalForm.value;
    }

    // last_index = 100;

    // counter = 100;
 
    // substring:any;


    Leavestatus: boolean = true;

    public items: MenuItem[] = [];
    public statusItem = {};
    ngOnInit() {
       


        this.GetLeaveApprovaldetails();
        this.loadAlldataList();
        
    //     this.last_index = (this.leaveApprovalData.slice(0, 100)).lastIndexOf(' ');
    // if(this.last_index > 100)
    //   this.last_index = 100;
    // this.counter = this.last_index;
       

    }

    // showTxt = "Show More"


//   toggleSkil(){




//     if(this.counter < 101 )
//       {

//         this.counter = this.leaveApprovalData.length;

//         this.showTxt = "Show less";

//       }

//       else {
//         this.counter = this.last_index;

//         this.showTxt = "Show More"
//       }

   
//   }

//     firstCount = 100;


readMore = false;
// readShow =false;

//  showText() {
//     this.isReadMore = !this.isReadMore;
//  }

// showShortDesciption = true

// alterDescriptionText() {
//    this.showShortDesciption = !this.showShortDesciption
// }


    getColor(status: string) {
        switch (status) {
            case ELeaveStatus.APPROVED:
                return 'custom-success';
            case ELeaveStatus.PENDING:
                return 'custom-warning';
            case ELeaveStatus.REJECTED:
                return 'custom-danger';
            default:
                ''

        }

    }
    dataList: any;

    loadAlldataList() {
        this.setup.getData('Employee/GetEmployee').subscribe(res => {
            this.dataList = res;
        })
    }


    resetForm() {
        this.LeaveApprovalForm.patchValue(this.defaultValueForm);
    }

    public GetLeaveApprovaldetails() {

        this.getLeaveApprovalService.GetLeaveApprovaldetails().subscribe(
            (res: AllLeaveDTO[]) => {
                this.leaveApprovalData = _.orderBy(res, ['leave.leaveId'], ['desc']);
                this.items = [
                    {
                        label: 'PENDING', icon: 'pi pi-refresh', disabled: true, command: (event) => {
                            this.updateLeaveApproval(ELeaveStatus.PENDING);

                        },
                    },
                    {
                        label: 'APPROVED', icon: 'pi pi-refresh', command: (event) => {
                            this.updateLeaveApproval(ELeaveStatus.APPROVED);
                        },
                    },
                    {
                        label: 'REJECTED', icon: 'pi pi-refresh', command: (event) => {
                            this.updateLeaveApproval(ELeaveStatus.REJECTED);
                        },
                    }]
                this.leaveApprovalData.forEach((x: AllLeaveDTO) => {
                    this.statusItem = {
                        ...this.statusItem,
                        [x.leave.leaveId]: [
                            {
                                label: 'PENDING', icon: 'pi pi-refresh', disabled: x.leave.leaveStatus == ELeaveStatus.PENDING, command: () => {
                                    this.updateLeaveApproval(ELeaveStatus.PENDING);

                                },
                            },
                            {
                                label: 'APPROVED', icon: 'pi pi-refresh', disabled: x.leave.leaveStatus == ELeaveStatus.APPROVED, command: () => {
                                    this.updateLeaveApproval(ELeaveStatus.APPROVED);
                                },
                            },
                            {
                                label: 'REJECTED', icon: 'pi pi-refresh', disabled: x.leave.leaveStatus == ELeaveStatus.REJECTED, command: () => {
                                    this.updateLeaveApproval(ELeaveStatus.REJECTED);
                                },
                           }],
                            

                            
                    }
                });
            },
            err => {

                // this.listData= _.orderBy(res, ['id'], [ 'desc']);

            }
        );
    }



    get f() {
        return this.LeaveApprovalForm.controls;
    }
    get fv() {
        return this.LeaveApprovalForm.value;
    }



    msgs: any;


    update() {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Updated' });
    }
    selectLeaveItem(item: LeaveDTO) {
        this.selectLeave = item;
    }

    updateLeaveApproval(status: string) {
        // console.log(this.selectLeave, item)
        //Leave/UpdateLeaveStatus?LeaveId=0&status=xsdsf
        if (status) {


            this.confirmationService.confirm({

                message: 'Are you sure that you want to proceed?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.setup.getData(`Leave/UpdateLeaveStatus?LeaveId=${this.selectLeave.leave.leaveId}&status=${status}`).subscribe(res => {

                        if (res) {
                            this.GetLeaveApprovaldetails();
                        }
                    })
                    // //? this.msgs = [{ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' }];
                },
                reject: () => {
                    this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'You have rejected' }];
                }
            });
        }
        //


    }

    oneFullHalfDayBox1: boolean = false;
    falseDate1: boolean = false;

    onChangeCount(item: any) {


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



}