import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  private errorSubject = new BehaviorSubject<string | null>(null);
  error$ = this.errorSubject.asObservable();
  constructor() {}

  setError(message: string) {
    this.errorSubject.next(message);
  }

  clearErrors() {
    this.errorSubject.next(null);
  }
}
