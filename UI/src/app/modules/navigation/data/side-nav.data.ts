import { Epermission } from '@app/modules/shared/model/leave.model';
import { SideNavItems, SideNavSection } from '@modules/navigation/models';
import moment from 'moment';
const weekNo = moment().isoWeek();
export const sideNavSections: SideNavSection[] = [
    {
        text: 'Menu',
        items: ['dashboard', 'employee', 'profile', 'holiday', 'leaves', 'project', 'timesheet', 'dashboardHeading', 'RoleManagement', 'Documents', 'Accessories','Report'],
    }

];
export const sideNavItemsSuper: SideNavItems = {
    dashboard: {
        icon: 'tachometer-alt',
        text: 'Dashboard',
        link: '/dashboard',
    },
    employee: {
        icon: 'columns',
        text: 'Employee',
        submenu: [
            {
                icon: 'tachometer-alt',
                text: 'Employee List',
                link: '/dashboard/employee',
            },
            {
                icon: 'tachometer-alt',
                text: 'Genrate Documents',
                link: '/dashboard/genrate-documents',
            }
        ],
    },
    profile: {
        icon: 'columns',
        text: 'Profile',
        submenu: [
            {
                icon: 'tachometer-alt',
                text: 'Profile',
                link: '/dashboard/update-profile',
            },
            {
                icon: 'tachometer-alt',
                text: 'Document',
                link: '/dashboard/employee-document',
            },
            {
                icon: 'tachometer-alt',
                text: 'Change-password',
                link: '/dashboard/change-password',
            }

        ],
    },

    Accessories: {
        icon: 'columns',
        text: 'Accessories',
        submenu: [
            {
                icon: 'tachometer-alt',
                text: 'Accessories Storage',
                link: '/dashboard/accessories-storage',
            },
            {
                icon: 'tachometer-alt',
                text: 'Accessories Approval',
                link: '/dashboard/accessories-issue',
            }
        ],
    },

    holiday: {
        icon: 'columns',
        text: 'Holiday',
        submenu: [
            {
                icon: 'tachometer-alt',
                text: 'Holidays',
                link: '/dashboard/holiday-details',
            }
        ],
    },
    leaves: {
        icon: 'columns',
        text: 'Leaves',
        submenu: [
            {
                icon: 'tachometer-alt',
                text: 'Leave Apply',
                link: '/dashboard/leave-details',
            },
            {
                icon: 'tachometer-alt',
                text: 'Leave Approval',
                link: '/dashboard/leave-approval',
            },
            {
                icon: 'tachometer-alt',
                text: 'Leave Report',
                link: '/dashboard/leave-report',
            }
        ],
    },

    project: {
        icon: 'columns',
        text: 'Projects',
        submenu: [
            {
                icon: 'tachometer-alt',
                text: 'Projects',
                link: '/dashboard/project',
            }
            ,
            {
                icon: 'tachometer-alt',
                text: 'Project Tasks',
                link: '/dashboard/project-task',
            }
        ],
    },
    timesheet: {
        icon: 'columns',
        text: 'Timesheet',
        submenu: [

            {
                icon: 'tachometer-alt',
                text: 'Add Timesheet',
                link: '/dashboard/add-timesheet/' + weekNo,
            },
            {
                icon: 'tachometer-alt',
                text: 'Timesheet Details',
                link: '/dashboard/timesheet-details',
            },
            {
                icon: 'tachometer-alt',
                text: 'Approve Timesheet',
                link: '/dashboard/approve-timesheet',
            }
        ],
    },

    dashboardHeading: {
        icon: 'columns',
        text: 'Dashboard Heading',
        submenu: [
            // {
            //     icon: 'tachometer-alt',
            //     text: 'Banner',
            //     link: '/dashboard/banner',
            // }
            // ,
            {
                icon: 'tachometer-alt',
                text: 'Highlights',
                link: '/dashboard/highlights',
            },
            // {
            //     icon: 'tachometer-alt',
            //     text: 'News Bits',
            //     link: '/dashboard/newsbits',
            // }
        ],
    },
    RoleManagement: {
        icon: 'columns',
        text: 'Role Management',
        submenu: [

            {
                icon: 'tachometer-alt',
                text: 'Roles',
                link: '/dashboard/roles',
            },
            {
                icon: 'tachometer-alt',
                text: 'Modules',
                link: '/dashboard/Modules',
            },
            {
                icon: 'tachometer-alt',
                text: 'Permissions',
                link: '/dashboard/Permissions',
            }
        ],
    },


 
    Documents: {
        icon: 'columns',
        text: 'Documents Details',
        submenu: [
            {
                icon: 'tachometer-alt',
                text: 'Compny Policies',
                link: '/dashboard/company-policies',
            },
        ],
    },
    report: {
        icon: 'columns',
        text: 'Report',
        submenu: [

            {
                icon: 'tachometer-alt',
                text: 'Employee_Report',
                link: '/dashboard/employee-report/' ,
            },
            {
                icon: 'tachometer-alt',
                text: 'Timesheet_Report',
                link: '/dashboard/timesheet_report',
            }
        ],
    },
};
export const sideNavItemsAdmin: SideNavItems = {
    dashboard: {
        icon: 'tachometer-alt',
        text: 'Dashboard',
        link: '/dashboard',
    },
    employee: {
        icon: 'columns',
        text: 'Employee',
        submenu: [
            {
                icon: 'tachometer-alt',
                text: 'Employee List',
                link: '/dashboard/employee',

            },

            {
                icon: 'tachometer-alt',
                text: 'Genrate Documents',
                link: '/dashboard/genrate-documents',
            }
        ],
    },
    profile: {
        icon: 'columns',
        text: 'Profile',
        submenu: [
            {
                icon: 'tachometer-alt',
                text: 'Profile',
                link: '/dashboard/update-profile',
            },
            {
                icon: 'tachometer-alt',
                text: 'Document',
                link: '/dashboard/employee-document',
            },
            {
                icon: 'tachometer-alt',
                text: 'Change-password',
                link: '/dashboard/change-password',
            }

        ],
    },
    Accessories: {
        icon: 'columns',
        text: 'Accessories',
        submenu: [
            {
                icon: 'tachometer-alt',
                text: 'Accessories Storage',
                link: '/dashboard/accessories-storage',
            },
            {
                icon: 'tachometer-alt',
                text: 'Accessories Approval',
                link: '/dashboard/accessories-issue',
            }
        ],
    },

    holiday: {
        icon: 'columns',
        text: 'Holiday',
        submenu: [
            {
                icon: 'tachometer-alt',
                text: 'Holidays',
                link: '/dashboard/holiday-details',
            }
        ],
    },
    leaves: {
        icon: 'columns',
        text: 'Leaves',
        submenu: [
            {
                icon: 'tachometer-alt',
                text: 'Leave Apply',
                link: '/dashboard/leave-details',
            },
        ],
    },
    project: {
        icon: 'columns',
        text: 'Projects',
        submenu: [
            {
                icon: 'tachometer-alt',
                text: 'Projects',
                link: '/dashboard/project',
            }
            ,
            {
                icon: 'tachometer-alt',
                text: 'Project Tasks',
                link: '/dashboard/project-task',
            }
        ],
    },
    timesheet: {
        icon: 'columns',
        text: 'Timesheet',
        submenu: [

            {
                icon: 'tachometer-alt',
                text: 'Add Timesheet',
                link: '/dashboard/add-timesheet/' + weekNo,
            },
            {
                icon: 'tachometer-alt',
                text: 'Timesheet Details',
                link: '/dashboard/timesheet-details',
            }
        ],
    },
    dashboardHeading: {
        icon: 'columns',
        text: 'Dashboard Heading',
        submenu: [
            // {
            //     icon: 'tachometer-alt',
            //     text: 'Banner',
            //     link: '/dashboard/banner',
            // }
            // ,
            {
                icon: 'tachometer-alt',
                text: 'Highlights',
                link: '/dashboard/highlights',
            },
            // {
            //     icon: 'tachometer-alt',
            //     text: 'News Bits',
            //     link: '/dashboard/newsbits',
            // }
        ],
    },
    RoleManagement: {
        icon: 'columns',
        text: 'Role Management',
        submenu: [

            {
                icon: 'tachometer-alt',
                text: 'Roles',
                link: '/dashboard/roles',
            },
            // {
            //     icon: 'tachometer-alt',
            //     text: 'Modules',
            //     link: '/dashboard/Modules',
            // },
            {
                icon: 'tachometer-alt',
                text: 'Permissions',
                link: '/dashboard/Permissions',
            }
        ],
    },
    report: {
        icon: 'columns',
        text: 'Report',
        submenu: [

            {
                icon: 'tachometer-alt',
                text: 'Employee_Report',
                link: '/dashboard/employee-report/' ,
            },
            {
                icon: 'tachometer-alt',
                text: 'Timesheet_Report',
                link: '/dashboard/timesheet_report',
            }
        ],
    }
};

