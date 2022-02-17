import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IndividualRoutingModule } from './individual-routing.module';
import { IndividualListComponent } from './individual-list/individual-list.component';
import { IndividualCreateComponent } from './individual-create/individual-create.component';
import { IndividualDeleteComponent } from './individual-delete/individual-delete.component';
import { IndividualEditComponent } from './individual-edit/individual-edit.component';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [IndividualListComponent, IndividualCreateComponent, IndividualDeleteComponent, IndividualEditComponent],
    imports: [
        CommonModule,
        IndividualRoutingModule,
        FormsModule
    ]
})
export class IndividualModule { }
