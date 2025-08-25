import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'footer',
  styleUrl: './footer.component.scss',
  imports: [CommonModule],
  templateUrl: './footer.component.html'
})
export class FooterComponent {
  today = signal(new Date());
}