export const sideNavItemsUser: SideNavItems = {
    dashboard: {
        icon: 'tachometer-alt',
        text: 'Dashboard',
        link: '/dashboard',
    },
    profile: {
        icon: 'columns',
        text: 'Profile',
        submenu: [
            {
                icon: 'tachometer-alt',
                text: 'Profile',
                link: '/dashboard/update-profile',
            },
            {
                icon: 'tachometer-alt',
                text: 'Document',
                link: '/dashboard/employee-document',
            },
            {
                icon: 'tachometer-alt',
                text: 'Change-password',
                link: '/dashboard/change-password',
            }

        ],
    },
    leaves: {
        icon: 'columns',
        text: 'Leaves',
        submenu: [
            {
                icon: 'tachometer-alt',
                text: 'Leave Apply',
                link: '/dashboard/leave-details',
            },
        ],
    },
    timesheet: {
        icon: 'columns',
        text: 'Timesheet',
        submenu: [

            {
                icon: 'tachometer-alt',
                text: 'Add Timesheet',
                link: '/dashboard/add-timesheet/' + weekNo,
            },
            {
                icon: 'tachometer-alt',
                text: 'Timesheet Details',
                link: '/dashboard/timesheet-details',
            }
        ],
    },

    Documents: {
        icon: 'columns',
        text: 'Documents Details',
        submenu: [

            {
                icon: 'tachometer-alt',
                text: 'Company Policies',
                link: '/dashboard/company-policies',
            },
                ],
    },
    report: {
        icon: 'columns',
        text: 'Report',
        submenu: [

            {
                icon: 'tachometer-alt',
                text: 'Employee_Report',
                link: '/dashboard/employee-report' ,
            },
            {
                icon: 'tachometer-alt',
                text: 'Timesheet_Report',
                link: '/dashboard/timesheet-report',
            }
        ],
    },

};
export const sideNavItemsHR: SideNavItems = {
    dashboard: {
        icon: 'tachometer-alt',
        text: 'Dashboard',
        link: '/dashboard',
    },
    employee: {
        icon: 'columns',
        text: 'Employee',
        submenu: [
            {
                icon: 'tachometer-alt',
                text: 'Employee List',
                link: '/dashboard/employee',
            },

            {
                icon: 'tachometer-alt',
                text: 'Genrate Documents',
                link: '/dashboard/genrate-documents',
            }
        ],
    },
    profile: {
        icon: 'columns',
        text: 'Profile',
        submenu: [
            {
                icon: 'tachometer-alt',
                text: 'Profile',
                link: '/dashboard/update-profile',
            },
            {
                icon: 'tachometer-alt',
                text: 'Document',
                link: '/dashboard/employee-document',
            },
            {
                icon: 'tachometer-alt',
                text: 'Change-password',
                link: '/dashboard/change-password',
            }

        ],
    },

    Accessories: {
        icon: 'columns',
        text: 'Accessories',
        submenu: [
            {
                icon: 'tachometer-alt',
                text: 'Accessories-Storage',
                link: '/dashboard/accessories-storage',
            },
            {
                icon: 'tachometer-alt',
                text: 'Accessories-Approval',
                link: '/dashboard/accessories-issue',
            }
        ],
    },

    holiday: {
        icon: 'columns',
        text: 'Holiday',
        submenu: [
            {
                icon: 'tachometer-alt',
                text: 'Holidays',
                link: '/dashboard/holiday-details',
            }
        ],
    },
    leaves: {
        icon: 'columns',
        text: 'Leaves',
        submenu: [
            {
                icon: 'tachometer-alt',
                text: 'Leave Apply',
                link: '/dashboard/leave-details',
            },
            {
                icon: 'tachometer-alt',
                text: 'Leave Report',
                link: '/dashboard/leave-report',
            },
        ],
    },
    project: {
        icon: 'columns',
        text: 'Projects',
        submenu: [
            {
                icon: 'tachometer-alt',
                text: 'Projects',
                link: '/dashboard/project',
            }
            ,
            {
                icon: 'tachometer-alt',
                text: 'Project Tasks',
                link: '/dashboard/project-task',
            }
        ],
    },
    timesheet: {
        icon: 'columns',
        text: 'Timesheet',
        submenu: [

            {
                icon: 'tachometer-alt',
                text: 'Add Timesheet',
                link: '/dashboard/add-timesheet/' + weekNo,
            },
            {
                icon: 'tachometer-alt',
                text: 'Timesheet Details',
                link: '/dashboard/timesheet-details',
            }
        ],
    },
    
    dashboardHeading: {
        icon: 'columns',
        text: 'Dashboard Heading',
        submenu: [
            // {
            //     icon: 'tachometer-alt',
            //     text: 'Banner',
            //     link: '/dashboard/banner',
            // }
            // ,
            {
                icon: 'tachometer-alt',
                text: 'Highlights',
                link: '/dashboard/highlights',
            },
            // {
            //     icon: 'tachometer-alt',
            //     text: 'News Bits',
            //     link: '/dashboard/newsbits',
            // }
        ],
    },
    Documents: {
        icon: 'columns',
        text: 'Documents Details',
        submenu: [

            {
                icon: 'tachometer-alt',
                text: 'Company Policies',
                link: '/dashboard/company-policies',
            },
                ],
    },
    report: {
        icon: 'columns',
        text: 'Report',
        submenu: [

            {
                icon: 'tachometer-alt',
                text: 'Employee_Report',
                link: '/dashboard/employee-report/' ,
            },
            {
                icon: 'tachometer-alt',
                text: 'Timesheet_Report',
                link: '/dashboard/timesheet_report',
            }
        ],
    }
};



