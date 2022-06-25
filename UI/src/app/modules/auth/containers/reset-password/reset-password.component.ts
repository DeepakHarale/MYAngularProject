import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ResetPasswordService } from './reset-password.service';

@Component({
  selector: 'sb-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  ResponseResetForm: FormGroup;
  errorMessage: string;
  successMessage: string;
  resetCode: null;
  getcode: any;
  CurrentState: any;
  data: any;
  userId: any;
  IsResetFormValid: any;
  user: any;
  constructor(
    private authService: ResetPasswordService,
    private router: Router,
    // private confirmationService: ConfirmationService,
    //private messageService: MessageService,
    private route: ActivatedRoute,
    private fb: FormBuilder) {
  }


  ngOnInit() {

    this.userId = this.route.snapshot.queryParams['code'];
    this.VerifyCode();
    console.log("code => ", this.userId);
    this.ResponseResetForm = this.fb.group(
      {
        userId: ['', [Validators.required]],
        newPassword: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(8)]]
      }
    );

  }


  VerifyCode() {
    this.authService.verifyCode(this.userId).subscribe((res) => {
      console.log(res);
      if (res && res.userId > 0) {
        this.ResponseResetForm.get('userId').setValue(res.userId);
        console.log(res.userId);
        this.CurrentState = 'Verified';
      } else {
        this.CurrentState = 'NotVerified';
        //this.router.navigateByUrl('auth/login');
      }
    });
  }

  ResetPassword() {
    if (this.ResponseResetForm.valid) {
      const data = {
        userId: this.ResponseResetForm.value.userId,
        newPassword: this.ResponseResetForm.value.newPassword
      }
      if(data.userId>0){
      this.authService.ResetPassword(data).subscribe(res => {
        if (res) {
           this.successMessage="Password Updated Sucessfully... "
           setTimeout(() => {
            this.successMessage = null;
            this.router.navigate(['auth/login']);
          }, 3000);
        }
       
        else {
          this.errorMessage="User Not Found"
          this.router.navigateByUrl('auth/login');
        }
      }
      );
    }
    }
  }

  Validate(passwordFormGroup: FormGroup) {
    const new_password = passwordFormGroup.controls.newPassword.value;
    const confirm_password = passwordFormGroup.controls.confirmPassword.value;

    if (confirm_password.length <= 0) {
      return null;
    }

    if (confirm_password !== new_password) {
      return {
        doesNotMatch: true
      };
    }

    return null;
  }

}





