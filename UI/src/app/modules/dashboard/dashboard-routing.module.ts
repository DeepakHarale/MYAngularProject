/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SBRouteData } from '@modules/navigation/models';

/* Module */
import { DashboardModule } from './dashboard.module';

/* Containers */
import * as dashboardContainers from './containers';

/* Guards */
import * as dashboardGuards from './guards';
import { EmployeeRegisterComponent } from './employee-register/employee-register.component';
import { UploadDocumentComponent } from './upload-document/upload-document.component';
import { ChangePasswordComponent } from './containers/change-password/change-password.component';
import { ViewDetailsComponent } from './view-details/view-details.component';
import { HolidayDetailsComponent } from './holiday-details/holiday-details.component';
import { LeaveDetailsComponent } from './leave-details/leave-details.component';
import { AddTimesheetComponent } from './add-timesheet/add-timesheet.component';
import { TimesheetDetailsComponent } from './timesheet-details/timesheet-details.component';
import { ProjectComponent } from './project/project.component';
import { ProjectTaskComponent } from './project-task/project-task.component';
import { ProjectTaskDetailsComponent } from './project-task-details/project-task-details.component';
import { LeaveApprovalComponent } from './leave-approval/leave-approval.component';
import { RolesComponent } from './roles/roles.component';
// import { RolemanagementComponent } from './rolemanagement/rolemanagement.component';
 import { BannerComponent } from './banner/banner.component';
// import { NewsbitsComponent } from './newsbits/newsbits.component';
import{HighlightsComponent} from './highlights/highlights.component';
import { ModulesComponent } from './modules/modules.component';
import { PermissionsComponent } from './permissions/permissions.component';
import { ApproveTimesheetComponent } from './approve-timesheet/approve-timesheet.component';
import { LeaveReportComponent } from './leave-report/leave-report.component';
import { CompanyPoliciesComponent } from './company-policies/company-policies.component';
import { GenrateDocumentsComponent } from './genrate-documents/genrate-documents.component';
import { AccessoriesStorageComponent } from './accessories-storage/accessories-storage.component';
import { AccessoriesIssueComponent } from './accessories-issue/accessories-issue.component';
import { EmployeeReportComponent } from './employee-report/employee-report.component';
import { TimesheetReportComponent } from './timesheet-report/timesheet-report.component';
import { OfferLetterComponent } from './offer-letter/offer-letter.component';
import { AppointmentLetterComponent } from './appointment-letter/appointment-letter.component';
import { RelivingLetterComponent } from './reliving-letter/reliving-letter.component';
import { ExperienceLetterComponent } from './experience-letter/experience-letter.component';




