import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TreatementListComponent} from './treatement-list/treatement-list.component';
import {TreatementCreateComponent} from './treatement-create/treatement-create.component';


const routes: Routes = [
  {
    path: 'list', component: TreatementListComponent
  },
  {
    path: 'create', component: TreatementCreateComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TreatementRoutingModule { }
