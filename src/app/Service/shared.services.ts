import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SharedServices {
  private http = inject(HttpClient);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private API_URL = `http://localhost:5146/api`;

  loading = signal(false);
  private requestCount = 0;

  showLoader() {
    this.requestCount++;
    this.loading.set(true);
  }

  hideLoader() {
    this.requestCount--;
    if (this.requestCount <= 0) {
      this.loading.set(false);
    }
  }

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

  getCityListByStateId(stateId: number) {
    return this.http
      .get<any>(`${this.API_URL}/Shared/get-city-by-state/${stateId}`)
      .pipe(
        tap((res) => {
          console.log(res);
        })
      );
  }

  getJobTypes() {
    return this.http.get<any>(`${this.API_URL}/Shared/get-job-types`)
    .pipe(
      tap((res) => {console.log(res)})
    );
  }

  getJobRoles() {
    return this.http.get<any>(`${this.API_URL}/Shared/get-job-roles`)
    .pipe(
      tap((res) => {console.log(res)})
    );
  }

  getDegree() {
    return this.http.get<any>(`${this.API_URL}/Shared/get-degree`)
    .pipe(
      tap((res) => {console.log(res)})
    )
  }

  getJobCategory() {
    return this.http.get<any>(`${this.API_URL}/Shared/get-job-category`)
    .pipe(
      tap((res) => {console.log(res)})
    )
  }


  private _isOpen = signal(false);

  isOpen = this._isOpen.asReadonly();

  toggle() {
    this._isOpen.update((state) => !state);
  }

  open() {
    this._isOpen.set(true);
  }

  close() {
    this._isOpen.set(false);
  }
}
