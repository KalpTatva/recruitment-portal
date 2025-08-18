import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'home-page',
  styleUrl: './homepage.component.scss',
  imports: [MatIconModule],
  template: `
    <div class="">
      Recently added jobs
    </div>
  `,
})
export class HomePageComponent {}
