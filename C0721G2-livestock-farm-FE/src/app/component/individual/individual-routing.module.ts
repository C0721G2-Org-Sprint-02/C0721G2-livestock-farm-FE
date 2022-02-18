import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {IndividualListComponent} from './individual-list/individual-list.component';
import {AuthGuard} from "../../helpers/auth.guard";
import {IndividualDeleteComponent} from "./individual-delete/individual-delete.component";
import {IndividualCreateComponent} from "./individual-create/individual-create.component";
import {IndividualEditComponent} from "./individual-edit/individual-edit.component";


const routes: Routes = [
  // {
  //   path: 'list', component: IndividualListComponent
  // },

  {
    path: 'list', component: IndividualListComponent, canActivate: [AuthGuard],
    data: {expectedRole: ['ROLE_ADMIN', 'ROLE_EMPLOYEE']}
  },

  {path: 'delete', component: IndividualDeleteComponent, canActivate: [AuthGuard],
    data: {expectedRole: ['ROLE_ADMIN', 'ROLE_EMPLOYEE']}
  },
  {path: 'create', component: IndividualCreateComponent, canActivate: [AuthGuard],
    data: {expectedRole: ['ROLE_ADMIN', 'ROLE_EMPLOYEE']}
  },
  {path: 'edit', component: IndividualEditComponent, canActivate: [AuthGuard],
    data: {expectedRole: ['ROLE_ADMIN', 'ROLE_EMPLOYEE']}
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndividualRoutingModule { }
