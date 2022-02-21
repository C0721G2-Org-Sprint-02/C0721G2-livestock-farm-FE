import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TreatementRoutingModule } from './treatement-routing.module';
import { TreatementListComponent } from './treatement-list/treatement-list.component';
import { TreatementCreateComponent } from './treatement-create/treatement-create.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [TreatementListComponent, TreatementCreateComponent],
  imports: [
    CommonModule,
    TreatementRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class TreatementModule { }
