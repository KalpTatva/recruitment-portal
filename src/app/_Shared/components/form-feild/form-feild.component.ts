import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';

@Component({
  selector: 'form-field',
  standalone: true,
  imports: [ReactiveFormsModule, TranslocoModule],
  styleUrl: './form-feild.component.scss',
  templateUrl: './form-feild.component.html'
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
