import { CommonModule } from '@angular/common';
import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RedButtonComponent } from '../../../../../_Shared/ui/buttons/red-button/red.button';
import { BlueButtonComponent } from '../../../../../_Shared/ui/buttons/blue-button/blue.button';
import { TranslocoModule } from '@ngneat/transloco';
import { QuillModule } from 'ngx-quill';
import { SharedServices } from '../../../../../Service/shared.services';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarSuccessComponent } from '../../../../../_Shared/components/snackbarSuccess/snackbar.success';
import { AdminServices } from '../../../../../Service/admin.services';

@Component({
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RedButtonComponent,
    BlueButtonComponent,
    TranslocoModule,
    QuillModule,
  ],
  selector: 'add-jobs',
  templateUrl: './add-jobs.component.html',
  styleUrl: './add-jobs.component.scss',
})
export class AddJobsComponent implements OnInit {
  private fb = inject(FormBuilder);
  private sharedService = inject(SharedServices);
  private snackBar = inject(MatSnackBar);
  private adminService = inject(AdminServices);

  jobRoleList = signal<any[]>([]);
  jobTypeList = signal<any[]>([]);
  degreeList = signal<any[]>([]);
  jobCategoryList = signal<any[]>([]);
  jobLocationList = signal<any[]>([]);
  errorBackEnd = signal('');

  ngOnInit(): void {
    this.getJobRoles();
    this.getJobTypes();
    this.getDegree();
    this.getJobCategory();
    this.getJobLocation();
  }

  removeBtn: WritableSignal<string> = signal('Remove');
  addBtn: WritableSignal<string> = signal('+ Add tag');

  AddJobForm = this.fb.group({
    jobDescription: ['', Validators.required],
    jobTitle: ['', Validators.required],
    JobTypeId: ['', Validators.required],
    companyLocationId: ['', Validators.required],
    JobRoleId: ['', Validators.required],
    experience: ['', Validators.required],
    degreeId: ['', Validators.required],
    minSalary: [0, Validators.required],
    maxSalary: [0, Validators.required],
    applicationStartDate: [new Date(), Validators.required],
    applicationEndDate: [new Date(), Validators.required],
    jobCategoryId: ['', Validators.required],
    tags: this.fb.array([]),
  });

  get tags(): FormArray {
    return this.AddJobForm.get('tags') as FormArray;
  }

  // Add a new tag
  addTag(tag: string) {
    if (tag && tag.trim()) {
      this.tags.push(this.fb.control(tag.trim(), Validators.required));
    }
  }

  // Remove a tag by index
  removeTag(index: number) {
    this.tags.removeAt(index);
  }

  // Get all tags as string[]
  getTags(): string[] {
    return this.tags.value as string[];
  }

  onSubmit() {
    this.adminService
      .addJobDetails({
        jobTitle: this.AddJobForm.value.jobTitle!,
        jobDescription: this.AddJobForm.value.jobDescription!,
        companyLocationId: Number(this.AddJobForm.value.companyLocationId),
        jobCategoryId: Number(this.AddJobForm.value.jobCategoryId),
        JobRoleId: Number(this.AddJobForm.value.JobRoleId),
        JobTypeId: Number(this.AddJobForm.value.JobTypeId),
        experience: Number(this.AddJobForm.value.experience),
        tags: this.AddJobForm.value.tags?.join(',')!,
        degreeId: Number(this.AddJobForm.value.degreeId),
        minSalary: Number(this.AddJobForm.value.minSalary),
        maxSalary: Number(this.AddJobForm.value.maxSalary),
        applicationStartDate: this.AddJobForm.value.applicationStartDate!,
        apllicationEndDate: this.AddJobForm.value.applicationEndDate!,
      })
      .subscribe({
        next: (res) => {
          this.openSnackBarSuccess(res.message);
        },
        error: (res) => {
          this.openSnackBarError(res.error.message);
          this.errorBackEnd.set(
            'Failed to add new job details. Please try again later.'
          );
        },
      });
  }

  required(value: string) {
    return (
      this.AddJobForm.get(`${value}`)?.hasError('required') &&
      (this.AddJobForm.get(`${value}`)?.touched ||
        this.AddJobForm.get(`${value}`)?.dirty)
    );
  }

  matchExp(value: string) {
    return this.AddJobForm.get(`${value}`)?.hasError('pattern');
  }

  getJobRoles() {
    this.sharedService.getJobRoles().subscribe({
      next: (res) => {
        // console.log(res);
        this.jobRoleList.set(res.data);
      },
      error: (err) => {
        this.openSnackBarError(err.error.message);
        this.errorBackEnd.set(
          'Failed to load job roles. Please try again later.'
        );
      },
    });
  }

  getJobTypes() {
    this.sharedService.getJobTypes().subscribe({
      next: (res) => {
        console.log(res);
        this.jobTypeList.set(res.data);
      },
      error: (err) => {
        this.openSnackBarError(err.error.message);
        this.errorBackEnd.set(
          'Failed to load job types. Please try again later.'
        );
      },
    });
  }

  getDegree() {
    this.sharedService.getDegree().subscribe({
      next: (res) => {
        console.log(res);
        this.degreeList.set(res.data);
      },
      error: (err) => {
        this.openSnackBarError(err.error.message);
        this.errorBackEnd.set(
          'Failed to load degree list. Please try again later.'
        );
      },
    });
  }

  getJobCategory() {
    this.sharedService.getJobCategory().subscribe({
      next: (res) => {
        console.log(res);
        this.jobCategoryList.set(res.data);
      },
      error: (err) => {
        this.openSnackBarError(err.error.message);
        this.errorBackEnd.set(
          'Failed to load job category. Please try again later.'
        );
      },
    });
  }

  getJobLocation() {
    this.adminService.getJobLocations().subscribe({
      next: (res) => {
        console.log(res);
        this.jobLocationList.set(res.data);
      },
      error: (err) => {
        this.openSnackBarError(err.error.message);
        this.errorBackEnd.set(
          'Failed to load job locations. Please try again later.'
        );
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
