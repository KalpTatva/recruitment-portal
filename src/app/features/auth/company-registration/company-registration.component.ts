import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';
import { AuthServices } from '../services/auth.services';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarSuccessComponent } from '../../../shared/components/snackbarSuccess/snackbar.success';
@Component({
  standalone: true,
  imports: [TranslocoModule, RouterModule, ReactiveFormsModule, CommonModule],
  selector: 'company-register',
  styleUrl: './company-registration.component.scss',
  templateUrl : './company-registration.component.html'
})
export class CompanyRegistrationComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthServices);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);
  errorBackEnd = signal('');

  RegisterCompanyForm = this.fb.group(
    {
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
          ),
        ],
      ],
      userName: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      countryCode: ['+91', Validators.required],
      companyName: [
        '',
        [Validators.required, Validators.pattern(/^[a-zA-Z0-9@%.,"'\s]+$/)],
      ],
      CompanyType: ['', Validators.required],
      companyDescription: ['', Validators.required],
      companyWebsite: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(https?:\/\/)?([\w.-]+)+\.[a-z]{2,}\/?$/),
        ],
      ],
      companyLocation: ['', Validators.required],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[#$^+=!*()@%&<>.?-_]).{8,}$/
          ),
        ],
      ],
      confirmPassword: ['', Validators.required],
    },
    { validators: this.passwordMatchValidator }
  );

  // Custom validator to check if passwords match
  passwordMatchValidator(RegisterCompanyForm: any) {
    const password = RegisterCompanyForm.get('password')?.value;
    const confirmPassword = RegisterCompanyForm.get('confirmPassword')?.value;
    if (password !== confirmPassword) {
      return { passwordMismatch: true };
    }
    return null;
  }

  required(value: string) {
    return (
      this.RegisterCompanyForm.get(`${value}`)?.hasError('required') &&
      (this.RegisterCompanyForm.get(`${value}`)?.touched ||
        this.RegisterCompanyForm.get(`${value}`)?.dirty)
    );
  }

  matchExp(value: string) {
    return this.RegisterCompanyForm.get(`${value}`)?.hasError('pattern');
  }

  matching() {
    if (
      this.RegisterCompanyForm.errors?.['passwordMismatch'] &&
      this.RegisterCompanyForm.get('confirmPassword')?.touched
    ) {
      return true;
    } else {
      return false;
    }
  }

  onSubmit() {
    if (this.RegisterCompanyForm.valid) {
      console.log(this.RegisterCompanyForm.value);
      this.authService
        .CompanyRegistration({
          email: this.RegisterCompanyForm.value.email!,
          userName: this.RegisterCompanyForm.value.userName!,
          phone: Number(this.RegisterCompanyForm.value.phone!),
          companyName: this.RegisterCompanyForm.value.companyName!,
          CompanyType: this.RegisterCompanyForm.value.CompanyType!,
          companyDescription:
            this.RegisterCompanyForm.value.companyDescription!,
          companyWebsite: this.RegisterCompanyForm.value.companyWebsite!,
          companyLocation: this.RegisterCompanyForm.value.companyLocation!,
          password: this.RegisterCompanyForm.value.password!,
          confirmPassword: this.RegisterCompanyForm.value.confirmPassword!,
          countryCode: this.RegisterCompanyForm.value.countryCode!,
        })
        .subscribe({
          next: (res) => {
            if (res.success) {
              this.errorBackEnd.set('');
              this.RegisterCompanyForm.reset();
              this.router.navigate(['/login']);
              this.openSnackBarSuccess(res.message);
            } else {
              if (res.errors) {
                this.errorBackEnd.set(res.errors.join(', '));
                this.openSnackBarError(res.errors.join(', '));
              }
              this.errorBackEnd.set(res.message);
              this.openSnackBarError(res.message + ',');
            }
          },
          error: (err) => {
            this.errorBackEnd.set(
              err.error.message || 'An error occurred while registration'
            );
            this.openSnackBarError(
              err.error.message || 'An error occurred while registration'
            );
            // console.error('Registration error:', err.error);
          },
        });
    }
  }

  // snackbars
  openSnackBarSuccess(message: string) {
    this.snackBar.openFromComponent(SnackBarSuccessComponent, {
      data: message,
      panelClass: 'snackbar-success',
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
    });
  }

  openSnackBarError(message: string) {
    this.snackBar.openFromComponent(SnackBarSuccessComponent, {
      data: message,
      panelClass: 'snackbar-error',
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
    });
  }
}
