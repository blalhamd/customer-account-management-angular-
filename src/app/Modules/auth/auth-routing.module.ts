import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { VerifyCodeComponent } from './verify-code/verify-code.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { noAuthGuard } from '../../shared/guards/no-auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [noAuthGuard] },
  {
    path: 'forgot',
    component: ForgetPasswordComponent,
    canActivate: [noAuthGuard],
  },
  {
    path: 'verify',
    component: VerifyCodeComponent,
    canActivate: [noAuthGuard],
  },
  {
    path: 'reset',
    component: ResetPasswordComponent,
    canActivate: [noAuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
