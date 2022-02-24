import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {NewsListComponent} from './news-list/news-list.component';
import {NewsDetailComponent} from './news-detail/news-detail.component';
import {NewsCreateComponent} from "./news-create/news-create.component";
import {NewsEditComponent} from "./news-edit/news-edit.component";
import {NewsDeleteComponent} from "./news-delete/news-delete.component";
import {AuthGuard} from '../../helpers/auth.guard';


const routes: Routes = [
  {
    path: 'list', component: NewsListComponent
  },
  {
    path: 'detail/:id', component: NewsDetailComponent
  },
  {
    path: 'create', component: NewsCreateComponent, canActivate: [AuthGuard],
    data: {expectedRole: ['ROLE_ADMIN', 'ROLE_EMPLOYEE']}
  },

  {
    path: 'edit/:id', component: NewsEditComponent, canActivate: [AuthGuard],
    data: {expectedRole: ['ROLE_ADMIN', 'ROLE_EMPLOYEE']}
  },
  {
    path: 'delete/:id', component: NewsDeleteComponent, canActivate: [AuthGuard],
    data: {expectedRole: ['ROLE_ADMIN', 'ROLE_EMPLOYEE']}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewsRoutingModule {
}
