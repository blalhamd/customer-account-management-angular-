import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './shared/components/layouts/admin-layout/admin-layout.component';
import { ClientLayoutComponent } from './shared/components/layouts/client-layout/client-layout.component';
import { BlankLayoutComponent } from './shared/components/layouts/blank-layout/blank-layout.component';
import { AuthLayoutComponent } from './shared/components/layouts/auth-layout/auth-layout.component';
import { authGuard } from './shared/guards/auth.guard';
import { AccountComponent } from './shared/components/layouts/account/account.component';
import { ErrorComponent } from './shared/components/error/error.component';
import { UnauthorizedComponent } from './shared/components/unauthorized/unauthorized.component';

const routes: Routes = [
  { path: '', redirectTo: 'blank', pathMatch: 'full' },
  {
    path: 'blank',
    component: BlankLayoutComponent,
    canActivate: [authGuard],
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./Modules/account/account.module').then(
            (m) => m.AccountModule
          ),
      },
    ],
  },
  {
    path: 'client',
    component: ClientLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./Modules/client/client.module').then((m) => m.ClientModule),
      },
      {
        path: '',
        loadChildren: () =>
          import('./Modules/transaction/transaction.module').then(
            (m) => m.TransactionModule
          ),
      },
    ],
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./Modules/auth/auth.module').then((m) => m.AuthModule),
      },
    ],
  },
  {
    path: 'account',
    component: AccountComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./Modules/current/current.module').then(
            (m) => m.CurrentModule
          ),
      },
      {
        path: '',
        loadChildren: () =>
          import('./Modules/fixed-deposit/fixed-deposit.module').then(
            (m) => m.FixedDepositModule
          ),
      },
    ],
  },
  {
    path: 'unauthorized',
    component: UnauthorizedComponent,
  },
  {
    path: '**',
    component: ErrorComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
