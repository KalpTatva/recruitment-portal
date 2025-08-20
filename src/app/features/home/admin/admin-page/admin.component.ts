import { Component, OnInit } from '@angular/core';
import { SideBarComponent } from '../../../../layouts/sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  imports: [SideBarComponent, RouterOutlet],
  selector: 'admin',
  styleUrls: ['./admin.component.scss'],
  template: ` <div class="admin-layout">
    <aside class="sidebar">
      <side-bar></side-bar>
    </aside>

    <main class="content">
      <router-outlet></router-outlet>
    </main>
  </div>`,
})
export class AdminComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
