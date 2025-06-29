import { Component } from '@angular/core';

@Component({
  selector: 'app-unauthorized',
  template: `
    <div class="unauthorized">
      <h2>Access Denied</h2>
      <p>You don't have permission to access this page.</p>
      <button (click)="goBack()" class="btn btn-primary">Go Back</button>
    </div>
  `,
  styles: [
    `
      .unauthorized {
        text-align: center;
        padding: 50px;
      }
    `,
  ],
})
export class UnauthorizedComponent {
  goBack(): void {
    window.history.back();
  }
}
