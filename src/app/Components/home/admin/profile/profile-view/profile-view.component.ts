import { Component, inject, OnInit, Signal, signal } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';
import { WhiteWithIconButtonComponent } from '../../../../../_Shared/ui/buttons/white-with-icon-button/white-with-icon.button';
import { RouterModule } from '@angular/router';
import { AdminServices } from '../../../../../Service/admin.services';
import {
  CompanyProfile,
  EditAdminProfile,
} from '../../../../../Interface/admin.interface';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarSuccessComponent } from '../../../../../_Shared/components/snackbarSuccess/snackbar.success';
import { MatTabsModule } from '@angular/material/tabs';
import { ProfileCardComponent } from '../../../../../_Shared/components/profile-card/profile-card.component';
import { single } from 'rxjs';
@Component({
  standalone: true,
  imports: [
    TranslocoModule,
    WhiteWithIconButtonComponent,
    RouterModule,
    CommonModule,
    MatTabsModule,
    ProfileCardComponent,
  ],
  selector: 'profile-view',
  styleUrls: ['./profile-view.component.scss'],
  templateUrl: './profile-view.component.html',
})
export class CompanyProfileViewComponent implements OnInit {
  editIcon = signal('border_color');
  editProfile = signal('Edit Profile');
  linkIcon = signal('link');
  linkWebsite = signal('Link');
  snackBar = inject(MatSnackBar);

  adminService = inject(AdminServices);

  // company details signals
  companyDetails = signal<CompanyProfile | null>(null);

  // external + media links
  externalLink = signal(this.companyDetails()?.companyWebsite || '');
  facebookLink = signal(this.companyDetails()?.facebook || '');
  TwitterLink = signal(this.companyDetails()?.twitter || '');
  MediumLink = signal(this.companyDetails()?.medium || '');
  LinkedInLink = signal(this.companyDetails()?.linkedIn || '');

  // percentage of genders in company
  malePercent = signal(0);
  femalePercent = signal(0);
  otherPercent = signal(0);

  // colors
  redColor = signal('#dd4d37');
  orangeColor = signal('#da9a46');
  violetColor = signal('#533cd9');
  blueColor = signal('#4795bc');
  greenColor = signal('#06a717');
  yellowColor = signal('#dec463');

  // data labels
  revenueLabel = signal('Recurring Revenue ($)');
  totalempLabel = signal('Total Employees');
  emailLabel = signal('Email');
  countryCodeLabel = signal('Dial Code');
  PhoneLabel = signal('Phone');

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

  // image handler
  selectedFile?: File;
  uploadedImageUrl = signal('');

  ngOnInit(): void {
    this.adminService.getCompanyProfileDetailsByEmail().subscribe({
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

        this.malePercent.set(data.data.percentMale);
        this.femalePercent.set(data.data.percentFemale);
        this.otherPercent.set(data.data.percentOther);

        this.uploadedImageUrl.set(data.data.imageUrl);
        console.log('Company data : ,', data.data.imageUrl);
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
  HandleFacbookLink() {
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

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];

      // show preview immediately
      const reader = new FileReader();
      reader.onload = () => {
        this.uploadedImageUrl.set(reader.result as string);
      };
      reader.readAsDataURL(this.selectedFile);
      // directly upload it
      this.upload();
    }
  }

  upload() {
    if (!this.selectedFile) return;
    this.adminService.uploadImage(this.selectedFile).subscribe({
      next: (res) => {
        this.uploadedImageUrl.set(res.data);
        console.log(res.data);
      },
    });
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
