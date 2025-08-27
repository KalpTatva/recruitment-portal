import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'snack-bar-component-example-snack',
  styleUrl: './snackbar.success.scss',
  template: ` <span class="snackbar-success ">
    {{ data }}
  </span>`,
})
export class SnackBarSuccessComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: string) {}
}
