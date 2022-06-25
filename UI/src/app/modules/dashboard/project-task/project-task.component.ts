import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavigationService } from '@app/modules/navigation/services';
import { Epermission, PERMISSION } from '@app/modules/shared/model/leave.model';
import { UserDTO } from '@app/modules/shared/model/user.model';
import { SharedPermissionService } from '@app/modules/shared/services/shared-permission.service';
import moment from 'moment';
import { ConfirmationService, MessageService } from 'primeng/api';

import { ProjectService } from '../project/project.service';

import { ProjectTaskService } from './project-task.service';

@Component({
    selector: 'sb-project-task',
    templateUrl: './project-task.component.html',
    styleUrls: ['./project-task.component.scss'],
})
export class ProjectTaskComponent implements OnInit {
    GetProjectData: any;
    getTask: any;
    submitted = false;
    addProjectTask: any;
    isAddProjectTask = false;
    isUpdateProjectTask = false;
    isDeleteHide = false;
    userInfo: any;
    rowsPerPageOptions = [5, 10, 15, 25]
    public enumPer = PERMISSION;
    public enumModule = Epermission;


    defaultValueForm: any;

  

    ProjectTaskForm: FormGroup;
    allProjects: any;
    projectTask: any;

    constructor(
        private fb: FormBuilder,
        private getTaskService: ProjectTaskService,
        private navigate: NavigationService,
        private confirmationService: ConfirmationService,
        private messageService: MessageService,
        private projectService: ProjectService,
        private router: Router,
        public sharedPermission: SharedPermissionService

    ) {
        this.ProjectTaskForm = new FormGroup({
            projectsTaskId: new FormControl(0, Validators.required),
            projectName: new FormControl( Validators.required),
            projectsTaskType: new FormControl('', [Validators.required]),
            projectId: new FormControl(null, [Validators.required]),
            projectDescription: new FormControl('', [Validators.required]),
            prorities: new FormControl('', [Validators.required]),
            workingHours: new FormControl('', [Validators.required]),
        });

        this.userInfo = this.navigate.getUserInfo();
        this.defaultValueForm = this.ProjectTaskForm.value;
    }



    ngOnInit(): void {
        this.GetProjectDetails();
        this.UpdateTask();
        this.getAllProjectTaskInfo();

    }

    get f() {
        return this.ProjectTaskForm.controls;
    }
    get fv() {
        return this.ProjectTaskForm.value;
    }

    public GetProjectDetails() {
        this.projectService.GetProjectDetails().subscribe(
            res => {
                this.GetProjectData = res;
            },
            err => {
                // this.GetProjectData = err;
            }
        );
    }

    numberOnly(event: { which: any; keyCode: any }): boolean {
        const charCode = event.which ? event.which : event.keyCode;

        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        }
        return true;
    }

    getAllProjectTaskInfo() {
        this.getTaskService.getProjectTaskInfo().subscribe(
            res => {
                this.projectTask = res[0];
                  this.GetProjectData=  res[1];
                this.projectTask.map((item: any) => {
                    const selectedProject =(  this.GetProjectData ||[]).find((project: any) => project.projectId === item.projectId);
                    item.projectName = selectedProject.projectName;
                })
                this.getTask = this.projectTask;
            },
            err => {
                
            });
    }
    public GetProjectTask() {
        this.getTaskService.GetProjectTask().subscribe(
            res => {
                this.getTask = res;
            },
            err => {
                // this.getTask = err;
            }
        );
    }
    AddProjectTask(users: any) {
        this.isAddProjectTask = true;
        this.isUpdateProjectTask = false;
        this.disabledEnableControl(true);
        this.resetForm();
    }


    resetForm() {
        this.ProjectTaskForm.patchValue(this.defaultValueForm);
    }


    onSubmit() {
        this.submitted = true;
        if (this.ProjectTaskForm.invalid) {
            return;
        }
        const postData = {
            ...this.fv,
            projectsTaskId: 0,
            projectId: this.ProjectTaskForm.get('projectId')?.value
        };
        this.getTaskService.postData(postData).subscribe(res => {
            if (res.projectsTaskId > 0) {
                this.onBackToList(true);
                this.messageService.add({ severity: 'success', summary: 'Success', detail: ' Project task  successfully saved..' });

            }
            else {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Save  data failed..' });
            }
        });
    }


    onBackToList(hardReload: boolean = false) {
        this.submitted = false;
        this.isAddProjectTask = false;
        if (hardReload) {
            
            this.getAllProjectTaskInfo();
        }
    }



    onDeleted(event: Event, item: any) {
        this.confirmationService.confirm({
            target: event.target || undefined,
            message: 'Are you sure that you want to proceed?',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                // confirm action
                if (item) {
                    this.getTaskService.DeleteProjectTask(item).subscribe(res => {
                        if (res === true) {
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Success',
                                detail: ' Project task successfully deleted..',
                            });
                            this.getAllProjectTaskInfo();
                        } else {
                            this.messageService.add({
                                severity: 'error',
                                summary: 'Error',
                                detail: 'Something wrong...',
                            });
                        }
                    });
                }
            },
            reject: () => {
                // reject action
            },
        });
    }

    UpdateTask() {
   
        if (this.ProjectTaskForm.invalid) {
            return;
        }
        const UpdateTask = {
            ...this.fv,
            projectId: this.ProjectTaskForm.get('projectId')?.value
        };
        if (UpdateTask.projectsTaskId > 0) {
            this.getTaskService.UpdateData(UpdateTask).subscribe(res => {
                if (res) {
                    this.onBackToList(true);
                    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Project task successfully updated ..' });
                }
                else {
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Update data failed..' });
                }
            });
        }
    }

    onUpdate(data: any) {
        this.ProjectTaskForm.patchValue(data);
        this.isAddProjectTask = true;
        this.isUpdateProjectTask = true;
        this.disabledEnableControl(false);
    }

    disabledEnableControl(isenable: boolean) {
        if (isenable) {
            this.ProjectTaskForm.get('projectId')?.enable();

        } else {
            this.ProjectTaskForm.get('projectId')?.disable();

        }

    }


}
