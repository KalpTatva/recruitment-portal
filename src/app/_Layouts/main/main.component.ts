import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NavbarComponent } from '../header/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'main-page',
  styleUrl: './main.component.scss',
  imports: [MatIconModule, NavbarComponent, FooterComponent, RouterOutlet],
  templateUrl: './main.component.html'
})
export class MainComponent {}
