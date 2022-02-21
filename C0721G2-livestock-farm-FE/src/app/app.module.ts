import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {EmployeeModule} from './component/employee/employee.module';
import {NewsModule} from './component/news/news.module';
import {IndividualModule} from './component/individual/individual.module';
import {BuyModule} from './component/buy/buy.module';
import {ShareModule} from './component/share/share.module';
import {TreatementModule} from './component/treatement/treatement.module';
import {SecurityModule} from './component/security/security.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSliderModule} from '@angular/material/slider';
import {CagesModule} from './component/cages/cages.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CagesModule,
    EmployeeModule,
    NewsModule,
    IndividualModule,
    BuyModule,
    ShareModule,
    TreatementModule,
    SecurityModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatSliderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
