import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { JobListComponent } from '../../../shared/components/job-list/job-list-loop.component';

@Component({
  selector: 'home-page',
  styleUrl: './homepage.component.scss',
  imports: [MatIconModule, JobListComponent],
  template: `
    <div class="background-color">
      <div class="image-class"></div>
      <div class="main-banner">
        <div class="content">
          <h1>Find Your Dream Job Today!</h1>
          <p>Connecting Talent with Opportunity: Your Gateway to Career Success</p>
        </div>
      </div>
    </div>
    <div class="company-banner"></div>
    <div class="available-jobs">
      <div class="Jobs-banner align-start">
        <h1>Recent Jobs Available</h1>
        <p>Find jobs that match your expectations...</p>
      </div>
      <div class="align-end large-font">
        <a>View All</a>
      </div>
    </div>
    @for (jobs of jobs; track $index) {
    <job-loop-list-component class="available-jobs" />
    }
  `,
})
export class HomePageComponent {
  jobs = Array.from({ length: 5 });
}
