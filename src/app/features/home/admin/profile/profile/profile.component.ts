import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';
import { AuthServices } from '../../../../auth/services/auth.services';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarSuccessComponent } from '../../../../../shared/components/snackbarSuccess/snackbar.success';
import { BackArrowButtonComponent } from '../../../../../shared/ui/buttons/back-arrow-button/back-arrow.button';

@Component({
  standalone: true,
  imports: [
    TranslocoModule,
    RouterModule,
    ReactiveFormsModule,
    BackArrowButtonComponent,
  ],
  selector: 'admin-profile',
  styleUrls: ['./profile.component.scss'],
  template: `
    <section class="login-section">
      <img
        class="company-profile"
        src="/assets/images/company-profile.jpg"
        alt=""
      />

      <back-arrow-button (click)="HandleBack()" />

      <div class="login-card-body">
        <router-outlet></router-outlet>
      </div>
    </section>
  `,
})
export class AdminProfileComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthServices);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  HandleBack() {
    if (this.router.url.includes('edit-company-profile')) {
      this.router.navigate(['/admin']);
    } else {
      this.router.navigate(['/']);
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
