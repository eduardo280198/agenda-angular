import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FormPageComponent } from './pages/form-page/form-page.component';
import { TablePageComponent } from './pages/table-page/table-page.component';


@NgModule({
  declarations: [
    FormPageComponent,
    TablePageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: [
    FormPageComponent,
    TablePageComponent
  ]
})
export class AgendaModule { }
