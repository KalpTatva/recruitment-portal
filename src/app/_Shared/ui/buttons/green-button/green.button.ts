import { Component, Input, input, OnInit, Signal } from '@angular/core';

@Component({
  standalone: true,
  imports: [],
  selector: 'green-button',
  styles: `
  .register-button {
  width: 100%;
  text-decoration: none;
  background-color: #309689;
  color: white;
  border: none;
  font-weight: 600;
  padding: 10px 15px;
  border-radius: 7px;
  cursor: pointer;
}
`,
  template: ` <button class="register-button">{{ data() }}</button>`,
})
export class NameComponent {
  @Input() data!: Signal<string>;
}
