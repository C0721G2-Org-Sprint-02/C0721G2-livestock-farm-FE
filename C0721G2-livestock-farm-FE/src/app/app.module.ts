import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {CagesModule} from './component/cages/cages.module';
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
import {MatDialogModule} from "@angular/material/dialog";
import {JWT_OPTIONS, JwtHelperService} from "@auth0/angular-jwt";
import {APP_BASE_HREF} from "@angular/common";
import {AngularFireModule} from "@angular/fire";
import {AngularFirestoreModule} from "@angular/fire/firestore";
import {AngularFireAuthModule} from "@angular/fire/auth";
import {AngularFireDatabaseModule} from "@angular/fire/database";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatBottomSheetModule} from "@angular/material/bottom-sheet";
import {MatButtonModule} from "@angular/material/button";
import {AngularFireFunctionsModule} from "@angular/fire/functions";
import {AngularFireMessagingModule} from "@angular/fire/messaging";
import {AngularFireStorageModule} from "@angular/fire/storage";
import {environment} from "../environments/environment";


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
    SecurityModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireMessagingModule,
    AngularFireDatabaseModule,
    AngularFireFunctionsModule,
    MatButtonModule,
    MatBottomSheetModule,
    MatProgressSpinnerModule,

  ],
  providers: [
    JwtHelperService,
    {provide: JWT_OPTIONS, useValue: JWT_OPTIONS},
    { provide: APP_BASE_HREF, useValue: '/'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
