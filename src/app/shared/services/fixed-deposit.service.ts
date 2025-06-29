import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FixedDepositDto } from '../models/dtos/fixed-deposit.dto';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { FixedDepositQuery } from '../models/dtos/fixed-deposit-query';
import { FixedDepositViewmodel } from '../models/view-models/fixed-deposit.viewmodel';
import { PaginedResponse } from '../models/view-models/client.view-model';

@Injectable({
  providedIn: 'root',
})
export class FixedDepositService {
  private readonly baseUrl: string = `${environment.baseUrl}/api/fixeddeposits`;
  constructor(private http: HttpClient) {}

  openFixedDeposit(dto: FixedDepositDto): Observable<boolean> {
    return this.http
      .post<boolean>(`${this.baseUrl}/open`, dto)
      .pipe(catchError(this.handleError));
  }

  getAll(
    q: FixedDepositQuery
  ): Observable<PaginedResponse<FixedDepositViewmodel[]>> {
    var params = new HttpParams()
      .set('pageNumber', q.pageNumber)
      .set('pageSize', q.pageSize)
      .set('searchBy', q.searchBy);
    return this.http
      .get<PaginedResponse<FixedDepositViewmodel[]>>(`${this.baseUrl}`, {
        params,
      })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any): Observable<never> {
    const message = error?.error?.message || error?.message || 'Server error';
    console.error('API Error:', message, error);
    return throwError(() => new Error(message));
  }
}
