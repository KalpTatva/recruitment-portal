import { Component, inject, OnInit, signal, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  categoriesFilterInterface,
  CityInterface,
  JobListsInterface,
  jobTypeInterface,
} from '../../../Interface/jobs.interface';
import { JobListComponent } from '../../../_Shared/components/job-list/job-list-loop.component';
import { JobsServices } from '../../../Service/jobs.services';
import { SnackBarSuccessComponent } from '../../../_Shared/components/snackbarSuccess/snackbar.success';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SharedServices } from '../../../Service/shared.services';
import { MatListModule } from '@angular/material/list';
import { GreenButtonComponent } from '../../../_Shared/ui/buttons/green-button/green.button';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    JobListComponent,
    MatListModule,
    GreenButtonComponent,
  ],
  selector: 'jobs',
  styleUrl: './jobs.component.scss',
  templateUrl: './jobs.component.html',
})
export class JobsComponent implements OnInit {
  private jobService = inject(JobsServices);
  private snackBar = inject(MatSnackBar);

  ngOnInit(): void {
    this.handleJobLists();
    this.handleCities();
    this.handleCategoryFilter();
    this.handleJobTypeFilter();
  }

  CategoryToggle = false;

  ToggleCategoryIndex() {
    this.CategoryToggle = !this.CategoryToggle;
  }

  showMore = signal('Show More');
  jobs = signal<JobListsInterface[]>([]);
  cities = signal<CityInterface[]>([]);
  categoryFilters = signal<categoriesFilterInterface[]>([]);
  jobTypeFilters = signal<jobTypeInterface[]>([]);

  handleJobLists() {
    this.jobService.getJobLists({ categoryId: 0 }).subscribe({
      next: (res) => {
        this.openSnackBarSuccess(res.message);
        this.jobs.set(res.data.jobList);
      },
      error: (res) => {
        this.openSnackBarError(res.error.message);
      },
    });
  }
  handleCities() {
    this.jobService.getCityList().subscribe({
      next: (res) => {
        this.openSnackBarSuccess(res.message);
        this.cities.set(res.data);
      },
      error: (res) => {
        this.openSnackBarError(res.error.message);
      },
    });
  }
  handleCategoryFilter() {
    this.jobService.getCategoryFilter().subscribe({
      next: (res) => {
        this.openSnackBarSuccess(res.message);
        this.categoryFilters.set(res.data);
        // console.log(this.categoryFilters);
      },
      error: (res) => {
        this.openSnackBarError(res.error.message);
      },
    });
  }

  // pending work //
  handleCategoryFilterValue(value: number) {
    console.log(value);
  }
  handleJobTypeFilterValue(value: number) {
    console.log(value);
  }
  handleExperienceFilterValue(value: number) {
    console.log(value);
  }
  handleDateFilterValue(value: number) {
    console.log(value);
  }

  handleJobTypeFilter() {
    this.jobService.getJobTypeFilter().subscribe({
      next: (res) => {
        this.openSnackBarSuccess(res.message);
        this.jobTypeFilters.set(res.data);
        console.log('++++++++', this.jobTypeFilters());
      },
      error: (res) => {
        this.openSnackBarError(res.error.message);
      },
    });
  }

  // snackbars
  openSnackBarSuccess(message: string) {
    this.snackBar.openFromComponent(SnackBarSuccessComponent, {
      data: message,
      panelClass: 'snackbar-success',
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
    });
  }

  openSnackBarError(message: string) {
    this.snackBar.openFromComponent(SnackBarSuccessComponent, {
      data: message,
      panelClass: 'snackbar-error',
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
    });
  }
}
