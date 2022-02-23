import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShareRoutingModule } from './share-routing.module';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { AboutUsComponent } from './about-us/about-us.component';
import {MatDialogModule} from '@angular/material/dialog';


@NgModule({
  declarations: [FooterComponent, HeaderComponent, HomeComponent, AboutUsComponent],
  exports: [
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    ShareRoutingModule,
    MatDialogModule
  ]
})
export class ShareModule { }
