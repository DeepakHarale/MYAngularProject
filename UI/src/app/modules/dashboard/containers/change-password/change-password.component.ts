import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationService } from '@app/modules/navigation/services';
import { SetupService } from '@app/modules/shared/services/setup.service';
import { MessageService } from 'primeng/api';
import { MustMatch } from './must-match';
@Component({
  selector: 'sb-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  submitted = false;
  changePasswordForm = this.formBuilder.group({
    oldPassword: ['', [Validators.required]],
    newPassword: ['', Validators.required,Validators.minLength(6)],
    confirmPassword: ['', Validators.required]
  }, {
    validator: MustMatch('newPassword', 'confirmPassword')
  });
  userInfo: any;

  get f() {
    return this.changePasswordForm.controls;
  }
  constructor(private formBuilder: FormBuilder, private setup: SetupService, private dataService: NavigationService,
    private messageService: MessageService) {
    this.userInfo = this.dataService.getUserInfo();
  }

  ngOnInit() {
  }



  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.changePasswordForm.invalid) {
      return;
    } 
    if(this.changePasswordForm.value.newPassword.toLowerCase()!=this.changePasswordForm.value.confirmPassword.toLowerCase()){

              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'New Password and Confirm Passsword Should Match!...' });
              return ;
    }
    const postData = {
      "userName": this.userInfo.userName,
      "oldPassword": this.changePasswordForm.value.oldPassword,
      "newPassword": this.changePasswordForm.value.newPassword
    }
    this.setup.postData('User/ChangePassword', postData).subscribe(
      res => {
        if (res && res.message) {
          if (res.message === "Password change successfully") {
            this.submitted = false;
            this.messageService.add({ severity: 'success', summary: 'Service Message', detail: res.message });
            this.changePasswordForm.reset();
            // alert("faild")
          } 
          else {
            
            this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
          }

        }
      }
    )
  }

  onReset() {
    this.submitted = false;
    this.changePasswordForm.reset();
  }
}
