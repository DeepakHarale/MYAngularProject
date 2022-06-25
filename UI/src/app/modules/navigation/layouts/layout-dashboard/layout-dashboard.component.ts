import {

    ChangeDetectorRef,
    Component,
    HostBinding,
    Input,
    OnDestroy,
    OnInit,
} from '@angular/core';
import { SetupService } from '@app/modules/shared/services/setup.service';
import { SharedPermissionService } from '@app/modules/shared/services/shared-permission.service';
import { sideNavItemsAdmin, sideNavItemsHR, sideNavItemsSuper, sideNavItemsUser, sideNavSections } from '@modules/navigation/data';
import { NavigationService } from '@modules/navigation/services';
import { Subscription } from 'rxjs';

@Component({
    selector: 'sb-layout-dashboard',

    templateUrl: './layout-dashboard.component.html',
    styleUrls: ['layout-dashboard.component.scss'],
})
export class LayoutDashboardComponent implements OnInit, OnDestroy {
    @Input() static = false;
    @Input() light = false;
    @HostBinding('class.sb-sidenav-toggled') sideNavHidden = false;
    subscription: Subscription = new Subscription();
    sideNavItems = sideNavItemsAdmin;
    sideNavSections = sideNavSections;
    sidenavStyle = 'sb-sidenav-light';
    userInfo: any;

    constructor(
        public navigationService: NavigationService,
        private changeDetectorRef: ChangeDetectorRef, public sharedPermission: SharedPermissionService
    ) { this.userInfo = this.navigationService.getUserInfo(); }
    ngOnInit() {
        if (this.light) {
            this.sidenavStyle = 'sb-sidenav-light';
        }
        this.setSideNavBar(this.userInfo?.roleId);
        this.subscription.add(
            this.navigationService.sideNavVisible$().subscribe(isVisible => {
                this.sideNavHidden = !isVisible;
                this.changeDetectorRef.markForCheck();
            })
        );
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    setSideNavBar(roleId: any) {
        if (!this.sharedPermission.getValue()) {
            this.sharedPermission.getModuleDetails(roleId);
        }
        switch (roleId) {
            case 1: {
                this.sideNavItems = sideNavItemsSuper;
                break;
            }
            case 2: {
                this.sideNavItems = sideNavItemsAdmin;
                break;
            }
            case 3: {
                this.sideNavItems = sideNavItemsUser;
                break;
            }
            case 4: {
                this.sideNavItems = sideNavItemsHR;
                break;
            }


        }
    }
}
