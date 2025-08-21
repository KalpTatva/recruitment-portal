import { Component, OnInit } from '@angular/core';

@Component({
  standalone: true,
  imports: [],
  selector: 'back-arrow-button',
  styles: `
    .back-arrow-button {
      text-decoration: none;
      background-color:rgba(255, 255, 255, 0.48);
      color: black;
      border: none;
      font-weight: 600;
      padding: 5px 10px;
      border-radius: 30px;
      cursor: pointer;
      position: absolute;
      top: 20px;
      left: 40px;
    }
  `,
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
