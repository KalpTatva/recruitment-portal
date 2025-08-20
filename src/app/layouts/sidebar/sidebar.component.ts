import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterModule],
  selector: 'side-bar',
  styleUrls: ['./sidebar.component.scss'],
  template: ` <aside>
    <div class="sidebar-content">
      <ul class="sidebar-list">
        <li
          routerLinkActive="active"
          [routerLinkActiveOptions]="{ exact: true }"
          [routerLink]="['/admin/']"
        >
          profile
        </li>
        <li routerLinkActive="active">Jobs</li>
        <li routerLinkActive="active" [routerLink]="['/admin/add-job/']">
          Add Jobs
        </li>
        <li routerLinkActive="active">Settings</li>
      </ul>
    </div>
  </aside>`,
})
export class SideBarComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
