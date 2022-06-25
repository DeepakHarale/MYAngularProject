export interface ModulePermissionDTO {
    moduleId: number;
    permissionId: number;
    permissionName: string;
    apprvedStatus: boolean;
}

export interface Module {
    moduleId: number;
    parentModuleId: number;
    moduleName: string;
    moduleDesc: string;
    addedOn: string | null;
    addedBy: number | null;
    isActive: boolean | null;
    orderById: number | null;
}

export interface ModuleAllPermissionDTO {
    module: Module;
    permissionList: ModulePermissionDTO[];
}