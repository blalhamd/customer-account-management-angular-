import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FixedDepositRoutingModule } from './fixed-deposit-routing.module';
import { CreateFixedDepositComponent } from './create-fixed-deposit/create-fixed-deposit.component';
import { FixedDepositListComponent } from './fixed-deposit-list/fixed-deposit-list.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CreateFixedDepositComponent, FixedDepositListComponent],
  imports: [CommonModule, FixedDepositRoutingModule, ReactiveFormsModule],
})
export class FixedDepositModule {}
