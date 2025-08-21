import { Component, Input, OnInit, signal } from '@angular/core';

@Component({
  standalone: true,
  imports: [],
  selector: 'blue-button',
  styles: `
  .blue-button {
    background-color: #007bff;
    width: 100%;
    text-decoration: none;
    color: white;
    border: none;
    font-weight: 600;
    padding: 10px 15px;
    border-radius: 7px;
    cursor: pointer;
  }`,
  template: `
    <button class="blue-button">
      {{ data() }}
    </button>
  `,
})
export class BlueButtonComponent {
  @Input() data = signal('');
}
