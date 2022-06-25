import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NavigationService } from '@app/modules/navigation/services';
import { SetupService } from '@app/modules/shared/services/setup.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ProjectTaskDetailsService } from './project-task-details.service';

@Component({
  selector: 'sb-project-task-details',
  templateUrl: './project-task-details.component.html',
  styleUrls: ['./project-task-details.component.scss']
})
export class ProjectTaskDetailsComponent implements OnInit {
  selectedEmployee: any
  employeeList: any;
  projectTaskId: any;
  taskList: any = {
    "id": null,
    "projectTasksId": null,
    "employeeId": null,
    "addedBy": null,
    "addedOn": null
  };
  employeeId: any;
  userInfo: any;
  taskEmployee: any;
  submitted = false;
  errors: any;
  TaskDetailsForm!: FormGroup;
  projectId: any;
  allEmployees: any;

  constructor(private setup: SetupService,
    private fb: FormBuilder,
    private activatedroute: ActivatedRoute,
    private projectTaskDetailsService: ProjectTaskDetailsService,
    private dataService: NavigationService,
    private messageService: MessageService,
    private router: Router,
  ) {

    this.initializeData();
    this.userInfo = this.dataService.getUserInfo();
  }

  ngOnInit(): void {
    this.projectTaskId = this.activatedroute.snapshot.paramMap.get("id");
    this.projectId = this.activatedroute.snapshot.paramMap.get("proId");
    if (this.projectTaskId) {
      this.getAllEmployeeList();
      this.getEmployeeProject();
      this.getProjectTask();
    }



  }

  initializeData() {

    this.TaskDetailsForm = this.fb.group({
      projectsTaskId: [''],
      projectName: [''],
      projectsTaskType: ['', Validators.required],
      projectDescription: ['', Validators.required],
      prorities: ['', Validators.required],
      workingHours: ['', [Validators.required]]
    });

  }


  numberOnly(event: { which: any; keyCode: any; }): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;

    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  getEmployeeProject() {
    this.projectTaskDetailsService.getProjectTask('EmployeeProject/GetEmployeeProjectByTaskId/', this.projectTaskId).subscribe(
      res => {
        this.taskEmployee = res;
        this.employeeId = res && res.employeeId ? res.employeeId : null;

      },
      err => { this.errors = err }
    )
  }

  selectEmployee() {

    const postData = {
      "id": this.taskList?.id || 0,
      'projectTasksId': this.projectTaskId,
      'employeeId': this.employeeId,
      'addedBy': this.userInfo.userId,
      'addedOn': new Date
    }
    if (postData.id > 0) {
      this.projectTaskDetailsService.updateData('EmployeeProject/UpdateEmployeeProject', postData).subscribe(res => {
     

      })
    } else {
      this.projectTaskDetailsService.postDataEmployee('EmployeeProject/AddEmployeeProject', postData).subscribe(res => {
      

      })
    }


  }

  getAllEmployeeList() {
    this.projectTaskDetailsService.getEmployeeProject(this.projectId)
      .subscribe(res => {
        this.employeeList = res[0];
        this.allEmployees = res[1];
        this.employeeList.map((employee: any) => {
          const foundEmployee = this.allEmployees.find((emp: any) => emp.employeeId === employee.employeeId);
          employee.employeeName = foundEmployee.employeeName;
        })
      });
  }

  get f() { return this.TaskDetailsForm.controls; }

  getProjectTask() {
    this.projectTaskDetailsService.getProjectTask('Project/GetProjectTaskById/', this.projectTaskId).subscribe(
      res => {
        this.taskList = res
        this.TaskDetailsForm.patchValue(
          {
            projectsTaskId: this.projectTaskId,
            'projectName': res.projects.projectName,
            'projectsTaskType': res.projectTask.projectsTaskType,
            'projectDescription': res.projects.projectDescription,
            'prorities': res.projectTask.prorities,
            'workingHours': res.projectTask.workingHours,

          }
        );
      },
      err => { this.errors = err }
    );

  }


  submitProjectDetails() {
    this.submitted = true;
    if (this.TaskDetailsForm.invalid) {
      return;
    }
    const updateData = {
      'projectsTaskId': this.projectTaskId,
      'projectsTaskType': this.TaskDetailsForm.controls['projectsTaskType'].value,
      'projectId': this.taskList.projectTask.projectId,
      'projectDescription': this.TaskDetailsForm.controls['projectDescription'].value,
      'prorities': this.TaskDetailsForm.controls['prorities'].value,
      'workingHours': this.TaskDetailsForm.controls['workingHours'].value,
    }

    this.projectTaskDetailsService.updateData('Project/UpdateProjectTask', updateData).subscribe(
      res => {
        if (res == true) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Project task saved successfully..' });
          this.router.navigate(['/dashboard/project-task'])
        }
        else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Save data failed..' });
        }

      });

  }

}
