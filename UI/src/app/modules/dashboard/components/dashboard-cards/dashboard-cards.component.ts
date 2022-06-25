import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { DeleteMsg } from '@app/modules/app-common/constants/delete-msg';
import { ErrorMsg } from '@app/modules/app-common/constants/error-msg';
import { NavigationService } from '@app/modules/navigation/services';
import { Highlightsmodel } from '@app/modules/shared/model/user.model';
import { SetupService } from '@app/modules/shared/services/setup.service';

import { SharedPermissionService } from '@app/modules/shared/services/shared-permission.service';
import { environment } from 'environments/environment';
import { ConfirmationService, MessageService } from 'primeng/api';
import { HighlightService } from '../../highlights/highlight.service';
import { TodoService } from './todo.service';
import _ from 'lodash';

@Component({
    selector: 'sb-dashboard-cards',

    templateUrl: './dashboard-cards.component.html',
    styleUrls: ['dashboard-cards.component.scss'],
    providers: [TodoService]
})
export class DashboardCardsComponent implements OnInit {
    // showNavigationArrows = false;
    // showNavigationIndicators = false;
    GethighlightModel: Highlightsmodel[];
    getToDoList: any;
    isAddToDo = false;
    submitted = false;
    defaultValueForm: any;
    isUpdateTodo: boolean = false;
    rowsPerPageOptions = [5, 10, 15, 25]
    userInfo: any = {}
    TodoForm: FormGroup;
    constructor(private fb: FormBuilder, config:TodoService, private setupService: SetupService, private todoService: TodoService, private navigate: NavigationService,
       private dom:DomSanitizer ,private confirmationService: ConfirmationService, private messageService: MessageService, 
       private getHighlightsService:HighlightService, sharedPermission: SharedPermissionService) {
        // config.showNavigationArrows = true;
        // config.showNavigationIndicators = true;
        this.TodoForm = new FormGroup({
            toDoId: new FormControl(0),
            empId: new FormControl(),
            description: new FormControl('', [Validators.required, Validators.max(35)]),
            isActive: new FormControl(true),
        });
        this.userInfo = this.navigate.getUserInfo();
        this.defaultValueForm = this.TodoForm.value;
    }


    apiUrl = environment.mainUrl;
  



  geturl(item:any,item2:any) {
    return this.apiUrl + item.highlightsPath;
  }

  getSefUrl(url: string) {
    return this.dom.bypassSecurityTrustResourceUrl(url)
  }
  
    get f() {
        return this.TodoForm.controls;
    }
    get fv() {
        return this.TodoForm.value;
    }
    ngOnInit(): void {
        this.GetToDoDetails();
        this.resetForm();

        this.getHighlightsService.GetHighlightsDetails().subscribe(res => {
			this.GethighlightModel = res;
		});
    }
    
    public GetToDoDetails() {
        this.todoService.getByEmpID(this.userInfo.employeeId).subscribe(
            res => {
                this.getToDoList = _.orderBy(res, ['toDoId'], ['desc']);;
            },
            err => {
                this.getToDoList = err;
            }
        );
    }

    onSubmit() {

        this.submitted = true;
        if (this.TodoForm.invalid) {

            return;
        }

        const postData = {
            "empId": this.userInfo.employeeId,
            "toDoId": this.TodoForm.controls['toDoId'].value,
            "description": this.TodoForm.controls['description'].value,
            "isActive": this.TodoForm.controls['isActive'].value,

        };

        console.log(postData);
        this.todoService.postData(postData).subscribe(res => {
            if (res.toDoId > 0) {
                this.GetToDoDetails();
                this.resetForm();
                this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Note added successfully..' });
            }
            else {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Somthing went wrong..' });
            }
        });

    }


    public show:boolean = false; 
    public mybutton:any = 'Show'; 
    toggle() { 
      this.show = !this.show; 
   
      // CHANGE THE NAME OF THE BUTTON. 
      if(this.show){   
        this.mybutton= "Hide"; 
      } else { 
        this.mybutton= "Show"; 
       } 
     }
     
    updateValueReset = false;
    resetForm() {
        this.TodoForm.patchValue(this.defaultValueForm);
        this.submitted = false;
        this.isUpdateTodo=false;
    }
    AddTodoDetails() {
        this.isAddToDo = true;
        this.isUpdateTodo = false;
        this.resetForm();
        this.disabledEnableControl(true);

    }

    onBackToList(hardReload: boolean = false) {
        this.submitted = false;
        this.isAddToDo = false;
        if (hardReload) {
            this.GetToDoDetails();
        }
    }

    isDeleteHide = false;





    onDeleted(event: Event, item: any) {
        this.confirmationService.confirm({
            target: event.target || undefined,
            message: 'Are you sure that you want to proceed?',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                //confirm action
                if (item) {
                    this.setupService.postData('ToDoList/DeleteToDoList?ToDoId=' + item.toDoId, '').subscribe(
                        res => {
                            if (res === true) {
                                this.messageService.add({ severity: 'success', summary: 'Success', detail: ' Note deleted succefully' });
                                this.GetToDoDetails();

                            } else {
                                this.messageService.add({ severity: 'error', summary: 'Error', detail: ErrorMsg.somethingWentWrong });
                            }
                        }
                    )
                }
            },
            reject: () => {

            }
        });
    }

    UpdatToDoList() {
        this.submitted = true;

        if (this.TodoForm.invalid) {
            return;
        }
        const UpdateHoliday = {
            ...this.fv,
        };
        if (UpdateHoliday.toDoId > 0) {
            this.todoService.UpdateData(UpdateHoliday).subscribe(res => {
                if (res) {
                    this.onBackToList(true);
                    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Note successfully Updated ..' });
                }
                else {
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Update Data failed..' });
                }
            });
        }
        this.resetForm();

    }


    updatedData(data: any) {
        this.TodoForm.patchValue(data);
        this.isAddToDo = true;
        this.isUpdateTodo = true;
        this.disabledEnableControl(true);
        
    }

    disabledEnableControl(isenable: boolean) {
        if (isenable) {
            this.TodoForm.get('toDoId')?.enable();

        } else {
            this.TodoForm.get('toDoId')?.disable();

        }
    }



}
