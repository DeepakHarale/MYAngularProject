import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationService } from '@app/modules/navigation/services';
import { ConfirmationService, MessageService } from 'primeng/api';
import { HighlightService } from './highlight.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { SetupService } from '@app/modules/shared/services/setup.service';
import { environment } from 'environments/environment';

@Component({
  selector: 'sb-highlights',
  templateUrl: './highlights.component.html',
  styleUrls: ['./highlights.component.scss'],
  providers: [HighlightService]
})
export class HighlightsComponent implements OnInit {
  highlightsTypeList: any[] = [];
  HighlightsForm: FormGroup;
  userInfo: any;
  defaultValueForm: any;
  getHighlights: any;
  submitted = false;
  isAddHighlights = false;
  isUpdateHighlights: boolean = false;
  isDeleteHide = false;
  rowsPerPageOptions = [5, 10, 15, 25];
  fileType: any = null;
  percentDone: number = 0;
  errors: any;
  isLoader: boolean = false;
  uploadSuccess: boolean = false;


  constructor(private fb: FormBuilder, private getHighlightsService: HighlightService, private navigate: NavigationService,
    private confirmationService: ConfirmationService, private messageService: MessageService, private setUp: SetupService) {
    this.HighlightsForm = new FormGroup({
      highlightsId: new FormControl(0),
      highlightsPath: new FormControl('', [Validators.required]),
      highlightsTitle: new FormControl('', [Validators.required]),
      highlightsDescription: new FormControl('', [Validators.required]),
      file: new FormControl('')


    });
    this.userInfo = this.navigate.getUserInfo();
    this.defaultValueForm = this.HighlightsForm.value;
  }


  ngOnInit(): void {
    this.GetHighlightData();

  }

  get f() {
    return this.HighlightsForm.controls;
  }

  get fv() {
    return this.HighlightsForm.value;
  }

  resetForm() {
    this.HighlightsForm.patchValue(this.defaultValueForm);
  }



  public GetHighlightData() {
    this.getHighlightsService.GetHighlightsDetails().subscribe(
      res => {
        this.getHighlights = res;
      },
      err => {
        // this.getHighlights = err;
      }
    );
  }

  onBackToList(hardReload: boolean = false) {
    this.submitted = false;
    this.isAddHighlights = false;
    if (hardReload) {
      this.GetHighlightData();
    }
  }




  AddHighlightDetails(users: any) {
    this.isAddHighlights = true;
    this.isUpdateHighlights = false;
    this.fileValidation(true);
    this.resetForm();
    this.disabledEnableControl(true);

  }



  onDeleted(event: Event, item: any) {
    console.log("id => ", item);
    this.confirmationService.confirm({
      target: event.target || undefined,
      message: 'Are you sure that you want to proceed?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        //confirm action
        if (item) {
          this.setUp.postData('Highlights/DeleteHighlights', item).subscribe(
            res => {
              if (res === true) {
                this.messageService.add({ severity: 'success', summary: 'Success', detail: ' Highlight deleted successfully..' });
                this.GetHighlightData();
              } else {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something wrong...' });
              }
            },
            err => {
              this.errors = err;
            }
          )
        }
      },
      reject: () => {
        //reject action
      }
    });
  }

  UpdateHighlights() {
    // this.submitted = true;
    if (this.HighlightsForm.invalid) {
      return;
    }
    const UpdateHighlights = {
      ...this.fv,
      highlightsId: this.HighlightsForm.get('highlightsId')?.value
    };
    if (UpdateHighlights.highlightsId > 0) {
      this.getHighlightsService.UpdateData(UpdateHighlights).subscribe(res => {
        if (res) {
          this.onBackToList(true);
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Highlights successfully Updated ..' });
        }
        else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Update Data failed..' });
        }
      });
    }
  }



  disabledEnableControl(isenable: boolean) {
    if (isenable) {
      this.HighlightsForm.get('highlightsId')?.enable();

    }
    else {
      this.HighlightsForm.get('highlightsId')?.disable();

    }
  }



  onSubmit(event: any) {
    //console.log(event);
    console.log(this.HighlightsForm);
    this.submitted = true;
    this.isLoader = false;
    if (this.HighlightsForm.invalid) {

      return;
    }

    else {
      //   this.messageService.add({ severity: 'success', summary: 'Success', detail: ' Highlights save successfully..' });
      // }

      const post = {
        ...this.HighlightsForm.value,
        highlightsId: 0
        //employeeId: this.userInfo?.employeeId
      };
      const formData = new FormData();
      const fileVToUpload = post.file as File;
      formData.append('file', fileVToUpload, fileVToUpload.name);
      formData.append('highlights.highlightsId', '0');
      formData.append('highlights.highlightsPath', '');
      formData.append('highlights.highlightsTitle', post.highlightsTitle);
      formData.append('highlights.highlightsDescription', post.highlightsDescription);
      // formData.append('highlights.highlightsDescriptions',post.highlightsDescriptions);
      this.isLoader = true;
      this.setUp.postData('Highlights/AddHighlight', formData)
        .subscribe(response => {
          if (response.type === HttpEventType.UploadProgress) {
            this.percentDone = Math.round((100 * response.loaded) / response.total);
            console.log(this.percentDone, " this.percentDone");
            // tslint:disable-next-line: deprecation
          } else if (event instanceof HttpResponse) {
            this.uploadSuccess = true;
          }
          this.loadData(response['body']);
        });
      console.log(post);

      this.messageService.add({ severity: 'success', summary: 'Success', detail: ' Highlights save successfully..' });
    }
  }

  onSelectFile(event: any) {
    if (event.target.files && event.target.files?.length > 0) {
      this.HighlightsForm.get('file')?.setValue(event.target.files[0])
    } else {
      this.HighlightsForm.get('file')?.setValue(null)
    }
  }

  loadData(body: any) {
    if (!body) {
      return;
    } else {
      this.onBackToList(true);
    }
  }

  fileValidation(file: boolean) {
    if (file) {
      this.HighlightsForm.get('file')?.setValidators([Validators.required])

    }
    else {
      this.HighlightsForm.get('file')?.setValidators(null)
    }
    this.HighlightsForm.get('file')?.updateValueAndValidity()
  }

  updatedData(data: any) {
    setTimeout(() => {
      console.log("timeout")

    }, 100)
    this.HighlightsForm.patchValue(data);
    this.isAddHighlights = true;
    this.isUpdateHighlights = true;
    this.disabledEnableControl(false);
    // this.HolidayForm.get('date')?.setValue(moment(data.date).format('YYYY-MM-DD'));
  }

  apiUrl = environment.mainUrl;
  



  geturl(item:any) {
    return this.apiUrl + item.highlightsPath;
  }

}
