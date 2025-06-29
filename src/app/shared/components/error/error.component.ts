import { Component, OnDestroy, OnInit } from '@angular/core';
import { ErrorService } from '../../services/error.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrl: './error.component.css',
})
export class ErrorComponent implements OnInit, OnDestroy {
  ErrorMessage: string | null = 'Something went wrong.';

  constructor(private _errorService: ErrorService) {}

  ngOnInit(): void {
    this._errorService.error$.subscribe({
      next: (res) => (this.ErrorMessage = res),
    });
  }

  ngOnDestroy(): void {
    this._errorService.clearErrors();
  }
}
