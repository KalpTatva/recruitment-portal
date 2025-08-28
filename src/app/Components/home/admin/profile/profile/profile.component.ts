import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';
import { AuthServices } from '../../../../../Service/auth.services';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarSuccessComponent } from '../../../../../_Shared/components/snackbarSuccess/snackbar.success';
import { BackArrowButtonComponent } from '../../../../../_Shared/ui/buttons/back-arrow-button/back-arrow.button';
import { GrayButtonComponent } from "../../../../../_Shared/ui/buttons/gray-button/gray-button.button.component";
import { SharedServices } from '../../../../../Service/shared.services';

@Component({
  standalone: true,
  imports: [
    TranslocoModule,
    RouterModule,
    ReactiveFormsModule,
    BackArrowButtonComponent,
    GrayButtonComponent
],
  selector: 'admin-profile',
  styleUrls: ['./profile.component.scss'],
  templateUrl: './profile.component.html'
})
export class AdminProfileComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthServices);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);
  public sharedService = inject(SharedServices);

  tabLabelData = signal('tab');
  tabIcon = signal('menu_open');
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
