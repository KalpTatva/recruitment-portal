import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../header/navbar.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  selector: 'auth-layout',
  styleUrl: './auth.component.scss',
  template: `<div>
    <div class="container">
      <navbar class="navbar-container" />
    </div>
    <div>
      <router-outlet />
    </div>
    <div>
      <footer></footer>
    </div>
  </div>`,
})
export class AuthLayoutComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
