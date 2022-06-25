import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoaderComponent } from '@app/modules/shared/componets/loader/loader.component';
import { USERINFO } from '@app/modules/shared/model/user.model';
import { SetupService } from '@app/modules/shared/services/setup.service';

@Component({
    selector: 'sb-login',
    templateUrl: './login.component.html',
    styleUrls: ['login.component.scss'],
})
export class LoginComponent implements OnInit {
    emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
    loginForm = this._fb.group({
        userName: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
        password: ['', Validators.required],
    });
    submitted = false;
    isErrorMessage = false;
    showLoader: boolean = false;
    constructor(private route: Router, private setup: SetupService, private _fb: FormBuilder) { }
    ngOnInit() { }
    get f() {
        return this.loginForm.controls;
    }
    get fv() {
        return this.loginForm.value;
    }
    onLogin() {
        this.showLoader = true
        this.isErrorMessage = false;
        this.submitted = true;

        if (this.loginForm.invalid) {
            this.showLoader = false
            return;
        }


        this.setup.postData('User/LoginAuth', this.fv).subscribe(
            (res: USERINFO) => {
                if (res && res?.user && res.user?.userId > 0) {
                    sessionStorage.setItem('userInfo', JSON.stringify(res?.user));
                    sessionStorage.setItem('token', res?.tokenString);
                    // if (res?.user?.roleId === 3) {
                    //     this.route.navigate(['/dashboard/employee-dashboard']);
                    // } else {
                    this.route.navigate(['/dashboard']);
                    this.showLoader = false
                    // }
                } else {
                    this.isErrorMessage = true;
                    this.showLoader = false
                }
            }
        )

    }
}
