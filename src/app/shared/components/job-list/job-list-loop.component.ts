import {
  Component,
  Input,
  OnChanges,
  OnInit,
  signal,
  SimpleChanges,
  WritableSignal,
} from '@angular/core';
import { TagSuccessComponent } from '../../ui/tags/success-tags/success-tags.button';
import { NameComponent } from '../../ui/buttons/green-button/green.button';

@Component({
  standalone: true,
  imports: [TagSuccessComponent, NameComponent],
  selector: 'job-loop-list-component',
  styleUrl: './job-list-loop.component.scss',
  template: `
    <div class="job-listing">
      <div class="time-bookmark">
        <success-tags [message]="temptime" />
        <span class="material-icons-outlined bookmark"> bookmark_add </span>
      </div>
      <div class="">
        <div>
          <div class="job">
            <img
              src="/assets/images/logo.webp"
              alt=""
              height="100"
              width="100"
            />
            <div class="job-title">
              <h1>Forward Security Director</h1>
              <span>Bauch, Schuppe and Schulist Co</span>
            </div>
          </div>
          <div class="job-description">
            <div class="job-description-content">
              <div class="flex-box">
                <span class="material-icons-outlined"> business_center </span>
                <span> Hotel & Tourism</span>
              </div>
              <div class="flex-box">
                <span class="material-icons-outlined"> access_time </span>
                <span> Full Time</span>
              </div>
              <div class="flex-box">
                <span class="material-icons-outlined">
                  account_balance_wallet</span
                >
                <span>500000₹ to 700000₹</span>
              </div>
              <div class="flex-box">
                <span class="material-icons-outlined"> location_on </span>
                <span>Gujarat, India</span>
              </div>
            </div>
            <green-button [data]="jobDetails" />
          </div>
        </div>
      </div>
    </div>
  `,
})
export class JobListComponent implements OnInit, OnChanges {
  constructor() {}
  temptime: WritableSignal<string> = signal('10 min ago');
  jobDetails: WritableSignal<string> = signal('Job Details');
  ngOnInit() {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['job']) {
    }
  }
}
