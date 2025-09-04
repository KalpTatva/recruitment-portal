// loader.component.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SharedServices } from '../../../Service/shared.services';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  template: `
    @if(loaderService.loading()) {
      <div class="loader-overlay">
        <mat-spinner></mat-spinner>
      </div>
    }
  `,
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent {
  loaderService = inject(SharedServices);
}
