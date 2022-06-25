import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { NavigationService } from '@app/modules/navigation/services';
import { Epermission, PERMISSION } from '@app/modules/shared/model/leave.model';
import { SetupService } from '@app/modules/shared/services/setup.service';
import { SharedPermissionService } from '@app/modules/shared/services/shared-permission.service';
import { ConfirmationService, MessageService } from 'primeng/api';


import { ProjectService } from './project.service';

@Component({
    selector: 'sb-project',
    templateUrl: './project.component.html',
    styleUrls: ['./project.component.scss'],
})
export class ProjectComponent implements OnInit {

    @ViewChild('closebutton') closebutton: any;
    employeeList: any;
    @ViewChild('employeeProject') public employeeProjectForm: NgForm | undefined;
    rowsPerPageOptions = [5, 10, 15, 25];
    EmployeeProject!: FormGroup
    selectedEmployeeProjects: any = {};
    filtered: any = {}
    ProjectForm: FormGroup;
    projectId: number | undefined;
    getProjectData: any;
    employees: any;
    employeeData: any
    filterValueLower:any;
    projectName!:string;
    errors: any
    projectsEmployee: any;
    submitted = false;
    userInfo: any;
    isAddProject = false;

    isDeleteHide = false;
   
    
    public enumPer=PERMISSION;
    public enumModule=Epermission;

    constructor(
        private fb: FormBuilder,
        private getProjectService: ProjectService,
        private confirmationService: ConfirmationService,
        private messageService: MessageService,
        private setup: SetupService,
        private dataService: NavigationService,
       public sharedPermission:SharedPermissionService
    ) {
        this.ProjectForm = new FormGroup({
            projectId: new FormControl(0),
            projectName: new FormControl('', [Validators.required]),
            projectDescription: new FormControl('', [Validators.required]),
        });
        this.userInfo = this.dataService.getUserInfo();
        this.employeeProject();

    }

    ngOnInit(): void {
        this.GetProjectDetails();        

    }

    get projectDescription() {
        return this.ProjectForm.get('projectDescription');
    }
    get getControl() {
        return this.ProjectForm.controls;
    }
    get fv() {
        return this.ProjectForm.value;
    }


    employeeProject() {
        this.EmployeeProject = this.fb.group({
            select: [''],
            employeeNo: [''],
            employeeName: ['']
        });
    }



    loadAlldataList(id: number, projName:string) {
        this.projectId = id;
        this.projectName=projName;
        this.setup.getData('Employee/GetEmployee').subscribe(res => {
            this.employeeList = res;
            console.log(this.employeeList);
            this.employees = this.employeeList;
        })
        this.getProjectsEmployee(id)
    }

    getProjectsEmployee(id: number) {
        this.selectedEmployeeProjects = {};
        this.getProjectService.getEmployeeProject(id).subscribe(
            res => {
                this.projectsEmployee = res
                console.log(res);
                this.projectsEmployee.forEach((element: any) => {
                    this.selectedEmployeeProjects = {
                        ...this.selectedEmployeeProjects,
                        [element.employeeId]: true,
                    }
                });

                console.log(this.selectedEmployeeProjects);


            },
            err => { this.errors = err }
        )
    }

    applyFilter(filterValue: any) {

        this.filterValueLower = filterValue.toLowerCase();
        if (filterValue == ' ') {
            this.employees = this.employeeList
        } else {
            this.employees = this.employeeList.filter((employee: any) =>
                employee.employeeNo.includes(this.filterValueLower) ||
                employee.employeeName.toLowerCase().includes(this.filterValueLower));
        }
    }



    clearForm() {
        this.EmployeeProject.reset();
        this.filterValueLower='';
        this.closebutton.nativeElement.click();
    }
    public GetProjectDetails() {
        this.ProjectForm.reset();
        this.getProjectService.GetProjectDetails().subscribe(
            res => {
                this.getProjectData = res;
            },
            err => {
                this.getProjectData = err;
            }
        );
    }
    onSubmit() {
        this.submitted = true;
        

        if (this.ProjectForm.invalid) {
            return;
        }
        const postData = {
            ...this.fv,
            projectId: 0,
        };
        this.getProjectService.postData(postData).subscribe(res => {
            if (res.projectId>0) {
                this.onBackToList(true);
                this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Project saved successfully..' });       

            }else{
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Saved data failed..' });
              }
        });

        
    }

    AddProjectDetails(users: any) {
        this.isAddProject = true;
        this.ProjectForm.reset();
        
    }

    onBackToList(hardReload: boolean = false) {
        this.submitted = false;
        this.isAddProject = false;
        if (hardReload) {
            this.GetProjectDetails();
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
                    this.getProjectService.DeleteProject(item).subscribe(res => {
                        if (res === true) {
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Success',
                                detail: 'Deleted project successfully..',
                            });
                            this.GetProjectDetails();
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

    onChange(checked: boolean, id: number) {
        if (!checked) {
            delete this.selectedEmployeeProjects[id];
        } else {
            this.selectedEmployeeProjects = {
                ...this.selectedEmployeeProjects,
                [id]: checked,
            }
        }

        

    }

    onEmployeesubmit() {

        const postData: { assignProjectId: number; projectId: number | undefined; employeeId: number; addedOn: Date; addedBy: any; }[] = [];

        Object.keys(this.selectedEmployeeProjects).forEach((element: any) => {
            postData.push(
                {
                    'assignProjectId': 0,
                    'projectId': this.projectId,
                    'employeeId': element,
                    'addedOn': new Date,
                    'addedBy': this.userInfo.userId
                }
            )
        });

        this.getProjectService.postEmployeeData(postData).subscribe(
            res => {
                this.employeeData = res
                if(res){
                    this.messageService.add({ 
                        severity: 'success', 
                        summary: 'Success', 
                        detail: 'Resource assigned to projects successfully..' });
                        this.closebutton.nativeElement.click();
                        this.filterValueLower='';

                }

               
            },
            err => { 
                
                this.errors = err
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Something wrong...',
                });
             }
        )
    }



}
