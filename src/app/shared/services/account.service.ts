import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { PaginedResponse } from '../models/view-models/client.view-model';
import { environment } from '../../../environments/environment.development';
import { AccountViewModel } from '../models/view-models/account.view-model';
import { AccountViewViewModel } from '../models/view-models/account.view-view-model';
import { AccountStatus } from '../models/view-models/current-view-model';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private readonly baseUrl: string = `${environment.baseUrl}/api/Accounts`;
  constructor(private http: HttpClient) {}

  getAccountsForClient(
    clientId: string,
    pageNumber: number = 1,
    pageSize: number = 10
  ): Observable<PaginedResponse<AccountViewModel[]>> {
    var params = new HttpParams()
      .set('pageNumber', pageNumber)
      .set('pageSize', pageSize);
    return this.http
      .get<PaginedResponse<AccountViewModel[]>>(
        `${this.baseUrl}/client/${clientId}`,
        { params }
      )
      .pipe(catchError(this.handleError));
  }

  getById(accountId: string): Observable<AccountViewViewModel> {
    return this.http
      .get<AccountViewViewModel>(`${this.baseUrl}/${accountId}`)
      .pipe(catchError(this.handleError));
  }

  changeAccountStatus(
    accountId: string,
    status: AccountStatus
  ): Observable<boolean> {
    return this.http
      .put<boolean>(
        `${this.baseUrl}/${accountId}/status?newStatus=${status}`,
        null
      )
      .pipe(catchError(this.handleError));
  }

  flagAccountSigned(accountId: string): Observable<boolean> {
    return this.http
      .post<boolean>(`${this.baseUrl}/${accountId}/flag-signed`, null)
      .pipe(catchError(this.handleError));
  }

  closeAccount(accountId: string): Observable<boolean> {
    return this.http
      .post<boolean>(`${this.baseUrl}/${accountId}/close`, null)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any): Observable<never> {
    const message = error?.error?.message || error?.message || 'Server error';
    console.error('API Error:', message, error);
    return throwError(() => new Error(message));
  }
}
