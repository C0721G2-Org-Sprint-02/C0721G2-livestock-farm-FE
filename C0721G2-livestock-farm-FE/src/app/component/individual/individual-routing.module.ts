import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {IndividualListComponent} from './individual-list/individual-list.component';


const routes: Routes = [
  {
    path: 'list', component: IndividualListComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndividualRoutingModule { }
