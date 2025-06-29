import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { CreateCurrentDto } from '../models/dtos/create-current.dto';
import { environment } from '../../../environments/environment.development';
import { CurrentQueryDto } from '../models/dtos/current-query.dto';
import { CurrentViewModel } from '../models/view-models/current-view-model';
import { PaginedResponse } from '../models/view-models/client.view-model';

@Injectable({
  providedIn: 'root',
})
export class CurrentService {
  private readonly baseUrl: string = `${environment.baseUrl}/api/currents`;
  constructor(private http: HttpClient) {}

  openCurrent(dto: CreateCurrentDto): Observable<boolean> {
    return this.http
      .post<boolean>(`${this.baseUrl}/open`, dto, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      })
      .pipe(catchError(this.handleError));
  }

  getCurrents(
    q: CurrentQueryDto
  ): Observable<PaginedResponse<CurrentViewModel[]>> {
    var params = new HttpParams()
      .set('pageNumber', q.pageNumber)
      .set('pageSize', q.pageSize);
    return this.http
      .get<PaginedResponse<CurrentViewModel[]>>(`${this.baseUrl}`, { params })
      .pipe(catchError(this.handleError));
  }

  getById(currentId: string): Observable<CurrentViewModel> {
    return this.http
      .get<CurrentViewModel>(`${this.baseUrl}/${currentId}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any): Observable<never> {
    const message = error?.error?.message || error?.message || 'Server error';
    console.error('API Error:', message, error);
    return throwError(() => new Error(message));
  }
}
