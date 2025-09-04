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
import { MatListModule } from '@angular/material/list';
import { GreenButtonComponent } from '../../../_Shared/ui/buttons/green-button/green.button';
import { ɵInternalFormsSharedModule } from '@angular/forms';
import { SharedServices } from '../../../Service/shared.services';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    JobListComponent,
    MatListModule,
    GreenButtonComponent,
    ɵInternalFormsSharedModule,
  ],
  selector: 'jobs',
  styleUrl: './jobs.component.scss',
  templateUrl: './jobs.component.html',
})
export class JobsComponent implements OnInit {
  private jobService = inject(JobsServices);
  private snackBar = inject(MatSnackBar);
  private sharedService = inject(SharedServices);

  selectedCategoryId: number = 0;
  selectedSearchInput: string = '';
  selectedLocation: number = 0;
  selectedJobType: number = 0;
  selectedExperience: number = 0;
  selectedDatePost: number = 0;

  minSalary: number = 0;
  maxSalary: number = 10000000;
  rangeMin: number = 0;
  rangeMax: number = 10000000;

  ngOnInit(): void {
    this.handleJobLists();
    this.handleCities();
    this.handleCategoryFilter();
    this.handleJobTypeFilter();
  }

  CategoryToggle = false;
  showMore = signal('Show More');
  apply = signal('Apply');

  ToggleCategoryIndex() {
    this.CategoryToggle = !this.CategoryToggle;
    if (this.CategoryToggle) {
      this.showMore.set('Show Less');
    } else {
      this.showMore.set('Show More');
    }
  }

  jobs = signal<JobListsInterface[]>([]);
  cities = signal<CityInterface[]>([]);
  categoryFilters = signal<categoriesFilterInterface[]>([]);
  jobTypeFilters = signal<jobTypeInterface[]>([]);

  handleJobLists() {
    this.sharedService.showLoader();
    this.jobService
      .getJobLists({
        categoryId: this.selectedCategoryId,
        searchInput: this.selectedSearchInput,
        location: this.selectedLocation,
        jobType: this.selectedJobType,
        experience: this.selectedExperience,
        datePost: this.selectedDatePost,
        minSalary: this.minSalary,
        maxSalary: this.maxSalary
      })
      .subscribe({
        next: (res) => {
          this.jobs.set(res.data.jobList);
          this.sharedService.hideLoader();
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

  handleCategoryFilterValue(categoryId: number) {
    this.selectedCategoryId =
      this.selectedCategoryId === categoryId ? 0 : categoryId;
    this.handleJobLists();
  }

  handleJobTypeFilterValue(jobTypeId: number) {
    this.selectedJobType = this.selectedJobType === jobTypeId ? 0 : jobTypeId;
    this.handleJobLists();
  }

  handleExperienceFilterValue(exp: number) {
    this.selectedExperience = this.selectedExperience === exp ? 0 : exp;
    this.handleJobLists();
  }

  handleDateFilterValue(datePost: number) {
    this.selectedDatePost = this.selectedDatePost === datePost ? 0 : datePost;
    this.handleJobLists();
  }

  onSearchInput(event: any) {
    this.selectedSearchInput = event.target.value;
    this.handleJobLists();
  }

  onLocationChange(event: any) {
    this.selectedLocation = Number(event.target.value);
    this.handleJobLists();
  }

  handleJobTypeFilter() {
    this.jobService.getJobTypeFilter().subscribe({
      next: (res) => {
        this.openSnackBarSuccess(res.message);
        this.jobTypeFilters.set(res.data);
        // console.log('++++++++', this.jobTypeFilters());
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

  onMinInputChange(event: any) {
    const value = event.target.value;
    if (this.maxSalary - value >= this.rangeMin && value <= this.maxSalary) {
      this.minSalary = value;
    }
  }

  onMaxInputChange(event: any) {
    const value = event.target.value;
    if (value - this.minSalary >= this.rangeMin && value <= this.rangeMax) {
      this.maxSalary = value;
    }
  }
  HandleSalaryApply() {
    this.handleJobLists();
  }


}
