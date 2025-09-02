import { Component, inject, OnInit, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { JobListComponent } from '../../../_Shared/components/job-list/job-list-loop.component';
import { JobListsInterface } from '../../../Interface/job-lists.interface';
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

  ngOnInit(): void {
    this.jobService.getJobLists().subscribe({
      next: (res) => {
        this.openSnackBarSuccess(res.message);
        this.jobs.set(res.data.jobList);
        console.log("signal jobs : " , this.jobs());
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
