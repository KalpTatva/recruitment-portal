import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'footer',
  styleUrl: './footer.component.scss',
  imports: [CommonModule],
  template: `
    <div class="footer">
      <h4>@Copy-rights {{ today() | date : 'yyyy-MM-dd' }}</h4>
    </div>
  `,
})
export class FooterComponent {
  today = signal(new Date());
}
