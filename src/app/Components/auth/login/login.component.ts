import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { TranslocoModule, TranslocoService } from '@ngneat/transloco';
import { Router } from '@angular/router';
import { AuthServices } from '../../../Service/auth.services';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarSuccessComponent } from '../../../_Shared/components/snackbarSuccess/snackbar.success';
@Component({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    TranslocoModule,
  ],
  selector: 'login',
  styleUrl: './login.component.scss',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthServices);
  private snackBar = inject(MatSnackBar);

  loginInvalid = signal(false);
  ngOnInit() {}

  loginForm = this.fb.group({
    email: [
      '',
      [
        Validators.required,
        Validators.email,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
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
    rememberMe: [false],
  });

  Required(value: string) {
    return (
      this.loginForm.get(`${value}`)?.hasError('required') &&
      (this.loginForm.get(`${value}`)?.touched ||
        this.loginForm.get(`${value}`)?.dirty)
    );
  }

  MatchExp(value: string) {
    return this.loginForm.get(`${value}`)?.hasError('pattern');
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService
        .LoginUser({
          email: this.loginForm.value.email!,
          password: this.loginForm.value.password!,
          rememberMe: this.loginForm.value.rememberMe ?? false,
        })
        .subscribe({
          next: (res) => {
            this.loginForm.reset();

            if (res.data.roleType === 'Admin') this.router.navigate(['/admin']);
            else if (res.data.roleType === 'Candidate') this.router.navigate(['/']);
            else if (res.data.roleType === 'Interviewer') this.router.navigate(['/interviewer']);
          },
          error: (error) => {
            console.log('error login : ', error);
            this.openSnackBarError(error.error.message);
          },
        });
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
