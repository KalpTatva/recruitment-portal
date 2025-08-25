import { Component, OnInit } from '@angular/core';
import { SideBarComponent } from '../../../../layouts/sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  imports: [SideBarComponent, RouterOutlet],
  selector: 'admin',
  styleUrls: ['./admin.component.scss'],
  templateUrl: './admin.component.html',
})
export class AdminComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
