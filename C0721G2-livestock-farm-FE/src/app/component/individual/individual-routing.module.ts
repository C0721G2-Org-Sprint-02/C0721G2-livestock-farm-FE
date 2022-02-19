import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {IndividualListComponent} from './individual-list/individual-list.component';
import {IndividualDeleteComponent} from './individual-delete/individual-delete.component';


const routes: Routes = [
  {
    path: 'list', component: IndividualListComponent
  }, {
    path: 'list/:message', component: IndividualListComponent
  },
  {
    path: 'delete', component: IndividualDeleteComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndividualRoutingModule { }
