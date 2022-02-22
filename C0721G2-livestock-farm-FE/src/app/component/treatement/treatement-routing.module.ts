import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TreatementListComponent} from './treatement-list/treatement-list.component';
import {IndividualListComponent} from '../individual/individual-list/individual-list.component';
import {AuthGuard} from '../../helpers/auth.guard';
import {IndividualDeleteComponent} from '../individual/individual-delete/individual-delete.component';
import {IndividualCreateComponent} from '../individual/individual-create/individual-create.component';
import {IndividualEditComponent} from '../individual/individual-edit/individual-edit.component';
import {TreatementCreateComponent} from './treatement-create/treatement-create.component';



const routes: Routes = [
  // {
  //   path: 'list', component: TreatementListComponent
  // },

  {
    path: 'list', component: TreatementListComponent, canActivate: [AuthGuard],
    data: {expectedRole: ['ROLE_ADMIN', 'ROLE_EMPLOYEE']}
  },
  {path: 'create', component: TreatementCreateComponent, canActivate: [AuthGuard],
    data: {expectedRole: ['ROLE_ADMIN', 'ROLE_EMPLOYEE']}
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TreatementRoutingModule { }
