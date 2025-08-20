import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { CompanyRegistrationRequest, LoginRequest, RegisterRequest } from '../models/auth.interface';
import { CookieService } from 'ngx-cookie-service';

@Injectable({ providedIn: 'root' })
export class AuthServices {
  private http = inject(HttpClient);
  private router = inject(Router);
  private cookieService = inject(CookieService)

  private isBrowser: boolean;
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  private API_URL = `http://localhost:5146/api`;

  RegisterUser(data: RegisterRequest): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/Auth/register`, data).pipe(
      tap((res) => {
        console.log(res);
      })
    );
  }

  LoginUser(data: LoginRequest): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/Auth/login`, data).pipe(
      tap((res) => {
        if(res.success) {
          this.setCookie(res.data.accessToken, res.data.roleType, res.data.userName, res.data.rememberMe);
          console.log(res);
          console.log('cookie generated successfully');
        }
      })
    );
  }

  CompanyRegistration(data: CompanyRegistrationRequest): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/Auth/register-company`, data).pipe(
      tap((res) => {
        console.log(res);
      })
    );
  }

  // Save JWT + role in cookies
  setCookie(token: string, role: string, userName: string, rememberMe: boolean) {
    const expiryDays = rememberMe ? 30 : 1;
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + expiryDays);

    this.cookieService.set('jwt_token', token, expiryDate, '/');
    this.cookieService.set('role', role, expiryDate, '/');
    this.cookieService.set('userName', userName, expiryDate, '/');
  }


  isLoggedIn(): boolean {
    return this.cookieService.check('jwt_token');
  }

  getToken(): string | null {
    return this.cookieService.get('jwt_token') || null;
  }

  getRole(): string | null {
    return this.cookieService.get('role') || null;
  }

  getUserName(): string | null {
    return this.cookieService.get('userName') || null;
  }


  logout() {
    this.cookieService.delete('jwt_token', '/');
    this.cookieService.delete('role', '/');
    this.cookieService.delete('userName', '/');
    this.router.navigate(['/login']);
  }
}


