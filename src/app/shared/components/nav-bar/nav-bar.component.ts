import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent {
  isLogin: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.userData.subscribe({
      next: () => {
        if (this.authService.userData.getValue() !== null) {
          this.isLogin = true;
        } else {
          this.isLogin = false;
        }
      },
      error: (err) => console.log(err),
    });
  }

  logOut() {
    this.authService.logout();
  }

  canViewAdmin(): boolean {
    return this.authService.hasRole(['Admin']);
  }

  canViewClient(): boolean {
    return this.authService.hasRole(['Client']);
  }
}
