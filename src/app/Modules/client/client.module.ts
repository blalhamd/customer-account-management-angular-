import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { CreateClientComponent } from './create-client/create-client.component';
import { UpdateClientComponent } from './update-client/update-client.component';
import { ClientDetailComponent } from './client-detail/client-detail.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ClientListComponent } from './client-list/client-list.component';

@NgModule({
  declarations: [
    CreateClientComponent,
    UpdateClientComponent,
    ClientListComponent,
    ClientDetailComponent,
  ],
  imports: [CommonModule, ClientRoutingModule, ReactiveFormsModule],
  providers: [DatePipe],
})
export class ClientModule {}
