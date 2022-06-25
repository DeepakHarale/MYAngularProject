export interface UserDTO {
    userId: number;
    userName: string;
    password: string;
    createdAt: string | null;
    roleId: number | null;
    roleName: string;
    employeeId: number;
    empoyeeNo: string;
    employeeName: string;
    mobileNo: string;
    emailId: string;
    profilePhotoPath: string;
    projectId: number;
}

export interface USERINFO {
    user: UserDTO;
    tokenString: string;
}

export interface TodoList{
    toDoId:number;
    empId:number;
    description:string;
    isActive:boolean;
}

export class toDoModel{
    toDoId:number=0;
    empId:number=0;
    description:string='xyz';
    isActive:boolean=true;
}

export interface Highlightsmodel {
    highlightsId?:string;
    highlightsPath?:HTMLImageElement;
    highlightsTitle?:string;
    highlightsDescription?:string;
    
}