import { ClientQuery } from './../models/dtos/client-query';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CreateClientDto } from '../models/dtos/create-client.dto';
import { environment } from '../../../environments/environment.development';
import { UpdateClientDto } from '../models/dtos/update-client.dto';
import {
  ClientViewModel,
  PaginedResponse,
} from '../models/view-models/client.view-model';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private readonly baseUrl: string = `${environment.baseUrl}/api/Clients`;
  constructor(private http: HttpClient) {}

  registerClient(
    modelDto: CreateClientDto,
    file: File | null
  ): Observable<boolean> {
    const formData = new FormData();
    formData.append('Address.Country', modelDto.address.country);
    formData.append('Address.City', modelDto.address.city);
    formData.append('Address.Street', modelDto.address.street);
    formData.append('Address.ZipCode', modelDto.address.zipCode);
    formData.append('nationality', `${modelDto.nationality}`);
    formData.append('email', modelDto.email);
    formData.append('password', modelDto.password);
    formData.append('fullName', modelDto.fullName);
    formData.append('sSN', modelDto.sSN);

    // Append the file if present
    if (file) {
      formData.append('imagePath', file);
      console.log('Appended file:', file); // Should log a File object
    }

    formData.append('gender', modelDto.gender);
    formData.append('birthDate', modelDto.birthDate.toISOString());
    formData.append('jobTitle', modelDto.jobTitle);
    formData.append('monthlyIncome', modelDto.monthlyIncome.toString());
    formData.append('financialSource', modelDto.financialSource.toString());

    // Check what you are sending
    console.log('formData.get(imagePath):', formData.get('imagePath'));

    return this.http
      .post<boolean>(`${this.baseUrl}`, formData)
      .pipe(catchError(this.handleError));
  }

  getById(clientId: string): Observable<ClientViewModel> {
    return this.http
      .get<ClientViewModel>(`${this.baseUrl}/${clientId}`)
      .pipe(catchError(this.handleError));
  }

  getAll(q: ClientQuery): Observable<PaginedResponse<ClientViewModel[]>> {
    var params = new HttpParams()
      .set('pageNumber', q.pageNumber)
      .set('pageSize', q.pageSize)
      .set('searchBy', q.searchBy ?? '');
    return this.http
      .get<PaginedResponse<ClientViewModel[]>>(`${this.baseUrl}`, { params })
      .pipe(catchError(this.handleError));
  }

  updateClient(clientId: string, modelDto: UpdateClientDto): Observable<void> {
    return this.http
      .put<void>(`${this.baseUrl}/${clientId}`, modelDto)
      .pipe(catchError(this.handleError));
  }

  softDeleteClient(clientId: string): Observable<any> {
    return this.http
      .delete(`${this.baseUrl}/${clientId}`)
      .pipe(catchError(this.handleError));
  }

  restoreClient(clientId: string): Observable<any> {
    return this.http
      .post(`${this.baseUrl}/${clientId}/restore`, null)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any): Observable<never> {
    const message = error?.error?.message || error?.message || 'Server error';
    console.error('API Error:', message, error);
    return throwError(() => new Error(message));
  }
}
