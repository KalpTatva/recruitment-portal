import { Component, inject } from '@angular/core';
import { SideBarComponent } from '../../../../_Layouts/sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';
import { SharedServices } from '../../../../Service/shared.services';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [SideBarComponent, RouterOutlet, CommonModule],
  selector: 'admin',
  styleUrls: ['./admin.component.scss'],
  templateUrl: './admin.component.html',
})
export class AdminComponent {
  public sharedService = inject(SharedServices);

  isOpen = false;

  toggleSidebar() {
    this.isOpen = !this.isOpen;
  }
}
