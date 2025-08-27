import { Component, Input, OnInit, signal } from '@angular/core';

@Component({
  standalone: true,
  imports: [],
  selector: 'red-button',
  styles: `
  .red-button {
    height: 100%;
    width: 100%;
    background-color: red;
    text-decoration: none;
    color: white;
    border: none;
    font-weight: 600;
    padding: 10px 15px;
    border-radius: 7px;
    cursor: pointer;
  }`,
  template: `
    <button type="button" class="red-button">
      {{ data() }}
    </button>
  `,
})
export class RedButtonComponent {
  @Input() data = signal('');
}
