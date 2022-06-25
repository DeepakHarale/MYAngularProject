import { Component, OnInit } from '@angular/core';
import { SharedPermissionService } from '@app/modules/shared/services/shared-permission.service';
import { UserService } from '@modules/auth/services';

@Component({
    selector: 'sb-top-nav-user',
    
    templateUrl: './top-nav-user.component.html',
    styleUrls: ['top-nav-user.component.scss'],
})
export class TopNavUserComponent implements OnInit {
    constructor(public userService: UserService, private sharedPermission:SharedPermissionService) { }
    ngOnInit() {
        this.userService.getUser();
     }
    onLogout() {
        sessionStorage.clear();
        this.sharedPermission.reset();
    }
}
