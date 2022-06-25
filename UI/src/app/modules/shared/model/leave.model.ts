export interface LeaveType {
    leaveId: number;
    leaveName: string;
    assignedDays: number;
}

export interface LeaveDetail {
    leaveId: number;
    leaveTypeId: number | null;
    leaveTypeFrom: string;
    fromDate: string | null;
    leaveTypeTo: string;
    toDate: string | null;
    leaveDescription: string;
    employeeId: number;
    createdBy: string;
    createdOn: string | null;
    totalDays: number,
    leaveStatus: string,
    leaveBalance:string
}

export interface LeaveDTO {
    leave: LeaveDetail;
    leaveType: LeaveType;
}


export enum allSideNavSection {
   DASHBOARD  = "dashboard",
   EMPLOYEE="employee",
   PROFILE= "profile",
   HOLIDA="holiday",
   LEAVE="leaves", 
   PROJECT="project",
   TIMESHEET="timesheet",
   DASHBOARD_HEADING="dashboardHeading",
   ROL_EMANAGEMENT="RoleManagement"

  
}

export enum ERoles {

    SUPERADMIN = 1,
    roleName = 2,
    USER = 3,
    HR = 4

}
export enum PERMISSION {
    ADD = 1,
    EDIT = 2,
    DELETE = 3,
    VIEW = 4
}

export enum ELeaveStatus {
    PENDING = "PENDING",
    APPROVED = "APPROVED",
    REJECTED = "REJECTED",
}


export enum Epermission {

    dashboard = 1,
    Employee = 2,
    EmployeeList = 3,
    Profile1 = 4,
    Profile = 5,
    Document = 6,
    Change_password = 7,
    Holiday = 8,
    Holidays = 9,
    Leaves = 10,
    LeaveApply = 11,
    Leave_Approval = 12,
    Projects1 = 13,
    Projects = 14,
    Project_Tasks = 15,
    Timesheet = 16,
    Add_Timesheet = 17,
    Timesheet_Details = 18,
    Dashboard_Heading = 19,
    Banner = 20,
    Highlights = 21,
    News_Bits = 22,
    Role_Management = 23,
    Roles = 24,
    Modules = 25,
    Permissions = 26,
    Approve_Timesheet = 27,
    Leave_Report = 28,
    Documents = 29,
    compnyPolicies=30,
    genrateDocuments=31,
    Accessories=32,
    accessoriesStorage=33,
    accessoriesIssue=34,
    Report=35,
    Employee_Report=36,
    Timesheet_Report=37,
    Offer_letter=39,
    Appiontment_letter=40,
    Reliving_letter=41,
    Experience_letter=42
    

}

export enum ETimeSheetStatus {
    PENDING = "PENDING",
    SUBMITTED = "SUBMITTED",
    APPROVED = "APPROVED",
}
export interface AllLeaveDTO {
    leave: LeaveDetail;
    leaveType: LeaveType;
    employee: EmployeeDetail;
}

export enum MaleFemaleEnum {
    MALE = 'Male',
    FEMALE = 'Female'
}

export enum LeaveTypeEnum {
    EL = 'Earned Leave',
    CL = 'Casual Leave/Sick Leave',
    LOP = 'Leave Without Pay',
    Birthday = 'Birthday Leave',
    Annivarsary = 'Annivarsary Leave',
    CompOff = 'Compensatory Off',
    Matternity = 'Matternity Leave',
    Paternity = 'Paternity',
    Miscariage = 'Miscariage',
    Adoption = 'Adoption/Surrogacy',
}


export interface EmployeeDetail {
    employeeId: number;
    userId: number;
    employeeNo: string;
    employeeName: string;
    mobileNo: string;
    emailId: string;
    firstName: string;
    middleName: string;
    lastName: string;
    gender: string;
    mothersName: string;
    dateOfBirth: string | null;
    maritalStatus: string;
    spouseName: string;
    childName1: string;
    childName2: string;
    paddressLine1: string;
    paddressLine2: string;
    pcity: string;
    pstate: string;
    ppincode: string;
    isSameAddress: boolean | null;
    caddressLine1: string;
    caddressLine2: string;
    ccity: string;
    cpstate: string;
    cpincode: string;
    joiningDate: string | null;
    division: string;
    department: string;
    employeeStatus: string;
    profilePhotoPath: string;
    createdAt: string | null;
    updatedAt: string | null;
}
export interface EmployeeDetailsDTO {
    Gender: string;
    DateOfBirth: string | null;
    JoiningDate: string | null;
}

export interface EmplyeeLeaveDTO {
    leaveId: Number;
    leaveCount: Number;
}