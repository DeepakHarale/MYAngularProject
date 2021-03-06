/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SBRouteData } from '@modules/navigation/models';

/* Module */
import { AuthModule } from './auth.module';

/* Containers */
import * as authContainers from './containers';
import { ResetPasswordComponent } from './containers/reset-password/reset-password.component';

/* Guards */
import * as authGuards from './guards';

/* Routes */
export const ROUTES: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login',
    },
    {
        path: 'login',
        canActivate: [],
        component: authContainers.LoginComponent,
        data: {
            title: 'Pages Login - HR Admin',
        } as SBRouteData,
    },
    // {
    //     path: 'register',
    //     canActivate: [],
    //     component: authContainers.RegisterComponent,
    //     data: {
    //         title: 'Pages Register - HR Admin',
    //     } as SBRouteData,
    // },
    {
        path: 'forgot-password',
        canActivate: [],
        component: authContainers.ForgotPasswordComponent,
        data: {
            title: 'Pages Forgot Password - HR Admin',
        } as SBRouteData,
    },
   
    {
        path: 'reset-password',
        component:ResetPasswordComponent
    }
    
];

@NgModule({
    imports: [AuthModule, RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
})
export class AuthRoutingModule {}
