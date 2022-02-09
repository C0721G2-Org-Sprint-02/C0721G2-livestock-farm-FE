import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TreatementListComponent} from './treatement-list/treatement-list.component';


const routes: Routes = [
  {
    path: 'list', component: TreatementListComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TreatementRoutingModule { }
