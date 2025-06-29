import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { TransactionDetailsComponent } from './transaction-details/transaction-details.component';
import { CreateTransactionComponent } from './create-transaction/create-transaction.component';
import { roleGuard } from '../../shared/guards/role.guard';
import { TransactionResultComponent } from './transaction-result/transaction-result.component';

const routes: Routes = [
  { path: '', redirectTo: 'transactions', pathMatch: 'full' },
  {
    path: 'transactions',
    canActivate: [roleGuard],
    data: { roles: ['Client'] },
    component: TransactionListComponent,
  },
  {
    path: 'transactions/:id',
    canActivate: [roleGuard],
    data: { roles: ['Client'] },
    component: TransactionDetailsComponent,
  },
  {
    path: 'transaction/create',
    canActivate: [roleGuard],
    data: { roles: ['Client'] },
    component: CreateTransactionComponent,
  },
  {
    path: 'transaction/result',
    canActivate: [roleGuard],
    data: { roles: ['Client'] },
    component: TransactionResultComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransactionRoutingModule {}