export const sideNavItemsALL: any = {
    [Epermission.dashboard]: {
        icon: 'tachometer-alt',
        text: 'Dashboard',
        link: '/dashboard',
    },
    [Epermission.Employee]: {
        icon: 'columns',
        text: 'Employee'
    },
    [Epermission.EmployeeList]:
    {
        icon: 'tachometer-alt',
        text: 'Employee List',
        link: '/dashboard/employee',
    }
    ,


    [Epermission.genrateDocuments]:
    {
        icon: 'tachometer-alt',
        text: ' Genrate Documnets',
        link: '/dashboard/genrate-documents',
    },
    [Epermission.Offer_letter]:
    {
        icon: 'tachometer-alt',
        text: 'Offer_letter',
        link: '/dashboard/offer-letter',
    },
    [Epermission.Appiontment_letter]:
    {
        icon: 'tachometer-alt',
        text: 'Appointment_letter',
        link: '/dashboard/appointment-letter',
    },
    [Epermission.Reliving_letter]:
    {
        icon: 'tachometer-alt',
        text: 'Relieving_letter',
        link: '/dashboard/reliving-letter',
    },
    [Epermission.Experience_letter]:
    {
        icon: 'tachometer-alt',
        text: 'Experience_letter',
        link: '/dashboard/experience-letter',
    },

    [Epermission.Profile1]: {
        icon: 'columns',
        text: 'Profile',

    },

    [Epermission.Profile]: {
        icon: 'tachometer-alt',
        text: 'Profile',
        link: '/dashboard/update-profile',
    },
    [Epermission.Document]: {
        icon: 'tachometer-alt',
        text: 'Document',
        link: '/dashboard/employee-document',
    },
    [Epermission.Change_password]: {
        icon: 'tachometer-alt',
        text: 'Change-password',
        link: '/dashboard/change-password',
    },

    [Epermission.Accessories]: {
        icon: 'columns',
        text: 'Accessories',

    },

    [Epermission.accessoriesStorage]: {
        icon: 'tachometer-alt',
        text: 'Accessories Storage',
        link: '/dashboard/accessories-storage',
    },
    
    [Epermission.accessoriesIssue]: {
        icon: 'tachometer-alt',
        text: 'Accessories Isuue',
        link: '/dashboard/accessories-issue',
    },
    [Epermission.Holiday]: {
        icon: 'columns',
        text: 'Holiday',
    },

    [Epermission.Holidays]: {
        icon: 'tachometer-alt',
        text: 'Holidays',
        link: '/dashboard/holiday-details',
    },

    [Epermission.Leaves]: {
        icon: 'columns',
        text: 'Leaves',
    },

    [Epermission.LeaveApply]: {
        icon: 'tachometer-alt',
        text: 'Leave Apply',
        link: '/dashboard/leave-details',
    },
    [Epermission.Leave_Approval]: {
        icon: 'tachometer-alt',
        text: 'Leave Approval',
        link: '/dashboard/leave-approval',
    }
    ,
    [Epermission.Leave_Report]: {
        icon: 'tachometer-alt',
        text: 'Leave Report',
        link: '/dashboard/leave-report',
    },

    [Epermission.Projects1]: {
        icon: 'columns',
        text: 'Projects',
    },

    [Epermission.Projects]: {
        icon: 'tachometer-alt',
        text: 'Projects',
        link: '/dashboard/project',
    }
    ,
    [Epermission.Project_Tasks]: {
        icon: 'tachometer-alt',
        text: 'Project Tasks',
        link: '/dashboard/project-task',
    },

    [Epermission.Timesheet]: {
        icon: 'columns',
        text: 'Timesheet',
    },


    [Epermission.Add_Timesheet]: {
        icon: 'tachometer-alt',
        text: 'Add Timesheet',
        link: '/dashboard/add-timesheet/' + weekNo,
    },
    [Epermission.Timesheet_Details]: {
        icon: 'tachometer-alt',
        text: 'Timesheet Details',
        link: '/dashboard/timesheet-details',
    },
    [Epermission.Approve_Timesheet]: {
        icon: 'tachometer-alt',
        text: 'Approve Timesheet',
        link: '/dashboard/approve-timesheet',
    },


    [Epermission.Dashboard_Heading]: {
        icon: 'columns',
        text: 'Dashboard Heading',
    },
    [Epermission.Banner]: {
        icon: 'tachometer-alt',
        text: 'Banner',
        link: '/dashboard/banner',
    }
    ,
    [Epermission.Highlights]: {
        icon: 'tachometer-alt',
        text: 'Highlights',
        link: '/dashboard/highlights',
    },
    [Epermission.News_Bits]: {
        icon: 'tachometer-alt',
        text: 'News Bits',
        link: '/dashboard/newsbits',
    },
    [Epermission.Role_Management]: {
        icon: 'columns',
        text: 'Role Management',
    },

    [Epermission.Roles]: {
        icon: 'tachometer-alt',
        text: 'Roles',
        link: '/dashboard/roles',
    },
    //  [Epermission.Modules]: {
    //     icon: 'tachometer-alt',
    //     text: 'Modules',
    //     link: '/dashboard/Modules',
    // },
    [Epermission.Permissions]: {
        icon: 'tachometer-alt',
        text: 'Permissions',
        link: '/dashboard/Permissions',
    },
    [Epermission.Permissions]: {
        icon: 'tachometer-alt',
        text: 'Permissions',
        link: '/dashboard/Permissions',
    },

    [Epermission.Documents]: {
        icon: 'columns',
        text: 'Document Details',
    },

    [Epermission.compnyPolicies]: {
        icon: 'tachometer-alt',
        text: 'Company Policies',
        link: '/dashboard/company-policies',
    },
     [Epermission.Report]: {
        icon: 'columns',
        text: 'Report',
    },
    [Epermission.Employee_Report]: {
        icon: 'tachometer-alt',
        text: 'Employee_Report',
        link: '/dashboard/employee-report',
    },
    [Epermission.Timesheet_Report]: {
        icon: 'tachometer-alt',
        text: 'Timesheet_Report',
        link: '/dashboard/timesheet-report',
    },
    


    
   

};

