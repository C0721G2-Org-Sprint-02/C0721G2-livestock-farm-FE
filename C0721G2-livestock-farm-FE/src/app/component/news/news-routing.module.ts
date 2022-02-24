import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NewsListComponent} from './news-list/news-list.component';
import {NewsDetailComponent} from './news-detail/news-detail.component';
import {NewsCreateComponent} from './news-create/news-create.component';


const routes: Routes = [
  {
    path: 'list', component: NewsListComponent
  },
  {
    path: 'detail/:id', component: NewsDetailComponent
  },
  {
    path: 'create', component: NewsCreateComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewsRoutingModule { }
