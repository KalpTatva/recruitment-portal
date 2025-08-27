import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { EditAdminProfile } from '../Interface/admin.interface';

@Injectable({ providedIn: 'root' })
export class AdminServices {
  private API_URL = 'http://localhost:5146/api';
  private http = inject(HttpClient);

  getCompanyDetailsByEmail() {
    return this.http
      .get<any>(`${this.API_URL}/Company/get-company-details-by-email`)
      .pipe(
        tap((res) => {
          console.log(res);
        })
      );
  }

  editCompanyDetails(data: EditAdminProfile) {
    return this.http
      .put<any>(`${this.API_URL}/Company/edit-company-details`, data)
      .pipe(
        tap((res) => {
          console.log(res);
        })
      );
  }
}
