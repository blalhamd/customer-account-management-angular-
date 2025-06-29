import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutsModule } from './components/layouts/layouts.module';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FooterComponent } from './components/footer/footer.component';
import { ErrorComponent } from './components/error/error.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';

@NgModule({
  declarations: [
    NavBarComponent,
    FooterComponent,
    ErrorComponent,
    UnauthorizedComponent,
  ],
  imports: [CommonModule, LayoutsModule, HttpClientModule, RouterModule],
  exports: [
    NavBarComponent,
    FooterComponent,
    ErrorComponent,
    UnauthorizedComponent,
  ],
})
export class SharedModule {}
