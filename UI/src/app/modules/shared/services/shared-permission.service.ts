import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PermissionsService } from '@app/modules/dashboard/permissions/permissions.service';
import { sideNavItemsALL } from '@app/modules/navigation/data';
import { SideNavSection } from '@app/modules/navigation/models';
import { BehaviorSubject } from 'rxjs';
import { PERMISSION } from '../model/leave.model';
import { ModuleAllPermissionDTO } from '../model/permission.model';


@Injectable({
  providedIn: 'root'
})
export class SharedPermissionService {
  public _todo = new BehaviorSubject<any>(null);
  public todos$ = this._todo.asObservable();
  public permissionList: any;
  public sideNavSections: SideNavSection[] = [
    {
      text: 'Menu',
      items: []//['dashboard', 'employee', 'profile', 'holiday', 'leaves', 'project', 'timesheet', 'dashboardHeading', 'RoleManagement'],
    }
  ];
  public _sideNavSections = new BehaviorSubject<any>([]);
  public sideNavSections$ = this._sideNavSections.asObservable();

  public _sideNavChild = new BehaviorSubject<any>({});
  public sideNavChild$ = this._sideNavChild.asObservable();
  constructor(private http: HttpClient, private sharedService: PermissionsService) { }

  getModuleDetails(roleId: number) {
    this.sharedService.getModuleDetails(roleId).subscribe((res: any) => {
      let object = {};
      this.permissionList = [...res];
      res.map((item: any) => {
        let persion = {}
        item.permissionList.map((x: any) => {
          persion = {
            ...persion,
            [x.permissionId]: x.apprvedStatus
          }
        })
        object = {
          ...object,
          [item.module.moduleId]: persion
        }
        return item
      })

     
      this._todo.next(object);
      this.getSideBar();
    })

  }

  getValue() {
    return this._todo.value;
  }
  getPermission(id: number) {
    return (this.permissionList || []).find((x: any) => x.module.moduleId === id);

  }

  getParent() {
    return (this.permissionList || []).filter((x: any) => x.module.parentModuleId === 0);
  }

  getParentChild() {
    return (this.permissionList || []).filter((x: any) => x.module.parentModuleId > 0);
  }
  getSideBar() {
    const childList = this.getParentChild();
    let sideBar: any = {};
    let per = this.getValue();
    (childList || []).map((item: ModuleAllPermissionDTO) => {
      if (per && per[item.module.moduleId] && per[item.module.moduleId][PERMISSION.VIEW]) {
        if (item.module.moduleId === item.module.parentModuleId) {
          sideBar = {
            ...sideBar,
            [item.module.parentModuleId]: sideNavItemsALL[item.module.parentModuleId]
          };
        } else {
          const dat = sideBar[item.module.parentModuleId] ? [...sideBar[item.module.parentModuleId]['submenu']] || [] : [];
          sideBar = {
            ...sideBar,
            [item.module.parentModuleId]: {
              ...sideNavItemsALL[item.module.parentModuleId],
              submenu: [
                ...dat,
                sideNavItemsALL[item.module.moduleId]
              ]
            }
          };
        }
      }
    });
    const sideMenu: any[] = [];
    Object.keys(sideBar).forEach(element => {
      sideMenu.push(element);
    });
    this.sideNavSections[0]['items'] = sideMenu;
    this._sideNavSections.next(this.sideNavSections);
    this._sideNavChild.next(sideBar);
  }
  reset() {
    this._todo.next(null)
  }
}
