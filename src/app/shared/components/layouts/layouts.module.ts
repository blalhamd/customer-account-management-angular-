import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { BlankLayoutComponent } from './blank-layout/blank-layout.component';
import { ClientLayoutComponent } from './client-layout/client-layout.component';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { RouterModule } from '@angular/router';
import { AccountComponent } from './account/account.component';

@NgModule({
  declarations: [
    AdminLayoutComponent,
    BlankLayoutComponent,
    ClientLayoutComponent,
    AuthLayoutComponent,
    AccountComponent,
  ],
  imports: [CommonModule, RouterModule],
})
export class LayoutsModule {}
