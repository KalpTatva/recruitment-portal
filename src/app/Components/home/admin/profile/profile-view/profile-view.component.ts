import { Component, inject, OnInit, signal } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';
import { WhiteWithIconButtonComponent } from '../../../../../_Shared/ui/buttons/white-with-icon-button/white-with-icon.button';
import { RouterModule } from '@angular/router';
import { AdminServices } from '../../../../../Service/admin.services';
import { EditAdminProfile } from '../../../../../Interface/admin.interface';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarSuccessComponent } from '../../../../../_Shared/components/snackbarSuccess/snackbar.success';
import { MatTabsModule } from '@angular/material/tabs';
import { ProfileCardComponent } from "../../../../../_Shared/components/profile-card/profile-card.component";
import { single } from 'rxjs';
@Component({
  standalone: true,
  imports: [
    TranslocoModule,
    WhiteWithIconButtonComponent,
    RouterModule,
    CommonModule,
    MatTabsModule,
    ProfileCardComponent
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

  // external + media links
  externalLink = signal(this.companyDetails()?.companyWebsite || '');
  facebookLink = signal(this.companyDetails()?.facebook || '');
  TwitterLink = signal(this.companyDetails()?.twitter || '');
  MediumLink = signal(this.companyDetails()?.medium || '');
  LinkedInLink = signal(this.companyDetails()?.linkedIn || '');

  // colors
  redColor = signal('#dd4d37');
  orangeColor = signal('#06a717');
  violetColor = signal('#533cd9');
  blueColor = signal('#4795bc');
  greenColor = signal('#b0ac1d');
  yellowColor = signal('#dec463');

  // data labels
  revenueLabel = signal('Recurring Revenue ($)');
  totalempLabel = signal('Total Employees');
  emailLabel = signal("Email");
  countryCodeLabel = signal("Dial Code");
  PhoneLabel = signal("Phone");

  // data for components
  revenue = signal('');
  totalEmp = signal('');
  email = signal('');
  countryCode = signal('');
  phone = signal('');

  // icon classes
  revenueIcon = signal('monetization_on');
  peopleIcon = signal('people');
  emailIcon = signal('email');
  countryCodeIcon = signal('phone');
  phoneIcon = signal('phone_android');

  ngOnInit(): void {
    this.adminService.getCompanyDetailsByEmail().subscribe({
      next: (data) => {
        console.log(data.data);
        this.companyDetails.set(data.data);
        this.externalLink.set(data.data.companyWebsite || '');
        this.facebookLink.set(data.data.facebook || '');
        this.TwitterLink.set(data.data.twitter || '');
        this.MediumLink.set(data.data.medium || '');
        this.LinkedInLink.set(data.data.linkedIn || '');

        this.revenue.set(data.data.totalRevenue);
        this.totalEmp.set(data.data.totalEmployees);
        this.email.set(data.data.email);
        this.countryCode.set(data.data.countryCode);
        this.phone.set(data.data.phone);
        // console.log('Company data : ,', data.data);
      },
      error: (er) => {
        console.error('Error fetching company details:', er);
      },
    });
  }

  onWebsiteLinkClick() {
    if (this.externalLink()) {
      window.open(this.facebookLink(), '_blank');
    } else {
      this.openSnackBarWarning('No website link available for this company.');
    }
  }


  // links handler
  HandleFacbookLink(){
    if (this.facebookLink()) {
      window.open(this.facebookLink(), '_blank');
    } else {
      this.openSnackBarWarning('No facebook link available for this company.');
    }
  }
  HandleLinkedIn() {
    if (this.LinkedInLink()) {
      window.open(this.LinkedInLink(), '_blank');
    } else {
      this.openSnackBarWarning('No LinkedIn link available for this company.');
    }
  }
  HandleMedium() {
    if (this.MediumLink()) {
      window.open(this.MediumLink(), '_blank');
    } else {
      this.openSnackBarWarning('No Medium link available for this company.');
    }
  }
  HandleTwitter() {
    if (this.TwitterLink()) {
      window.open(this.TwitterLink(), '_blank');
    } else {
      this.openSnackBarWarning('No Twitter link available for this company.');
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
