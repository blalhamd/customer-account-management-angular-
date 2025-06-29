import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { jwtTokenInterceptor } from './shared/interceptors/jwt-token.interceptor';
import { errorHandlingInterceptor } from './shared/interceptors/error-handling.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserAnimationsModule, // Required!
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    NgbModule,
    NgbPaginationModule,
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(
      withInterceptors([jwtTokenInterceptor, errorHandlingInterceptor])
    ),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
