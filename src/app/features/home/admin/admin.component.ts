import { Component, OnInit } from '@angular/core';

@Component({
  standalone: true,
  imports: [],
  selector: 'admin',
  template: `
  <div>
    <h1>
        Admin portal
    </h1>
  </div>`,
})
export class AdminComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
