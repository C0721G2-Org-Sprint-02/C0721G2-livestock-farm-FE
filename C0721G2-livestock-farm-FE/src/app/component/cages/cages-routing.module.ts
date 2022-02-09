import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CagesListComponent} from './cages-list/cages-list.component';


const routes: Routes = [
  {
    path: 'list', component: CagesListComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CagesRoutingModule { }
