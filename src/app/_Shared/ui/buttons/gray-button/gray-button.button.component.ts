import { Component, Input, OnInit, Signal, signal } from '@angular/core';

@Component({
  standalone: true,
  imports: [],
  selector: 'gray-button',
  styleUrl: './gray-button.button.component.scss',
  template: `
    <button class="gray-button">
      <span class="material-icons-outlined">{{ icon() }}</span>
      <!-- <span> {{ data() }} </span> -->
    </button>
  `,
})
export class GrayButtonComponent {
  @Input() icon!: Signal<string>;
  // @Input() data!: Signal<string>;
}
