import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'navbar',
  styleUrl: './navbar.Component.scss',
  imports: [MatIconModule],
  template: `
    <div class="navbar">
      <mat-icon class="material-icons-outlined"> class </mat-icon>
      <h1>JobRecruitment</h1>
    </div>
  `,
})
export class NavbarComponent {}
