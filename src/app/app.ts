import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoaderComponent } from './_Shared/components/loaders/loader.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoaderComponent],
  template: `
    <app-loader></app-loader>
    <router-outlet />
  `,
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('recruitment-portal');
}