/* Routes */
export const ROUTES: Routes = [
    {
        path: '',
        data: {
            title: 'Dashboard - HR Admin',
            breadcrumbs: [
                {
                    text: 'Dashboard',
                    active: true,
                },
            ],
        } as SBRouteData,
        canActivate: [],
        component: dashboardContainers.DashboardComponent,
    },
    {
        path: 'employee',
        data: {
            title: '',
            breadcrumbs: [
                {
                    text: 'Dashboard',
                    link: '/dashboard/employee',
                }
            ],
        } as SBRouteData,
        canActivate: [],
        component: EmployeeRegisterComponent,
    },
    {
        path: 'offer-letter',
        data: {
            title: '',
            breadcrumbs: [
                {
                    text: 'Dashboard',
                    link: '/dashboard/offer-letter',
                }
            ],
        } as SBRouteData,
        canActivate: [],
        component: OfferLetterComponent,
    },
    {
        path: 'appointment-letter',
        data: {
            title: '',
            breadcrumbs: [
                {
                    text: 'Dashboard',
                    link: '/dashboard/appointment-letter',
                }
            ],
        } as SBRouteData,
        canActivate: [],
        component: AppointmentLetterComponent,
    },
    {
        path: 'reliving-letter',
        data: {
            title: '',
            breadcrumbs: [
                {
                    text: 'Dashboard',
                    link: '/dashboard/reliving-letter',
                }
            ],
        } as SBRouteData,
        canActivate: [],
        component: RelivingLetterComponent,
    },
    {
        path: 'experience-letter',
        data: {
            title: '',
            breadcrumbs: [
                {
                    text: 'Dashboard',
                    link: '/dashboard/experience-letter',
                }
            ],
        } as SBRouteData,
        canActivate: [],
        component: ExperienceLetterComponent,
    },

    {
        path: 'genrate-documents',
        data: {
            title: '',
            breadcrumbs: [
                {
                    text: 'Dashboard',
                    link: '/dashboard/genrate-documents',
                }
            ],
        } as SBRouteData,
        canActivate: [],
        component: GenrateDocumentsComponent,
    },

    {
        path: 'accessories-storage',
        data: {
            title: '',
            breadcrumbs: [
                {
                    text: 'Dashboard',
                    link: '/dashboard/accessories-storage',
                }
            ],
        } as SBRouteData,
        canActivate: [],
        component: AccessoriesStorageComponent,
    },

    {
        path: 'accessories-issue',
        data: {
            title: '',
            breadcrumbs: [
                {
                    text: 'Dashboard',
                    link: '/dashboard/accessories-issue',
                }
            ],
        } as SBRouteData,
        canActivate: [],
        component: AccessoriesIssueComponent,
    },

    {
        path: 'employee-document',
        data: {
            title: '',
            breadcrumbs: [
                {
                    text: 'Dashboard',
                    link: '/dashboard/employee-document',
                }
            ],
        } as SBRouteData,
        canActivate: [],
        component: UploadDocumentComponent,
    },
    {
        path: 'change-password',
        data: {
            title: '',
            breadcrumbs: [
                {
                    text: 'Dashboard',
                    link: '/dashboard/change-password',
                }
            ],
        } as SBRouteData,
        canActivate: [],
        component: ChangePasswordComponent,
    },


    {
        path: 'view-details',
        data: {
            title: '',
            breadcrumbs: [
                {
                    text: 'Dashboard',
                    link: '/dashboard/view-details',
                }
            ],
        } as SBRouteData,
        canActivate: [],
        component: ViewDetailsComponent,
    },
    {
        path: 'update-profile',
        data: {
            title: '',
            breadcrumbs: [
                {
                    text: 'Dashboard',
                    link: '/dashboard/update-profile',
                }
            ],
        } as SBRouteData,
        canActivate: [],
        component: ViewDetailsComponent,
    },
    {
        path: 'holiday-details',
        data: {
            title: '',
            breadcrumbs: [
                {
                    text: 'Dashboard',
                    link: '/dashboard/holiday-details',
                }
            ],
        } as SBRouteData,
        canActivate: [],
        component: HolidayDetailsComponent,
    },
    {
        path: 'leave-details',
        data: {
            title: '',
            breadcrumbs: [
                {
                    text: 'Dashboard',
                    link: '/dashboard/leave-details',
                }
            ],
        } as SBRouteData,
        canActivate: [],
        component: LeaveDetailsComponent,
    },
    {
        path: 'leave-approval',
        data: {
            title: '',
            breadcrumbs: [
                {
                    text: 'Dashboard',
                    link: '/dashboard/leave-approval',
                }
            ],
        } as SBRouteData,
        canActivate: [],
        component: LeaveApprovalComponent,
    },
    {
        path: 'leave-report',
        data: {
            title: '',
            breadcrumbs: [
                {
                    text: 'Dashboard',
                    link: '/dashboard/leave-report',
                }
            ],
        } as SBRouteData,
        canActivate: [],
        component: LeaveReportComponent,
    },
    {
        path: 'add-timesheet/:weekId',
        data: {
            title: '',
            breadcrumbs: [
                {
                    text: 'Dashboard',
                    link: '/dashboard/add-timesheet',
                }
            ],
        } as SBRouteData,
        canActivate: [],
        component: AddTimesheetComponent,
    },
    {
        path: 'timesheet-details',
        data: {
            title: '',
            breadcrumbs: [
                {
                    text: 'Dashboard',
                    link: '/dashboard/timesheet-details',
                }
            ],
        } as SBRouteData,
        canActivate: [],
        component: TimesheetDetailsComponent,
    },
    {
        path: 'project',
        data: {
            title: '',
            breadcrumbs: [
                {
                    text: 'Dashboard',
                    link: '/dashboard/project',
                }
            ],
        } as SBRouteData,
        canActivate: [],
        component: ProjectComponent,
    },    
    {
        path: 'project-task',
        data: {
            title: '',
            breadcrumbs: [
                {
                    text: 'Dashboard',
                    link: '/dashboard/project-task',
                }
            ],
        } as SBRouteData,
        canActivate: [],
        component: ProjectTaskComponent,
    },
    {
        path: 'project-task-details',
        data: {
            title: '',
            breadcrumbs: [
                {
                    text: 'Dashboard',
                    link: '/dashboard/project-task-details/:id/:proId',
                }
            ],
        } as SBRouteData,
        canActivate: [],
        component: ProjectTaskDetailsComponent,
    },
    //  {
    //     path: 'roles',
        
    {
        path: 'banner',
        data: {
            title: '',
            breadcrumbs: [
                {
                    text: 'Dashboard',
                    link: '/dashboard/banner',
                    
                }
            ],
            
        } as SBRouteData,
        canActivate: [],
        component: BannerComponent,
     },
    //             {
    //                 path: 'newsbits',
    //                 data: {
    //                     title: '',
    //                     breadcrumbs: [
    //                         {
    //                             text: 'Dashboard',
    //                             link: '/dashboard/newsbits',
    //                         }
    //                     ],
    //                 } as SBRouteData,
    //                 canActivate: [],
    //                 component: NewsbitsComponent,
    //             },
                 {
                    path: 'highlights',
                    data: {
                        title: '',
                        breadcrumbs: [
                            {
                                text: 'Dashboard',
                                link: '/dashboard/highlights',
                            }
                        ],
                    } as SBRouteData,
                    canActivate: [],
                    component:HighlightsComponent
                
       
    },

    {
        path: 'roles',
        data: {
            title: '',
            breadcrumbs: [
                {
                    text: 'Dashboard',
                    link: '/dashboard/roles',
                    
                }
            ],
            
        } as SBRouteData,
        canActivate: [],
        component: RolesComponent,
                },
                {
                    path: 'Modules',
                    data: {
                        title: '',
                        breadcrumbs: [
                            {
                                text: 'Dashboard',
                                link: '/dashboard/Modules',
                            }
                        ],
                    } as SBRouteData,
                    canActivate: [],
                    component: ModulesComponent,
                },
                {
                    path: 'Permissions',
                    data: {
                        title: '',
                        breadcrumbs: [
                            {
                                text: 'dashboard',
                                link: '/dashboard/Permissions',
                            }
                        ],
                    } as SBRouteData,
                    canActivate: [],
                    component:PermissionsComponent
                
       
    },
    {
        path: 'approve-timesheet',
        data: {
            title: '',
            breadcrumbs: [
                {
                    text: 'Dashboard',
                    link: '/dashboard/approve-timesheet',
                }
            ],
        } as SBRouteData,
        canActivate: [],
        component: ApproveTimesheetComponent,
    },


    {
        path: 'company-policies',
        data: {
            title: '',
            breadcrumbs: [
                {
                    text: 'dashboard',
                    link: '/dashboard/company-policies',
                }
            ],
        } as SBRouteData,
        canActivate: [],
        component:CompanyPoliciesComponent

    },

    {
        path: 'employee-report',
        data: {
            title: '',
            breadcrumbs: [
                {
                    text: 'Dashboard',
                    link: '/dashboard/employee-report',
                }
            ],
        } as SBRouteData,
        canActivate: [],
        component: EmployeeReportComponent,
    },
    {
        path: 'timesheet-report',
        data: {
            title: '',
            breadcrumbs: [
                {
                    text: 'Dashboard',
                    link: '/dashboard/timesheet-report',
                }
            ],
        } as SBRouteData,
        canActivate: [],
        component:TimesheetReportComponent,
    },
    
];

@NgModule({
    imports: [DashboardModule, RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
})
export class DashboardRoutingModule { }
