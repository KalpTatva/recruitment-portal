import { Component, OnInit, signal } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';
import { WhiteWithIconButtonComponent } from '../../../../../shared/ui/buttons/white-with-icon-button/white-with-icon.button';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [TranslocoModule, WhiteWithIconButtonComponent, RouterModule],
  selector: 'profile-view',
  styleUrls: ['./profile-view.component.scss'],
  template: `
    <div class="profile-header">
      <h1 class="login-title">{{ 'COMPANY_PROFILE' | transloco }}</h1>
      <span class="header-links">
        <white-with-icon-button
          [data]="editProfile"
          [icon]="editIcon"
          [routerLink]="['/admin/edit-company-profile']"
        />
        <white-with-icon-button [icon]="linkIcon" [data]="linkWebsite" />
      </span>
    </div>

    <!-- profile view -->
    <div class="profile-card">
      <div class="card-image">
        <img class="image" src="/assets/images/logo.webp" alt="" />
        <div class="skills-list"></div>
      </div>
      <div class="card-data">
        <div class="card-title">
          <h1>Tatvasoft</h1>
          <span>location</span>
        </div>
        <div class="card-sub-title">
          <span>we provides best software solutions</span>
        </div>
        <!-- future reviews -->
        <div class="reviews"></div>
        <!-- about -->
        <div class="company-about"></div>
      </div>
    </div>
  `,
})
export class CompanyProfileViewComponent {
  editIcon = signal('border_color');
  editProfile = signal('Edit Profile');
  linkIcon = signal('link');
  linkWebsite = signal('Link');
}
