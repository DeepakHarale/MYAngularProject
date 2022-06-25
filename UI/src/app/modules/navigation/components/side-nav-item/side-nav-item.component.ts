import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SBRouteData, SideNavItem } from '@modules/navigation/models';

@Component({
    selector: 'sb-side-nav-item',

    templateUrl: './side-nav-item.component.html',
    styleUrls: ['side-nav-item.component.scss'],
})
export class SideNavItemComponent implements OnInit {
    @Input() sideNavItem!: SideNavItem;
    @Input() isActive!: boolean;
    @Input() idx!: number;
    url: string = "asdf";
    expanded = false;
    routeData!: SBRouteData;

    constructor(public router: Router) { }
    ngOnInit() {
        if (this.sideNavItem && this.sideNavItem.submenu) {
            this.sideNavItem.submenu.forEach(element => {
                if (element.link === this.router.url) {
                    this.expanded = true;
                }
            });
        }
    }
    over() {
        this.expanded = true;
    }
    out() {
        this.expanded = false;
    }
}
