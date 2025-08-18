import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NavbarComponent } from '../header/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'main-page',
  styleUrl: './main.component.scss',
  imports: [MatIconModule, NavbarComponent, FooterComponent, RouterOutlet],
  template: `
    <div>
      <div class="container">
        <navbar class="navbar-container" />
      </div>
      <div>
        <router-outlet />
      </div>
      <div>
        <footer></footer>
      </div>
    </div>
  `,
})
export class MainComponent {}
