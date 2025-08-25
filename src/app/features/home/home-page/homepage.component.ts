import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { JobListComponent } from '../../../shared/components/job-list/job-list-loop.component';

@Component({
  selector: 'home-page',
  styleUrl: './homepage.component.scss',
  imports: [MatIconModule, JobListComponent],
  templateUrl: './homepage.component.html'
})
export class HomePageComponent {
  jobs = Array.from({ length: 5 });
}
