import { HttpClient } from '@angular/common/http';
import { importType } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HolidayDetailsComponent } from '@app/modules/dashboard/holiday-details/holiday-details.component';
import { ItemsList } from '@ng-select/ng-select/lib/items-list';
import { ForgetPasswordService } from './forget-password.service';

@Component({
    selector: 'sb-forgot-password',

    templateUrl: './forgot-password.component.html',
    styleUrls: ['forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {

     getforget:any;
     forbiddenEmails: any;
     errorMessage: string;
     successMessage: string;
     IsvalidForm = true;
    constructor(private forgetpass:ForgetPasswordService,private fb: FormBuilder,private router:Router) { }
    forgetForm: FormGroup;
    ngOnInit() {

        this.forgetForm = this.fb.group({
           
            UserName: new FormControl('', [Validators.required,
            Validators.email],this.forbiddenEmails)
        });
    
    }
    get email() {
        return this.forgetForm.controls;
    }
    // get fv(){
    //     return this.forgetForm.value;
    // }
    
    onSubmit(){
        if (this.forgetForm.valid) {
          this.IsvalidForm = true;
          this.forgetpass.postData(this.forgetForm.value.UserName).subscribe(
            data => {
              //this.forgetForm.reset();
              this.getforget=data;
              this.successMessage = "Reset password link send to email sucessfully.";
              setTimeout(() => {
                this.successMessage = null;
                this.router.navigate(['auth/login']);
              }, 3000);
            },
            err => {
    
              if (err.error.message) {
                this.errorMessage = err.error.message;
              }
            }
          ); 
        } else {
          this.IsvalidForm = false;
        }
      }
    
    }