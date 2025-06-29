import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
@Component({
  selector: 'app-blank-layout',
  templateUrl: './blank-layout.component.html',
  styleUrl: './blank-layout.component.css',
})
export class BlankLayoutComponent {
  currentYear = new Date().toDateString();

  constructor(private authService: AuthService) {}

  canView(): boolean {
    return this.authService.hasRole(['Client']);
  }
}
