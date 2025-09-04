import { Component, inject, OnInit, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { JobListComponent } from '../../../_Shared/components/job-list/job-list-loop.component';
import { JobListsInterface } from '../../../Interface/jobs.interface';
import { JobsServices } from '../../../Service/jobs.services';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarSuccessComponent } from '../../../_Shared/components/snackbarSuccess/snackbar.success';

@Component({
  selector: 'home-page',
  styleUrl: './homepage.component.scss',
  imports: [MatIconModule, JobListComponent],
  templateUrl: './homepage.component.html',
})
export class HomePageComponent implements OnInit {
  private jobService = inject(JobsServices);
  private snackBar = inject(MatSnackBar);

  jobs = signal<JobListsInterface[]>([]);
  searchInput: string = '';

  ngOnInit(): void {
    this.getJobs();
  }

  handleSearch(event: any) {
    this.searchInput = event.target.value;
    console.log(this.searchInput);
  }

  getJobs() {
    this.jobService
      .getJobLists({
        searchInput: this.searchInput!,
      })
      .subscribe({
        next: (res) => {
          // this.openSnackBarSuccess(res.message);
          this.jobs.set(res.data.jobList);
          // console.log("signal jobs : " , this.jobs());
        },
        error: (res) => {
          this.openSnackBarError(res.error.message);
        },
      });
  }

  searchJobs() {
    console.log('hello', this.searchInput);
    this.getJobs();

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
