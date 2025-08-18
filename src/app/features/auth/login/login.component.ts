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
@Component({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    TranslocoModule
  ],
  selector: 'login',
  styleUrl: './login.component.scss',
  template: `
    <section class="login-section">
      <div class="login-container">
        <div class="login-card">
          <div class="login-card-body">
            <h1 class="login-title">{{ 'SIGN_IN_ACCOUNT' | transloco }}</h1>
            <form
              [formGroup]="loginForm"
              (ngSubmit)="onSubmit()"
              class="login-form"
            >
              <!-- Email -->
              <div class="form-group">
                <label for="email" class="form-label">
                  {{ 'EMAIL_LABEL' | transloco }}
                  Email
                </label>
                <input
                  type="email"
                  formControlName="email"
                  id="email"
                  [placeholder]="'EMAIL_PLACEHOLDER' | transloco"
                  class="form-input"
                />
                @if(Required("email")) {
                <div class="error">{{ 'EMAIL_REQUIRED' | transloco }}</div>
                } @else if(MatchExp("email")) {
                <div class="error">{{ 'EMAIL_INVALID' | transloco }}</div>
                }
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
                @if(Required("password")) {
                <div class="error">{{ 'PASSWORD_REQUIRED' | transloco }}</div>
                } @else if(MatchExp("password")) {
                <div class="error">{{ 'PASSWORD_INVALID' | transloco }}</div>
                }
              </div>

              <!-- Remember Me + Forgot -->
              <div class="form-options">
                <div class="remember-me">
                  <input
                    type="checkbox"
                    id="remember"
                    formControlName="rememberMe"
                    class="checkbox"
                  />
                  <label for="remember">{{ 'REMEMBER_ME' | transloco }}</label>
                </div>
                <a href="#" class="forgot-password">
                  {{ 'FORGOT_PASSWORD' | transloco }}
                </a>
              </div>

              <!-- Submit -->
              <button
                type="submit"
                [disabled]="loginForm.invalid"
                class="btn-submit"
              >
                {{ 'SIGN_IN' | transloco }}
              </button>

              <!-- Sign up link -->
              <p class="signup-text">
                {{ 'NO_ACCOUNT' | transloco }}
                <a href="#" class="signup-link" (click)="navigateToRegister()">{{ 'SIGN_UP' | transloco }}</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class LoginComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);

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
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[#$^+=!*()@%&]).{8,}$/
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

  onSubmit() {}
}
