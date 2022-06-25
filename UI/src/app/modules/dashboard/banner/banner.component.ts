import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationService } from '@app/modules/navigation/services';
import{ModalDismissReasons,NgbModal} from '@ng-bootstrap/ng-bootstrap'
import _ from 'lodash';
import moment from 'moment';
import { ConfirmationService, MessageService } from 'primeng/api';
import { banner } from './banner';
import { BannerService } from './banner.service';

@Component({
  selector: 'sb-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {
  
  getinfo:any;
  submitted=false;
  bannerForm:FormGroup;
  banner1 =new banner;
  rowsPerPageOptions = [5, 10, 15, 25]
 // isUpdateBanner: boolean = false;
  userInfo:any;
  defaultValueForm:any;
  constructor(private bannerinfo:BannerService,private form:FormBuilder,
     private navigate: NavigationService,private messageService: MessageService,
     private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
     this.bannerForm=this.form.group ({

      candidateId: [0,[Validators.required]],
      candidateName: ['',[Validators.required]],
      designation: ['',[Validators.required]],
      status: ['',[Validators.required]],
      scheduleDate: (moment().format("YYYY-MM-DD"), [Validators.required]),
      refralName: ['',[Validators.required]],
      interviewerName: ['',[Validators.required]],
      feedbackByInterviewer: ['',[Validators.required]],
     });
    this.getDetails();
    this.userInfo = this.navigate.getUserInfo();
    this.defaultValueForm = this.bannerForm.value; 
  }

   get f(){
     return this.bannerForm.controls;
   }

   get fv(){
     return this.bannerForm.value;
   }
  getDetails(){
    this.bannerinfo.getData().subscribe(res=>{
      this.getinfo=res;
    },
    err=>{
    this.getinfo=err;
    }
    )
  }
  onSubmit(){
    const postData = {
        ...this.fv
    };
    // const existsList = _.find(this.getinfo, ['candidateName', postData.candidateName]);
    // if (existsList) {
    //     this.messageService.add({ severity: 'error', summary: 'Error', detail: 'This Holiday Type is already Exist..' });
    //     return;
    // }
      
    this.bannerinfo.postData(postData).subscribe(res => {
        if (res.candidateId > 0) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Interview Schedule successfully..' });
            let ref=document.getElementById('cancel');
             ref?.click();
            this.getDetails();
        }
        else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Interview Schedule failed..' });
        }
    });
}
updatedData(data: any) {
  this.bannerForm.patchValue(data);
  //this.isUpdateBanner = true;
  this.bannerForm.get('scheduleDate')?.setValue(moment(data.date).format('YYYY-MM-DD'));
}



onDeleted(event: Event, item: any) {
  this.confirmationService.confirm({
    target: event.target || undefined,
    message: 'Are you sure that you want to proceed?',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
          if (item) {
              this.bannerinfo.DeleteBannerDetails(item).subscribe(
                  res => {
                      if (res=== true) {
                          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Interview Schedule deleted successfully..' });
                          let ref=document.getElementById('cancel');
                          ref?.click();
                          this.getDetails();
                      } else {
                          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something wrong...' });
                      }
                  }
              )
          }
      },
  })

}

UpdateHoliday() {
  // this.submitted = true;
  // if (this.bannerForm.invalid) {
  //     return;
  // }
  const UpdateHoliday = {
      ...this.fv,
      candidateId: this.bannerForm.get('candidateId')?.value
  };
  if (UpdateHoliday.candidateId > 0) {
      this.bannerinfo.UpdateData(UpdateHoliday).subscribe(res => {
          if (res) {
              this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Interview Schedule successfully Updated ..' });
              let ref=document.getElementById('cancel');
              ref?.click();
              this.getDetails();
          }
          else {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Update Data failed..' });
          }
      });
  }
}
}
