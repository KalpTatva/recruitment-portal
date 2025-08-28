import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedServices } from '../../Service/shared.services';

@Component({
  standalone: true,
  imports: [RouterModule],
  selector: 'side-bar',
  styleUrls: ['./sidebar.component.scss'],
  templateUrl: './sidebar.component.html'
})
export class SideBarComponent {
  public sharedService = inject(SharedServices);
}
