import { Component, inject, OnInit, signal } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';
import { WhiteWithIconButtonComponent } from '../../../../../shared/ui/buttons/white-with-icon-button/white-with-icon.button';
import { RouterModule } from '@angular/router';
import { AdminServices } from '../../services/admin.services';
import { EditAdminProfile } from '../../models/admin.interface';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarSuccessComponent } from '../../../../../shared/components/snackbarSuccess/snackbar.success';
import { MatTabsModule } from '@angular/material/tabs';
@Component({
  standalone: true,
  imports: [
    TranslocoModule,
    WhiteWithIconButtonComponent,
    RouterModule,
    CommonModule,
    MatTabsModule,
  ],
  selector: 'profile-view',
  styleUrls: ['./profile-view.component.scss'],
  templateUrl: './profile-view.component.html'
})
export class CompanyProfileViewComponent implements OnInit {
  editIcon = signal('border_color');
  editProfile = signal('Edit Profile');
  linkIcon = signal('link');
  linkWebsite = signal('Link');
  snackBar = inject(MatSnackBar);

  adminService = inject(AdminServices);

  // company details signals
  companyDetails = signal<EditAdminProfile | null>(null);
  externalLink = signal(this.companyDetails()?.companyWebsite || '');
  ngOnInit(): void {
    this.adminService.getCompanyDetailsByEmail().subscribe({
      next: (data) => {
        this.companyDetails.set(data.data);
        this.externalLink.set(data.data.companyWebsite || '');
        // console.log('Company data : ,', data.data);
      },
      error: (er) => {
        console.error('Error fetching company details:', er);
      },
    });
  }

  onWebsiteLinkClick() {
    if (this.externalLink()) {
      window.open(this.externalLink(), '_blank');
    } else {
      this.openSnackBarWarning('No website link available for this company.');
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

  openSnackBarWarning(message: string) {
    this.snackBar.openFromComponent(SnackBarSuccessComponent, {
      data: message,
      panelClass: 'snackbar-warning',
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
    });
  }
}
