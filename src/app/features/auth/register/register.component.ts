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
  template: `
    <section class="login-section">
      <div class="login-container">
        <div class="login-card">
          <div class="login-card-body">
            <h1 class="login-title">{{ 'REGISER_ACCOUNT' | transloco }}</h1>
            <form
              [formGroup]="RegisterForm"
              (ngSubmit)="onSubmit()"
              class="login-form"
            >
              <!-- Email -->
              <div class="form-group">
                <label for="email" class="form-label">
                  {{ 'EMAIL_LABEL' | transloco }}
                </label>
                <input
                  type="email"
                  formControlName="email"
                  id="email"
                  [placeholder]="'EMAIL_PLACEHOLDER' | transloco"
                  class="form-input"
                />
                @if(required("email")) {
                <div class="error">{{ 'EMAIL_REQUIRED' | transloco }}</div>
                } @else if(matchExp("email")) {
                <div class="error">{{ 'EMAIL_INVALID' | transloco }}</div>
                }
              </div>

              <!-- username -->
              <div class="form-group">
                <label for="userName" class="form-label">
                  {{ 'USERNAME_LABEL' | transloco }}
                </label>
                <input
                  type="text"
                  formControlName="userName"
                  id="userName"
                  [placeholder]="'USERNAME_PLACEHOLDER' | transloco"
                  class="form-input"
                />
                @if(required("userName")) {
                <div class="error">{{ 'USERNAME_REQUIRED' | transloco }}</div>
                }
              </div>

              <div class="phone-group">
                <!-- country code  -->
                <div class="form-group">
                  <label for="countryCode" class="form-label">
                    {{ 'COUNTRY_CODE_LABEL' | transloco }}
                  </label>
                  <select
                    class="form-input"
                    formControlName="countryCode"
                    id="countryCode"
                  >
                    <option value="+1" class="option-colors">+1 (USA)</option>
                    <option value="+33">+33 (France)</option>
                    <option value="+48">+49 (Germany)</option>
                    <option value="+61">+61 (Australia)</option>
                    <option selected value="+91">+91 (India)</option>
                  </select>
                  @if(required("countryCode")) {
                  <div class="error">
                    {{ 'COUNTRY_CODE_REQUIRED' | transloco }}
                  </div>
                  }
                </div>

                <!-- phone  -->
                <div class="form-group">
                  <label for="phone" class="form-label">
                    {{ 'PHONE_LABEL' | transloco }}
                  </label>
                  <input
                    type="text"
                    formControlName="phone"
                    id="phone"
                    [placeholder]="'PHONE_PLACEHOLDER' | transloco"
                    class="form-input"
                  />
                  @if(required("phone")) {
                  <div class="error">{{ 'PHONE_REQUIRED' | transloco }}</div>
                  } @else if(matchExp("phone")) {
                  <div class="error">{{ 'PHONE_INVALID' | transloco }}</div>
                  }
                </div>
              </div>

              <!-- Password -->
              <div class="form-group">
                <label for="password" class="form-label">
                  {{ 'PASSWORD_LABEL' | transloco }}
                </label>
                <input
                  type="password"
                  formControlName="password"
                  id="password"
                  [placeholder]="'PASSWORD_PLACEHOLDER' | transloco"
                  class="form-input"
                />
                @if(required("password")) {
                <div class="error">{{ 'PASSWORD_REQUIRED' | transloco }}</div>
                } @else if(matchExp("password")) {
                <div class="error">{{ 'PASSWORD_INVALID' | transloco }}</div>
                }
              </div>

              <!-- confirm password -->
              <div class="form-group">
                <label for="confirmPassword" class="form-label">
                  {{ 'CONFIRM_PASSWORD_LABEL' | transloco }}
                </label>
                <input
                  type="password"
                  formControlName="confirmPassword"
                  id="confirmPassword"
                  [placeholder]="'PASSWORD_PLACEHOLDER' | transloco"
                  class="form-input"
                />
                @if(required("confirmPassword")) {
                <div class="error">
                  {{ 'CONFIRM_PASSWORD_REQUIRED' | transloco }}
                </div>
                } @else if(matching()) {
                <div class="error">{{ 'PASSWORD_NOT_MATCH' | transloco }}</div>
                }
              </div>

              <!-- error generated from backend -->
              @if(errorBackEnd().length > 0) {
              <div class="error">
                {{ errorBackEnd() }}
              </div>
              }

              <!-- Submit -->
              <button
                type="submit"
                [disabled]="RegisterForm.invalid"
                class="btn-submit"
              >
                {{ 'REGISTER' | transloco }}
              </button>

              <!-- Sign up link -->
              <p class="signup-text">
                {{ 'HAVE_ACCOUNT' | transloco }}
                <a class="signup-link" (click)="navigateToLogin()">{{
                  'SIGN_IN' | transloco
                }}</a>
              </p>
              <!-- company registration link -->
              <p class="signup-text">
                <!-- {{ 'COMPANY_REGISTER' | transloco }} -->
                Want to become partner?
                <a class="signup-link" [routerLink]="['/company-register']">
                  <!-- {{ 'COMPANY_SIGN_UP' | transloco}} -->
                  Company Registration
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  `,
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
