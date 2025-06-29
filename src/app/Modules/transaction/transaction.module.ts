import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionRoutingModule } from './transaction-routing.module';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { TransactionDetailsComponent } from './transaction-details/transaction-details.component';
import { CreateTransactionComponent } from './create-transaction/create-transaction.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TransactionResultComponent } from './transaction-result/transaction-result.component';

@NgModule({
  declarations: [
    TransactionListComponent,
    TransactionDetailsComponent,
    CreateTransactionComponent,
    TransactionResultComponent,
  ],
  imports: [CommonModule, TransactionRoutingModule, ReactiveFormsModule],
})
export class TransactionModule {}
