import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';

@Component({
  selector: 'form-field',
  standalone: true,
  imports: [ReactiveFormsModule, TranslocoModule],
  template: `
    <div class="form-group" [formGroup]="parentForm">
      <label [for]="formControlName" class="form-label">
        {{ label | transloco }}
      </label>

      @if(type !== 'textarea') {
      <input
        [type]="type"
        [formControlName]="formControlName"
        [id]="formControlName"
        [placeholder]="placeholder | transloco"
        class="form-input"
      />
      } @if(type === 'textarea') {
      <textarea
        [formControlName]="formControlName"
        [id]="formControlName"
        [placeholder]="placeholder | transloco"
        class="form-input"
        rows="4"
      ></textarea>
      }
      <!-- Error handling -->
      @if(required()) {
      <div class="error">{{ requiredMessage | transloco }}</div>
      } @else if(pattern()) {
      <div class="error">{{ invalidMessage | transloco }}</div>
      }
    </div>
  `,
})
export class FormFieldComponent {
  @Input() parentForm!: FormGroup;
  @Input() formControlName!: string;
  @Input() label!: string;
  @Input() placeholder!: string;
  @Input() type: string = 'text';
  @Input() requiredMessage: string = 'FIELD_REQUIRED';
  @Input() invalidMessage: string = 'FIELD_INVALID';

  // Access parent form using ControlContainer
  required() {
    const control = (window as any).ng
      .getComponent(this)
      ?.form?.get(this.formControlName);
    return control?.hasError('required') && (control.touched || control.dirty);
  }

  pattern() {
    const control = (window as any).ng
      .getComponent(this)
      ?.form?.get(this.formControlName);
    return control?.hasError('pattern');
  }
}
