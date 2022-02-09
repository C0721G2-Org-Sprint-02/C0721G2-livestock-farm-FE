import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuyRoutingModule } from './buy-routing.module';
import { BuyListComponent } from './buy-list/buy-list.component';
import { BuyCreateComponent } from './buy-create/buy-create.component';


@NgModule({
  declarations: [BuyListComponent, BuyCreateComponent],
  imports: [
    CommonModule,
    BuyRoutingModule
  ]
})
export class BuyModule { }
