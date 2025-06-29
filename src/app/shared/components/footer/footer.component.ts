import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  isAtBottom = false;

  // Listen to scroll events
  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    const scrollPosition = window.scrollY + window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    // Check if we've reached the bottom of the page
    if (scrollPosition === documentHeight) {
      this.isAtBottom = true; // Footer should be visible
    } else {
      this.isAtBottom = false; // Footer should be hidden
    }
  }
}
