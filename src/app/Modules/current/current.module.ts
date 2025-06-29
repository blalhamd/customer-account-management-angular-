import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CurrentRoutingModule } from './current-routing.module';
import { OpenCurrentComponent } from './open-current/open-current.component';
import { CurrentListComponent } from './current-list/current-list.component';
import { CurrentDetailComponent } from './current-detail/current-detail.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    OpenCurrentComponent,
    CurrentListComponent,
    CurrentDetailComponent,
  ],
  imports: [CommonModule, CurrentRoutingModule, ReactiveFormsModule],
})
export class CurrentModule {}
