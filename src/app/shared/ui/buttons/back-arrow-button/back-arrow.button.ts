import { Component, OnInit } from '@angular/core';

@Component({
  standalone: true,
  imports: [],
  selector: 'back-arrow-button',
  styleUrls: ['./black-arrow-button.scss'],
  template: `
    <button class="back-arrow-button">
      <i class="material-icons">arrow_back</i>
    </button>
  `,
})
export class BackArrowButtonComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
