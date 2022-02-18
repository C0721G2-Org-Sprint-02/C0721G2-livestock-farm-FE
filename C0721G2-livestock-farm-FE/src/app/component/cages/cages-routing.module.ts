import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CagesListComponent} from './cages-list/cages-list.component';
import {CagesCreateComponent} from "./cages-create/cages-create.component";
import {CagesEditComponent} from "./cages-edit/cages-edit.component";


const routes: Routes = [
  {path: 'list', component: CagesListComponent},
  {path: 'create', component: CagesCreateComponent},
  {path: 'edit/:id', component: CagesEditComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CagesRoutingModule { }
