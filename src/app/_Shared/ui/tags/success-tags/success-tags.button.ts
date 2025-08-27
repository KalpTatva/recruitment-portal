import { Component, Input, Signal } from '@angular/core';

@Component({
  standalone: true,
  imports: [],
  selector: 'success-tags',
  styles:  `
  .tags {
    background-color: #EAF4F3;
    color: #309689;
    padding: 4px 10px;
    border-radius: 7px;
    font-weight: 600;

  }
  `,
  template: ` <span class="tags">{{message()}}</span> `,
})
export class TagSuccessComponent{
  constructor() {}
  @Input() message!: Signal<string>;
}
