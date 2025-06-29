import { ResetRequestDto } from './../models/dtos/reset-request.dto';
import { LoginRequestDto } from './../models/dtos/login-request.dto';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { ResetPasswordDto } from '../models/dtos/reset-password.dto';
import { isPlatformBrowser } from '@angular/common';
import { AppConstants } from '../constants/app-constants';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';
import { VerifyResetCodeDto } from '../models/dtos/verify-reset-code.dto';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData = new BehaviorSubject(null);
  private jwtHelper = new JwtHelperService();
  private readonly baseUrl: string = `${environment.baseUrl}/api/Authentications`;
  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) private _platformId: Object
  ) {
    if (this.getToken() !== null && !this.isTokenExpired(this.getToken())) {
      this.decodeUserData();
    }
  }

  login(model: LoginRequestDto): Observable<any> {
    return this.http
      .post(`${this.baseUrl}/login`, model)
      .pipe(catchError(this.handleError));
  }

  requestReset(model: ResetRequestDto): Observable<any> {
    return this.http
      .post(`${this.baseUrl}/request-reset`, model)
      .pipe(catchError(this.handleError));
  }

  verifyResetCode(model: VerifyResetCodeDto): Observable<any> {
    return this.http
      .post(`${this.baseUrl}/verify-reset-code`, model)
      .pipe(catchError(this.handleError));
  }

  resetPassword(model: ResetPasswordDto): Observable<any> {
    return this.http
      .post(`${this.baseUrl}/reset-password`, model)
      .pipe(catchError(this.handleError));
  }

  getToken(): string | null {
    if (isPlatformBrowser(this._platformId)) {
      const token = localStorage.getItem(AppConstants.TOKEN);
      return token;
    } else {
      return null;
    }
  }

  setToken(value: string) {
    if (isPlatformBrowser(this._platformId)) {
      localStorage.setItem(AppConstants.TOKEN, value);
    }
  }

  removeToken() {
    if (isPlatformBrowser(this._platformId)) {
      localStorage.removeItem(AppConstants.TOKEN);
    }
  }

  decodeUserData() {
    var encodedToken = this.getToken() as string;
    var decodedToken: any = jwtDecode(encodedToken);
    this.userData.next(decodedToken);
  }

  logout() {
    this.removeToken();
    this.userData.next(null);
    this.router.navigate(['/auth/login']);
  }

  isLoggedIn(): boolean {
    // Check if token exists and is not expired
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token); // Implement isTokenExpired() if needed
  }

  // Check if token is expired
  isTokenExpired(token: string | null): boolean {
    try {
      return this.jwtHelper.isTokenExpired(token);
    } catch (error) {
      console.error('Error decoding token:', error);
      return true; // Consider invalid tokens as expired
    }
  }

  getUserRoles(): string[] {
    const token = this.getToken();
    if (!token) return [];

    const decodedToken = this.jwtHelper.decodeToken(token);
    return decodedToken.roles || [];
  }

  hasRole(allowedRoles: string[]): boolean {
    const userRoles = this.getUserRoles();
    return allowedRoles.some((role) => userRoles.includes(role));
  }

  private handleError(error: any): Observable<never> {
    const message = error?.error?.message || error?.message || 'Server error';
    console.error('API Error:', message, error);
    return throwError(() => new Error(message));
  }
}
