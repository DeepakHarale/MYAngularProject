import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SBRouteData, SideNavItem } from '@modules/navigation/models';

@Component({
    selector: 'sb-side-nav-sub-item',    
    templateUrl: './side-nav-item-sub.component.html',
    styleUrls: ['side-nav-item-sub.component.scss'],
})
export class SideNavItemSubComponent implements OnInit {
    @Input() sideNavItem!: SideNavItem;
    @Input() isActive!: boolean;
    @Input() idx!: number;
    url: string = "asdf";
    expanded = false;
    routeData!: SBRouteData;

    constructor(public router : Router) {}
    ngOnInit() {
    }
    over(){
        this.expanded=true;
    }
    out(){
        this.expanded=false;
    }
}
