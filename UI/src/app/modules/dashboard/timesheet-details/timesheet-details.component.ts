import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TimesheetDetailsService } from './timesheet-details.service';
import * as _ from 'lodash';
import { NavigationService } from '@app/modules/navigation/services';
import { AppStatus } from '@app/modules/app-common/constants/app-status';
@Component({
  selector: 'sb-timesheet-details',
  templateUrl: './timesheet-details.component.html',
  styleUrls: ['./timesheet-details.component.scss']
})
export class TimesheetDetailsComponent implements OnInit {

  timesheetData: any;
  errors: any;
  userInfo: any;
  appStatus = AppStatus;
  constructor(private timesheetDetailsService: TimesheetDetailsService, private dataService: NavigationService,
    private router: Router
  ) { this.userInfo = this.dataService.getUserInfo(); }
  ngOnInit(): void {
    this.getTimesheetData();
  }

  getTimesheetData() {

    this.timesheetDetailsService.getData(this.userInfo.employeeId).subscribe(
      res => {
        // const list = (res || []).filter((x: any) => x.employeeId === this.userInfo.employeeId)
        this.timesheetData = _.uniqBy(res, 'weekNo');

      },
      err => { this.errors = err }
    );
  }

  updateData(weekId: any) {

    this.router.navigate(['/dashboard/add-timesheet/' + weekId]);
    // this.router.navigate(['/dashboard/add-timesheet'])
  }

  getClassName(appStatusValue: string) {
    const key = appStatusValue && appStatusValue.toLocaleUpperCase();
    let className = 'class1';
    switch (key) {
      case this.appStatus.PENDING:
        className = 'class1';
        break;

      case this.appStatus.SUBMITTED:
        className = 'class3';
        break;
      case this.appStatus.REJECTED:
        className = 'class2';
        break;
      case this.appStatus.APPROVED:
        className = 'class1';
        break;
    }
    return className;
  }

  toViewButton(appStatusValue: string) {
    const key = appStatusValue && appStatusValue.toLocaleUpperCase();
    let toShow = false;
    // tData.status=='APPROVED' || tData.status=='SUBMITTED' || tData.status === 'REJECTED' || tData.status === 'submitted'
    if(this.appStatus.APPROVED == key || this.appStatus.SUBMITTED == key || this.appStatus.REJECTED == key) {
      toShow = true;
    }

    return toShow;
  }
  toNormaliseStatusKey(appStatusValue: string) {
    return appStatusValue && appStatusValue.toLocaleUpperCase();
  }
}
