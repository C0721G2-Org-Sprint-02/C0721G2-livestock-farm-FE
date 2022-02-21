import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CagesRoutingModule } from './cages-routing.module';
import { CagesCreateComponent } from './cages-create/cages-create.component';
import { CagesListComponent } from './cages-list/cages-list.component';
import { CagesEditComponent } from './cages-edit/cages-edit.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatDialogModule} from "@angular/material/dialog";



@NgModule({
  declarations: [CagesCreateComponent, CagesListComponent, CagesEditComponent],
    imports: [
        CommonModule,
        CagesRoutingModule,
        ReactiveFormsModule,
        FormsModule,
      MatDialogModule
    ]
})
export class CagesModule { }
