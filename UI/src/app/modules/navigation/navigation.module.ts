/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

/* Modules */
import { AppCommonModule } from '@common/app-common.module';

/* Components */
import * as navigationComponents from './components';

/* Containers */
import * as navigationContainers from './containers';

/* Layouts */
import * as appCommonLayouts from './layouts';

/* Guards */
import * as navigationGuards from './guards';

/* Services */
import * as navigationServices from './services';
import { LoaderComponent } from '../shared/componets/loader/loader.component';

@NgModule({
    imports: [CommonModule, RouterModule, AppCommonModule],
    providers: [...navigationServices.services, ...navigationGuards.guards],
    declarations: [
        ...navigationContainers.containers,
        ...navigationComponents.components,
        ...appCommonLayouts.layouts,
        LoaderComponent
    ],
    exports: [
        ...navigationContainers.containers,
        ...navigationComponents.components,
        ...appCommonLayouts.layouts,
        LoaderComponent
    ],
})
export class NavigationModule {}
