import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { DashboardHeadComponent } from './dashboard-head/dashboard-head.component';
import { SideNavItemSubComponent } from './side-nav-item-sub/side-nav-item-sub.component';
import { SideNavItemComponent } from './side-nav-item/side-nav-item.component';
import { TopNavUserComponent } from './top-nav-user/top-nav-user.component';

export const components = [
    SideNavItemComponent,
    BreadcrumbsComponent,
    DashboardHeadComponent,
    TopNavUserComponent,
    SideNavItemSubComponent
];

export * from './side-nav-item/side-nav-item.component';
export * from './side-nav-item-sub/side-nav-item-sub.component';
export * from './breadcrumbs/breadcrumbs.component';
export * from './dashboard-head/dashboard-head.component';
export * from './top-nav-user/top-nav-user.component';
