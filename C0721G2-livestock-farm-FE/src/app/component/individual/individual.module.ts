import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {IndividualRoutingModule} from './individual-routing.module';
import {IndividualListComponent} from './individual-list/individual-list.component';
import {IndividualCreateComponent} from './individual-create/individual-create.component';
import {IndividualDeleteComponent} from './individual-delete/individual-delete.component';
import {IndividualEditComponent} from './individual-edit/individual-edit.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import { IndividualCreateALotComponent } from './individual-create-a-lot/individual-create-a-lot.component';


@NgModule({
  declarations: [IndividualListComponent, IndividualCreateComponent, IndividualDeleteComponent, IndividualEditComponent, IndividualCreateALotComponent],
  imports: [
    CommonModule,
    IndividualRoutingModule,
    FormsModule,
    MatDialogModule,
    ReactiveFormsModule
  ]

})
export class IndividualModule {
}
