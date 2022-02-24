import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewsRoutingModule } from './news-routing.module';
import { NewsListComponent } from './news-list/news-list.component';
import { NewsEditComponent } from './news-edit/news-edit.component';
import { NewsCreateComponent } from './news-create/news-create.component';
import { NewsDeleteComponent } from './news-delete/news-delete.component';
import { NewsDetailComponent } from './news-detail/news-detail.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';


@NgModule({
  declarations: [NewsListComponent, NewsEditComponent, NewsCreateComponent, NewsDeleteComponent, NewsDetailComponent],
  imports: [
    CommonModule,
    NewsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    CKEditorModule
  ]
})
export class NewsModule { }
