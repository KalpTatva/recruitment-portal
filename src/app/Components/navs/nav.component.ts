import { Component, OnInit } from '@angular/core';
import { RouterModule } from "@angular/router";

@Component({
  standalone: true,
  imports: [RouterModule],
  selector: 'nav',
  styleUrl: './nav.component.scss',
  templateUrl: './nav.component.html'
})

export class navsComponent implements OnInit {
  constructor() { }

  ngOnInit() { }
}