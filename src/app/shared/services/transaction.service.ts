import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable, catchError, throwError } from 'rxjs';
import { PaginedResponse } from '../models/view-models/client.view-model';
import { TransactionViewModel } from '../models/view-models/transaction.view-model';
import { CreateTransactionDto } from '../models/dtos/create-transaction.dto';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private readonly baseUrl: string = `${environment.baseUrl}/api/Transactions`;
  constructor(private http: HttpClient) {}

  getAll(
    pageNumber: number = 1,
    pageSize: number = 10
  ): Observable<PaginedResponse<TransactionViewModel[]>> {
    var params = new HttpParams()
      .set('pageNumber', pageNumber)
      .set('pageSize', pageSize);
    return this.http
      .get<PaginedResponse<TransactionViewModel[]>>(`${this.baseUrl}`, {
        params,
      })
      .pipe(catchError(this.handleError));
  }

  getById(transactionId: string): Observable<TransactionViewModel> {
    return this.http
      .get<TransactionViewModel>(`${this.baseUrl}/${transactionId}`)
      .pipe(catchError(this.handleError));
  }

  makeTransaction(dto: CreateTransactionDto): Observable<TransactionViewModel> {
    return this.http
      .post<TransactionViewModel>(`${this.baseUrl}`, dto, {
        headers: { 'Content-Type': 'application/json' },
      })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any): Observable<never> {
    const message = error?.error?.message || error?.message || 'Server error';
    console.error('API Error:', message, error);
    return throwError(() => new Error(message));
  }
}
