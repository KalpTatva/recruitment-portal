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
export class AddJobsComponent {
  private fb = inject(FormBuilder);

  removeBtn: WritableSignal<string> = signal('Remove');
  addBtn: WritableSignal<string> = signal('+ Add tag');

  AddJobForm = this.fb.group({
    jobDescription: ['', Validators.required],
    jobTitle: ['', Validators.required],
    JobType: ['', Validators.required],
    companyLocationId: ['', Validators.required],
    JobRole: ['', Validators.required],
    experience: ['', Validators.required],
    degree: ['', Validators.required],
    minSalary: [0, Validators.required],
    maxSalary: [0, Validators.required],
    applicationStartDate: [new Date(), Validators.required],
    applicationEndDate: [new Date(), Validators.required],
    jobCategory: ['', Validators.required],

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
    console.log(this.AddJobForm.value);
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
}
