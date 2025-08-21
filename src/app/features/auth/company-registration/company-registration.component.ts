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
  template: `
    <div>
      <section class="login-section">
        <div class="login-container">
          <div class="login-card">
            <div class="login-card-body">
              <h1 class="login-title">{{ 'REGISTER_COMPANY' | transloco }}</h1>
              <form
                [formGroup]="RegisterCompanyForm"
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

                <div class="form-group-flex">
                  <!-- country code  -->
                  <span class="form-group">
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
                  </span>
                  <!-- phone  -->
                  <span class="form-group">
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
                  </span>
                </div>

                <div class="form-group-flex">
                  <!-- Company name  -->
                  <div class="form-group">
                    <label for="companyName" class="form-label">
                      {{ 'COMPANY_NAME_LABEL' | transloco }}
                    </label>
                    <input
                      type="text"
                      formControlName="companyName"
                      id="companyName"
                      [placeholder]="'COMPANY_NAME_PLACEHOLDER' | transloco"
                      class="form-input"
                    />
                    @if(required("companyName")) {
                    <div class="error">
                      {{ 'COMPANY_NAME_REQUIRED' | transloco }}
                    </div>
                    } @else if(matchExp("companyName")) {
                    <div class="error">
                      {{ 'COMPANY_NAME_INVALID' | transloco }}
                    </div>
                    }
                  </div>

                  <!-- Company type  -->
                  <div class="form-group">
                    <label for="CompanyType" class="form-label">
                      {{ 'COMPANY_TYPE_LABEL' | transloco }}
                    </label>
                    <input
                      type="text"
                      formControlName="CompanyType"
                      id="CompanyType"
                      [placeholder]="'COMPANY_TYPE_PLACEHOLDER' | transloco"
                      class="form-input"
                    />
                    @if(required("CompanyType")) {
                    <div class="error">
                      {{ 'COMPANY_TYPE_REQUIRED' | transloco }}
                    </div>
                    }
                  </div>
                </div>

                <!-- Company description  -->
                <div class="form-group">
                  <label for="companyDescription" class="form-label">
                    {{ 'COMPANY_DESCRIPTION_LABEL' | transloco }}
                  </label>
                  <textarea
                    formControlName="companyDescription"
                    id="companyDescription"
                    [placeholder]="
                      'COMPANY_DESCRIPTION_PLACEHOLDER' | transloco
                    "
                    class="form-input"
                    rows="4"
                  ></textarea>
                  @if(required("companyDescription")) {
                  <div class="error">
                    {{ 'COMPANY_DESCRIPTION_REQUIRED' | transloco }}
                  </div>
                  }
                </div>

                <!-- Company website  -->
                <div class="form-group">
                  <label for="companyWebsite" class="form-label">
                    {{ 'COMPANY_WEBSITE_LABEL' | transloco }}
                  </label>
                  <input
                    formControlName="companyWebsite"
                    id="companyWebsite"
                    [placeholder]="'COMPANY_WEBSITE_PLACEHOLDER' | transloco"
                    class="form-input"
                  />
                  @if(required("companyWebsite")) {
                  <div class="error">
                    {{ 'COMPANY_WEBSITE_REQUIRED' | transloco }}
                  </div>
                  }@else if(matchExp("companyWebsite")) {
                  <div class="error">
                    {{ 'COMPANY_WEBSITE_INVALID' | transloco }}
                  </div>
                  }
                </div>

                <!-- Company location  -->
                <div class="form-group">
                  <label for="companyLocation" class="form-label">
                    {{ 'COMPANY_ADDRESS_LABEL' | transloco }}
                  </label>
                  <input
                    formControlName="companyLocation"
                    id="companyLocation"
                    [placeholder]="'COMPANY_ADDRESS_PLACEHOLDER' | transloco"
                    class="form-input"
                  />
                  @if(required("companyLocation")) {
                  <div class="error">
                    {{ 'COMPANY_ADDRESS_REQUIRED' | transloco }}
                  </div>
                  }
                </div>

                <div class="form-group-flex">
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
                    <div class="error">
                      {{ 'PASSWORD_REQUIRED' | transloco }}
                    </div>
                    } @else if(matchExp("password")) {
                    <div class="error">
                      {{ 'PASSWORD_INVALID' | transloco }}
                    </div>
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
                    <div class="error">
                      {{ 'PASSWORD_NOT_MATCH' | transloco }}
                    </div>
                    }
                  </div>
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
                  [disabled]="RegisterCompanyForm.invalid"
                  class="btn-submit"
                >
                  {{ 'REGISTER' | transloco }}
                </button>

                <!-- Sign up link -->
                <p class="signup-text">
                  {{ 'HAVE_ACCOUNT' | transloco }}
                  <a class="signup-link" [routerLink]="['/login']">{{
                    'SIGN_IN' | transloco
                  }}</a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
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
