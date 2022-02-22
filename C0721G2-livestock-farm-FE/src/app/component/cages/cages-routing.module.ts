import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CagesListComponent} from './cages-list/cages-list.component';
import {AuthGuard} from '../../helpers/auth.guard';
import {CagesCreateComponent} from './cages-create/cages-create.component';
import {CagesEditComponent} from './cages-edit/cages-edit.component';


const routes: Routes = [
  {
    path: 'list', component: CagesListComponent, canActivate: [AuthGuard],
    data: {expectedRole: ['ROLE_ADMIN', 'ROLE_EMPLOYEE']}
  },
  {path: 'create', component: CagesCreateComponent, canActivate: [AuthGuard],
    data: {expectedRole: ['ROLE_ADMIN', 'ROLE_EMPLOYEE',]}
  },
  {path: 'edit', component: CagesEditComponent, canActivate: [AuthGuard],
    data: {expectedRole: ['ROLE_ADMIN', 'ROLE_EMPLOYEE',]}
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CagesRoutingModule { }
