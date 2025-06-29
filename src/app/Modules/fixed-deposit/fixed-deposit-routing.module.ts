import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FixedDepositListComponent } from './fixed-deposit-list/fixed-deposit-list.component';
import { CreateFixedDepositComponent } from './create-fixed-deposit/create-fixed-deposit.component';
import { roleGuard } from '../../shared/guards/role.guard';

const routes: Routes = [
  { path: '', redirectTo: 'fixed-deposits', pathMatch: 'full' },
  {
    path: 'fixed-deposits',
    canActivate: [roleGuard],
    data: { roles: ['Admin'] },
    component: FixedDepositListComponent,
  },
  {
    path: 'fixed-deposit/open',
    canActivate: [roleGuard],
    data: { roles: ['Client'] },
    component: CreateFixedDepositComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FixedDepositRoutingModule {}
