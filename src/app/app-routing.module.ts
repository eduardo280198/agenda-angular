import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FormPageComponent } from './agenda/pages/form-page/form-page.component';

const routes: Routes = [
  {
    path: 'agregar',
    component: FormPageComponent
    // loadChildren: () => import('./agenda/agenda.module').then(m => m.AgendaModule),
  },
  {
    path: 'editar/:id',
    component: FormPageComponent
  },
  {
    path: '',
    redirectTo: 'agregar',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'agregar'
  }

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule{}
