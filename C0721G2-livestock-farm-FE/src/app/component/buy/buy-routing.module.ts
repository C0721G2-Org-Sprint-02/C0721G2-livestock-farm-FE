import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BuyListComponent} from './buy-list/buy-list.component';


const routes: Routes = [
  {
    path: 'list', component: BuyListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuyRoutingModule { }
