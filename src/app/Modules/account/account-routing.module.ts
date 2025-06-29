import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountDetailsComponent } from '../account/account-details/account-details.component';
import { ClientsAccountListComponent } from '../account/clients-account-list/clients-account-list.component';
import { roleGuard } from '../../shared/guards/role.guard';
const routes: Routes = [
  {
    path: 'accounts',
    canActivate: [roleGuard],
    data: { roles: ['Admin'] },
    component: ClientsAccountListComponent,
  },
  {
    path: 'accounts/:id',
    canActivate: [roleGuard],
    data: { roles: ['Admin'] },
    component: AccountDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountRoutingModule {}
