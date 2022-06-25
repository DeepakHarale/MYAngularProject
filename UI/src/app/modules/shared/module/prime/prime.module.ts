import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { FileUploadModule } from 'primeng/fileupload';
import { TooltipModule } from 'primeng/tooltip';
import { DialogModule } from 'primeng/dialog';
import { CheckboxModule } from 'primeng/checkbox';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { TabViewModule } from 'primeng/tabview';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import {SplitButtonModule} from 'primeng/splitbutton';
import { NumberDirective } from '@shared/directive/only-number.directive';

@NgModule({
  declarations: [NumberDirective],
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    DropdownModule,
    InputTextModule,
    FileUploadModule,
    TooltipModule, DialogModule, CheckboxModule, 
    ToastModule, TabViewModule,ConfirmDialogModule,
   
  ],
  exports: [
    TableModule,
    ButtonModule,
    DropdownModule,
    InputTextModule,
    FileUploadModule,
    TooltipModule, DialogModule, CheckboxModule, 
    ToastModule, TabViewModule, NumberDirective,
    ConfirmDialogModule,SplitButtonModule,
  ],
  providers: [MessageService,ConfirmationService]
})
export class PrimeModule { }
