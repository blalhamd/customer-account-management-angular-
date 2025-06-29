import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientListComponent } from './client-list/client-list.component';
import { ClientDetailComponent } from './client-detail/client-detail.component';
import { CreateClientComponent } from './create-client/create-client.component';
import { UpdateClientComponent } from './update-client/update-client.component';
import { roleGuard } from '../../shared/guards/role.guard';

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  {
    path: 'list',
    canActivate: [roleGuard],
    data: { roles: ['Admin'] },
    component: ClientListComponent,
  },
  {
    path: 'list/:id',
    canActivate: [roleGuard],
    data: { roles: ['Admin'] },
    component: ClientDetailComponent,
  },
  {
    path: 'create',
    canActivate: [roleGuard],
    data: { roles: ['Admin'] },
    component: CreateClientComponent,
  },
  {
    path: 'update/:id',
    canActivate: [roleGuard],
    data: { roles: ['Admin'] },
    component: UpdateClientComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientRoutingModule {}
