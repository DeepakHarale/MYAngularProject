import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { HolidayService } from './holiday.service';

import { NavigationService } from '@app/modules/navigation/services';
import { ConfirmationService, MessageService } from 'primeng/api';
import _ from 'lodash';
import moment from 'moment';
import { SharedPermissionService } from '@app/modules/shared/services/shared-permission.service';
import { Epermission, PERMISSION } from '@app/modules/shared/model/leave.model';

@Component({
    selector: 'sb-holiday-details',
    templateUrl: './holiday-details.component.html',
    styleUrls: ['./holiday-details.component.scss'],
    providers: [HolidayService],
})
export class HolidayDetailsComponent implements OnInit {  
    public enumPer=PERMISSION;
    public enumModule=Epermission;    
    holidayTypeList: any[] = [];
    startOfCalenderYear: any;
    endOfCalenderYear: any;    
    getHoliday: any;
    isAddHoliday = false;
    Addholidays: any;
    submitted = false;
    defaultValueForm: any;
    isUpdateHoliday: boolean = false;
    rowsPerPageOptions = [5, 10, 15, 25]
    StartYear: any;
    EndYear: any;
    startdate: any;
    userInfo: any = {}
    HolidayForm: FormGroup;
    constructor(private fb: FormBuilder, private getHolidayService: HolidayService, private navigate: NavigationService,
        private confirmationService: ConfirmationService, private messageService: MessageService, public sharedPermission:SharedPermissionService) {
        this.HolidayForm = new FormGroup({
            holidayId: new FormControl(0),
            holidayType: new FormControl('', [Validators.required]),
            date: new FormControl(moment().format("YYYY-MM-DD"), [Validators.required]),
            optional: new FormControl(false),
            addedOn: new FormControl(new Date()),
            addedBy: new FormControl(new Date()),
        });
        this.userInfo = this.navigate.getUserInfo();
        this.defaultValueForm = this.HolidayForm.value;
    }  
    get holidayType() { return this.HolidayForm.get('holidayType') }
    get date() { return this.HolidayForm.get('date') }


    get f() {
        return this.HolidayForm.controls;
    }
    get fv() {
        return this.HolidayForm.value;
    }

   
    ngOnInit(): void {
        this.GetHolidayDetails();
        const newDate = new Date();
        const currentMonth = new Date().getMonth();
        const currentDate: Date = new Date();
        var currentYear = currentDate.setFullYear(currentDate.getFullYear());

        if (newDate.getMonth() < 3) {
            this.startOfCalenderYear = moment(moment(currentYear).subtract(1, 'years').format("YYYY") + "-01-01", "YYYY-MM-DD");
            this.endOfCalenderYear = moment(moment(currentYear).format("YYYY") + "-12-31", "YYYY-MM-DD");
        }
        else {
            this.startOfCalenderYear = moment(moment(currentYear).format("YYYY") + "-01-01", "YYYY-MM-DD");
            this.endOfCalenderYear = moment(moment(currentYear).add(1, 'years').format("YYYY") + "-12-31", "YYYY-MM-DD");
        }
    }

    

    public GetHolidayDetails() {
        this.getHolidayService.GetHolidayDetails().subscribe(
            res => {
                this.getHoliday =  _.orderBy(res, ['date'], ['asc']);
                this.holidayTypeList = _.uniqBy(res, 'holidayType');
            },
            err => {
                this.getHoliday = err;
            }
        );
    }

    onSubmit() {
        this.submitted = true;
        if (this.HolidayForm.invalid) {
            return;
        }
        const postData = {
            ...this.fv
        };
        const existsList = _.find(this.getHoliday, ['holidayType', postData.holidayType]);
        if (existsList) {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'This Holiday Type is already Exist..' });
            return;
        }
        this.getHolidayService.postData(postData).subscribe(res => {
            if (res.holidayId > 0) {
                this.onBackToList(true);
                this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Holiday details Saved successfully..' });
            }
            else {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'This data is already Exist..' });
            }
        });
    }
    resetForm() {
        this.HolidayForm.patchValue(this.defaultValueForm);
    }
    AddHolidayDetails(users: any) {
        this.isAddHoliday = true;
        this.isUpdateHoliday = false;

        this.resetForm();
        this.disabledEnableControl(true);

    }

    onBackToList(hardReload: boolean = false) {
        this.submitted = false;
        this.isAddHoliday = false;
        if (hardReload) {
            this.GetHolidayDetails();
        }
    }

    isDeleteHide = false;




    onDeleted(event: Event, item: any) {
        this.confirmationService.confirm({
            target: event.target || undefined,
            message: 'Are you sure that you want to proceed?',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                //confirm action
                if (item) {
                    this.getHolidayService.DeleteHolidayDetails(item).subscribe(
                        res => {
                            if (res === true) {
                                this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Holiday list deleted successfully..' });
                                this.GetHolidayDetails();
                            } else {
                                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something wrong...' });
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

    UpdateHoliday() {
        // this.submitted = true;
        if (this.HolidayForm.invalid) {
            return;
        }
        const UpdateHoliday = {
            ...this.fv,
            projectId: this.HolidayForm.get('holidayId')?.value
        };
        if (UpdateHoliday.holidayId > 0) {
            this.getHolidayService.UpdateData(UpdateHoliday).subscribe(res => {
                if (res) {
                    this.onBackToList(true);
                    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Holiday details successfully Updated ..' });
                }
                else {
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Update Data failed..' });
                }
            });
        }
    }


    updatedData(data: any) {
        this.HolidayForm.patchValue(data);
        this.isAddHoliday = true;
        this.isUpdateHoliday = true;
        this.disabledEnableControl(true);
        this.HolidayForm.get('date')?.setValue(moment(data.date).format('YYYY-MM-DD'));
    }

    disabledEnableControl(isenable: boolean) {
        if (isenable) {
            this.HolidayForm.get('holidayId')?.enable();

        } else {
            this.HolidayForm.get('holidayId')?.disable();

        }
    }   
}
