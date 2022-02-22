import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {BuyListComponent} from './buy-list/buy-list.component';
import {AuthGuard} from "../../helpers/auth.guard";
import {BuyCreateComponent} from "./buy-create/buy-create.component";


const routes: Routes = [
  // {
  //   path: 'list', component: BuyListComponent, canActivate: [Auth]
  // },

  {
    path: 'list', component: BuyListComponent, canActivate: [AuthGuard],
    data: {expectedRole: ['ROLE_ADMIN', 'ROLE_EMPLOYEE']}
  },
  {
    path: 'create', component: BuyCreateComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuyRoutingModule {
}
