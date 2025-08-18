import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { RegisterRequest } from '../models/auth.interface';

@Injectable({providedIn: 'root'})
export class AuthServices {
  private http = inject(HttpClient);
  private router = inject(Router);

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
}
