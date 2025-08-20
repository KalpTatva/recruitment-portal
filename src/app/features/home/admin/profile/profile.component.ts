import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';
import { AuthServices } from '../../../auth/services/auth.services';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarSuccessComponent } from '../../../../shared/components/snackbarSuccess/snackbar.success';

@Component({
  standalone: true,
  imports: [TranslocoModule, RouterModule, ReactiveFormsModule],
  selector: 'admin-profile',
  styleUrls: ['./profile.component.scss'],
  template: `
    <section class="login-section">
      <div class="login-card-body">
        <h1 class="login-title">{{ 'COMPANY_PROFILE' | transloco }}</h1>
        <form
          [formGroup]="RegisterCompanyForm"
          (ngSubmit)="onSubmit()"
          class="login-form"
        >
          <div class="form-group-flex">
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
              [placeholder]="'COMPANY_DESCRIPTION_PLACEHOLDER' | transloco"
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
        </form>
      </div>
    </section>
  `,
})
export class AdminProfileComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthServices);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);
  errorBackEnd = signal('');

  RegisterCompanyForm = this.fb.group({
    email: [
      '',
      [
        Validators.required,
        Validators.email,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
      ],
    ],
    userName: ['', Validators.required],
    phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
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
  });

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

  onSubmit() {}
}
