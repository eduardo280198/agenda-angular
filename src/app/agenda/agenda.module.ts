import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FormPageComponent } from './pages/form-page/form-page.component';
import { TablePageComponent } from './pages/table-page/table-page.component';
import { AppRoutingModule } from '../app-routing.module';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';


@NgModule({
  declarations: [
    FormPageComponent,
    TablePageComponent,
    ConfirmDialogComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  exports: [
    FormPageComponent,
    TablePageComponent
  ]
})
export class AgendaModule { }
