import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';
import { CommonModule } from '@angular/common';
import { AuthServices } from '../services/auth.services';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarSuccessComponent } from '../../../shared/components/snackbarSuccess/snackbar.success';
@Component({
  standalone: true,
  imports: [TranslocoModule, ReactiveFormsModule, CommonModule, RouterModule],
  selector: 'register',
  styleUrl: './register.component.scss',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthServices);
  private snackBar = inject(MatSnackBar);

  constructor() {}

  errorBackEnd = signal('');

  RegisterForm = this.fb.group(
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
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[#$^+=!*()@%&<>.?-_]).{8,}$/
          ),
        ],
      ],
      countryCode: ['+91', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      userName: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
    },
    { validator: this.passwordMatchValidator }
  );

  ngOnInit() {}

  onSubmit() {
    if (this.RegisterForm.valid) {
      this.errorBackEnd.set('');
      this.authService
        .RegisterUser({
          email: this.RegisterForm.value.email,
          password: this.RegisterForm.value.password,
          confirmPassword: this.RegisterForm.value.confirmPassword,
          userName: this.RegisterForm.value.userName,
          phone: this.RegisterForm.value.phone,
          countryCode: this.RegisterForm.value.countryCode,
        })
        .subscribe({
          next: (res) => {
            if (res.success) {
              this.RegisterForm.reset();
              this.router.navigate(['/login']);
              this.openSnackBarSuccess(res.message);
            } else {
              this.errorBackEnd.set(res.message);
              this.openSnackBarError(res.message);
            }
          },
          error: (error) => {
            this.errorBackEnd.set(error.error.message);
            this.openSnackBarError(error.error.message);
          },
        });
    }
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  // Custom validator to check if passwords match
  passwordMatchValidator(RegisterForm: any) {
    const password = RegisterForm.get('password')?.value;
    const confirmPassword = RegisterForm.get('confirmPassword')?.value;
    if (password !== confirmPassword) {
      return { passwordMismatch: true };
    }
    return null;
  }

  required(value: string) {
    return (
      this.RegisterForm.get(`${value}`)?.hasError('required') &&
      (this.RegisterForm.get(`${value}`)?.touched ||
        this.RegisterForm.get(`${value}`)?.dirty)
    );
  }

  matchExp(value: string) {
    return this.RegisterForm.get(`${value}`)?.hasError('pattern');
  }

  matching() {
    if (
      this.RegisterForm.errors?.['passwordMismatch'] &&
      this.RegisterForm.get('confirmPassword')?.touched
    ) {
      return true;
    } else {
      return false;
    }
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
