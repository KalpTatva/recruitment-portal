import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { AddJobsInterface } from '../Interface/add-jobs.interface';

@Injectable({ providedIn: 'root' })
export class JobsServices {
  private API_URL = 'http://localhost:5146/api';
  private http = inject(HttpClient);


}
