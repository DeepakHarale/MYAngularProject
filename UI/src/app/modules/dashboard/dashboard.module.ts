/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

/* Modules */
import { AppCommonModule } from '@common/app-common.module';
import { NavigationModule } from '@modules/navigation/navigation.module';


/* Components */
import * as dashboardComponents from './components';

/* Containers */
import * as dashboardContainers from './containers';

/* Guards */
import * as dashboardGuards from './guards';

/* Services */
import * as dashboardServices from './services';
import { UploadDocumentComponent } from './upload-document/upload-document.component';
import { EmployeeRegisterComponent } from './employee-register/employee-register.component';
import { ChangePasswordComponent } from './containers/change-password/change-password.component';

import { ViewDetailsComponent } from './view-details/view-details.component';
import { PrimeModule } from '../shared/module/prime/prime.module';
import { HolidayDetailsComponent } from './holiday-details/holiday-details.component';
import { LeaveDetailsComponent } from './leave-details/leave-details.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { AddTimesheetComponent } from './add-timesheet/add-timesheet.component';
import { TimesheetDetailsComponent } from './timesheet-details/timesheet-details.component';
import { ProjectComponent } from './project/project.component';
import { ProjectTaskComponent } from './project-task/project-task.component';
import {ConfirmPopupModule} from 'primeng/confirmpopup';
import {ConfirmationService} from 'primeng/api';
import { ProjectTaskDetailsComponent } from './project-task-details/project-task-details.component';
import {CalendarModule} from 'primeng/calendar';
import { LeaveApprovalComponent } from './leave-approval/leave-approval.component';
import { RolesComponent } from './roles/roles.component';
import { ModulesComponent } from './modules/modules.component';
import { PermissionsComponent } from './permissions/permissions.component';
import { CardModule } from 'primeng/card';
import {SplitterModule} from 'primeng/splitter';
import {CarouselModule} from 'primeng/carousel';
import { ReadMoreModule } from 'ng-readmore';
 import { BannerComponent } from './banner/banner.component';
import { HighlightsComponent } from './highlights/highlights.component';
// import { NewsbitsComponent } from './newsbits/newsbits.component';
import { ApproveTimesheetComponent } from './approve-timesheet/approve-timesheet.component';
import { BodyContentComponent } from '../shared/componets/Permission/app.body.content';
import {AccordionModule} from 'primeng/accordion';
import { LeaveReportComponent } from './leave-report/leave-report.component';

import { CompanyPoliciesComponent } from './company-policies/company-policies.component';
import { GenrateDocumentsComponent } from './genrate-documents/genrate-documents.component';
import { AccessoriesStorageComponent } from './accessories-storage/accessories-storage.component';
import { AccessoriesIssueComponent } from './accessories-issue/accessories-issue.component';
import { AccessoriesDetailsComponent } from './accessories-details/accessories-details.component';
import { EmployeeReportComponent } from './employee-report/employee-report.component';
import { TimesheetReportComponent } from './timesheet-report/timesheet-report.component';
import { OfferLetterComponent } from './offer-letter/offer-letter.component';
import { AppointmentLetterComponent } from './appointment-letter/appointment-letter.component';
import { RelivingLetterComponent } from './reliving-letter/reliving-letter.component';
import { ExperienceLetterComponent } from './experience-letter/experience-letter.component';







@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        FormsModule,
        AppCommonModule,
        NavigationModule,
        NgSelectModule,
        PrimeModule,
        CommonModule,
        ConfirmPopupModule,
        CalendarModule,
        CardModule,
        SplitterModule,
        CarouselModule,
        ReadMoreModule,
        AccordionModule,
    

    ],
    providers: [...dashboardServices.services, ...dashboardGuards.guards,ConfirmationService],
    declarations: [...dashboardContainers.containers, ...dashboardComponents.components,
        UploadDocumentComponent, EmployeeRegisterComponent, ChangePasswordComponent,
        ViewDetailsComponent, HolidayDetailsComponent, LeaveDetailsComponent,
        TimesheetDetailsComponent,AddTimesheetComponent, ProjectComponent,  ProjectTaskComponent, ProjectTaskDetailsComponent, 
        LeaveApprovalComponent,HighlightsComponent, RolesComponent, ModulesComponent, PermissionsComponent, ApproveTimesheetComponent,
        BodyContentComponent,LeaveReportComponent,BannerComponent, CompanyPoliciesComponent, GenrateDocumentsComponent, 
        AccessoriesStorageComponent, AccessoriesIssueComponent, AccessoriesDetailsComponent, EmployeeReportComponent,TimesheetReportComponent, OfferLetterComponent, AppointmentLetterComponent, RelivingLetterComponent, ExperienceLetterComponent
        
         //NewsbitsComponent
            ],

    exports: [...dashboardContainers.containers, ...dashboardComponents.components, BodyContentComponent],
})
export class DashboardModule { }
