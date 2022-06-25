import { Component, OnInit } from '@angular/core';
import { HolidayService } from '../../holiday-details/holiday.service';
import * as _ from 'lodash';
import { SetupService } from '@app/modules/shared/services/setup.service';
import { TodoList, UserDTO } from '@app/modules/shared/model/user.model';
import { NavigationService } from '@app/modules/navigation/services';
import moment from 'moment';


@Component({
    selector: 'sb-dashboard',

    templateUrl: './dashboard.component.html',
    styleUrls: ['dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
    getleavedata!: any;
    display = false;
    constructor(private getHolidayService: HolidayService, private setupService: SetupService, private navigate: NavigationService) {
        this.userInfo = this.navigate.getUserInfo();
    }
    ngOnInit() {
        this.GetHolidayDetails();
        this.getAvailableLeaves();
        this.GetNewJoineeEmployee();
    }
    togglePdf(e: any) { e.preventDefault(); this.display = !this.display };

    getHoliday: any
    currentDate: any;
    holidayList: any;
    availableLeaveList: any;
    userInfo!: UserDTO;
    selectedCount: any;
    LWS: any;
    dataList: any;
    public GetHolidayDetails() {

        this.currentDate = moment().format("MM-DD-YYYY");

        this.getHolidayService.GetHolidayDetails().subscribe(
            res => {

                const data = res.filter((x: any) => new Date(moment(x.date).format("MM-DD-YYYY")) >= new Date(this.currentDate));
                this.holidayList = data.sort((a, b) => a.date > b.date ? 1 : -1);

            },
            err => {
                this.getHoliday = err;
            }
        );
    }



    getEmployee: any

    GetNewJoineeEmployee() {
        //    let cDate = '1/21/2022';
        //    let currentDates = moment(cDate).format('MM-DD-YYYY');
        //    let Pdate = '1/27/2022';
        //    let previousDate = moment(Pdate).format('MM-DD-YYYY');

        let currentDates = moment().format('MM-DD-YYYY')
        let previousDate = moment().subtract(15, 'days').format('MM-DD-YYYY');
        // console.log("date",currentDates);
        // console.log("pDate", previousDate);
        this.setupService.getEmployeeByJoiningDate(currentDates, previousDate).subscribe(res => {
            this.getEmployee = res;

        })

    }


    getAvailableLeaves() {
        this.setupService.getData('LeaveManagement/AvailableLeaves/' + this.userInfo.employeeId).subscribe(
            res => {
                this.availableLeaveList = res;
                // console.log(JSON.stringify(res))
                this.getLeaveBalnce();

            }
        )
    }


    getLeaveBalnce() {

        // if(this.getleavedata>1){
        this.getleavedata = this.availableLeaveList.filter((x: any) => x.leaveId < 3).map((x: any) => x.leaveCount)
        // }
    }





}
