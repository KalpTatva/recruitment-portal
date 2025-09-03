import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { SearchParamsInterface } from '../Interface/jobs.interface';

@Injectable({ providedIn: 'root' })
export class JobsServices {
  private API_URL = 'http://localhost:5146/api';
  private http = inject(HttpClient);

  // getJobLists() {
  //   return this.http.get<any>(`${this.API_URL}/Job/get-job-list`).pipe(
  //     tap((res) => {
  //       console.log(res);
  //     })
  //   );
  // }

  getJobLists(params: SearchParamsInterface): Observable<any> {
    let httpParams = new HttpParams()
      .set('categoryId', params.categoryId?.toString() ?? '0')
      .set('searchInput', params.searchInput?.toString() ?? '')
      .set('Location', params.Location ?? 0)
      .set('jobType', params.jobType ?? 0)
      .set('experience', params.experience ?? 0)
      .set('datePost', params.datePost ?? 0);

    return this.http
      .get<any>(`${this.API_URL}/Job/get-job-list-with-params`, {
        params: httpParams,
      })
      .pipe(
        tap((res) => {
          console.log(res);
        })
      );
  }

  getCityList() {
    return this.http.get<any>(`${this.API_URL}/Job/get-cities`).pipe(
      tap((res) => {
        console.log(res);
      })
    );
  }

  getJobTypeFilter() {
    return this.http.get<any>(`${this.API_URL}/Job/get-job-type`).pipe(
      tap((res) => {
        console.log(res);
      })
    );
  }

  getCategoryFilter() {
    return this.http.get<any>(`${this.API_URL}/Job/get-categories-filter`).pipe(
      tap((res) => {
        console.log(res);
      })
    );
  }
}
