import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SharedServices {
  private http = inject(HttpClient);
  private API_URL = `http://localhost:5146/api`;

  getCountryList() {
    return this.http.get<any>(`${this.API_URL}/Shared/get-countries`).pipe(
      tap((res) => {
        console.log(res);
      })
    );
  }

  getStateList(countryId: number) {
    return this.http
      .get<any>(`${this.API_URL}/Shared/get-states-by-country/${countryId}`)
      .pipe(
        tap((res) => {
          console.log(res);
        })
      );
  }
}
