import { OpenCurrentComponent } from './open-current/open-current.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CurrentListComponent } from './current-list/current-list.component';
import { CurrentDetailComponent } from './current-detail/current-detail.component';
import { roleGuard } from '../../shared/guards/role.guard';

const routes: Routes = [
  { path: '', redirectTo: 'current/open', pathMatch: 'full' },
  {
    path: 'current/open',
    canActivate: [roleGuard],
    data: { roles: ['Client'] },
    component: OpenCurrentComponent,
  },
  {
    path: 'currents',
    canActivate: [roleGuard],
    data: { roles: ['Admin'] },
    component: CurrentListComponent,
  },
  {
    path: 'currents/:id',
    canActivate: [roleGuard],
    data: { roles: ['Admin'] },
    component: CurrentDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CurrentRoutingModule {}
