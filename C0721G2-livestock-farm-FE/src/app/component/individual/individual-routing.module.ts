import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {IndividualListComponent} from './individual-list/individual-list.component';
import {IndividualDeleteComponent} from './individual-delete/individual-delete.component';
import {IndividualCreateComponent} from './individual-create/individual-create.component';
import {IndividualEditComponent} from './individual-edit/individual-edit.component';


const routes: Routes = [
  {
    path: 'list', component: IndividualListComponent
  }, {
    path: 'list/:message', component: IndividualListComponent
  },
  {
    path: 'delete', component: IndividualDeleteComponent
  },{
    path: 'create', component: IndividualCreateComponent
  },
  {
    path: 'edit', component: IndividualEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndividualRoutingModule { }
