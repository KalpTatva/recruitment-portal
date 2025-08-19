import { Component, OnInit } from '@angular/core';

@Component({
  standalone: true,
  imports: [],
  selector: 'unauthorized',
  template: `
  <div>
    <h1>ERROR 401 : Unauthorized</h1>
  </div>`,
})

export class UnauthorizedComponent implements OnInit {
  constructor() { }

  ngOnInit() { }
}