import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SetupService } from '@app/modules/shared/services/setup.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ModulesService } from './modules.service';

@Component({
  selector: 'sb-modules',
  templateUrl: './modules.component.html',
  styleUrls: ['./modules.component.scss']
})
export class ModulesComponent implements OnInit {

  isUpdateModules=false;
  isAddModule = false;
  getModuleData:any;
  defaultValueForm:any;
  submitted = false;
  isDeleteHide = false;


  ModuleForm:FormGroup;
  constructor(private moduleSevice:ModulesService, private messageService:MessageService,
     private confirmationService:ConfirmationService) {
    this.ModuleForm= new FormGroup({
      moduleId:new FormControl(),
      parentModuleId:new FormControl(),
      moduleName:new FormControl(),
      moduleDesc:new FormControl(),
      isActive:new FormControl()

    })

    this.defaultValueForm = this.ModuleForm.value;
   }

  ngOnInit(): void {
    this.GetBaseModule();

  }

  get f() {
    return this.ModuleForm.controls;
}
get fv() {
    return this.ModuleForm.value;
}

public GetBaseModule() {
    this.moduleSevice.GetBaseModule().subscribe(
        res => {
            this.getModuleData = res;
        }
    );
}




AddProjectModule(users: any) {
  this.isAddModule = true;
  this.isUpdateModules = false;
  this.disabledEnableControl(true);
  this.resetForm();
}


resetForm() {
  this.ModuleForm.patchValue(this.defaultValueForm);
}


onSubmit() {
  this.submitted = true;
  if (this.ModuleForm.invalid) {
      return;
  }
  const postData = {
      ...this.fv,
      
      moduleId: this.ModuleForm.get('moduleId')?.value
  };
  this.moduleSevice.AddModuleData(postData).subscribe(res => {
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
  this.isAddModule = false;
  if (hardReload) {
      this.GetBaseModule();
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
              this.moduleSevice.DeleteModuleData(item).subscribe(res => {
                  if (res === true) {
                      this.messageService.add({
                          severity: 'success',
                          summary: 'Success',
                          detail: ' Project task successfully deleted..',
                      });
                      this.GetBaseModule();
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
         
      },
  });
}

UpdateTask() {
  // this.submitted = true;
  if (this.ModuleForm.invalid) {
      return;
  }
  const UpdateTask = {
      ...this.fv,
      projectId: this.ModuleForm.get('moduleId')?.value
  };
  if (UpdateTask.projectsTaskId > 0) {
      this.moduleSevice.UpdateModuleData(UpdateTask).subscribe(res => {
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
  this.ModuleForm.patchValue(data);
  this.isAddModule = true;
  this.isUpdateModules = false;
  this.disabledEnableControl(false);
}

disabledEnableControl(isenable: boolean) {
  if (isenable) {
      this.ModuleForm.get('projectId')?.enable();

  } else {
      this.ModuleForm.get('projectId')?.disable();

  }

}


}
