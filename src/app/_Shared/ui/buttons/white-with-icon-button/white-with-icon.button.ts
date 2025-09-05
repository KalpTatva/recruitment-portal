import { Component, Input, Signal } from '@angular/core';

@Component({
  standalone: true,
  imports: [],
  selector: 'white-with-icon-button',
  styles: `
    .edit-button {
      text-decoration: none;
      background-color: white;
      border:1px solid #d4d4d4;
      color: #575b65;
      font-weight: 600;
      padding: 5px 10px;
      border-radius: 25px ;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .edit-button span.material-icons-outlined {
      margin-right: 8px;
    }
  `,
  template: `
    <button class="edit-button" type="button">
      <span class="material-icons-outlined">{{ icon() }}</span>
      <span> {{ data() }} </span>
    </button>
  `,
})
export class WhiteWithIconButtonComponent {
  @Input() icon!: Signal<string>;
  @Input() data!: Signal<string>;
}
