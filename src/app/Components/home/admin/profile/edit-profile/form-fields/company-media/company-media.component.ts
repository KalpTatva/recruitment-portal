import { Component, Input, OnInit } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
@Component({
  standalone: true,
  imports: [TranslocoModule, ReactiveFormsModule],
  selector: 'company-media',
  styleUrl: './company-media.component.scss',
  templateUrl: './company-media.component.html'
})

export class CompanyMediaComponent  {
  @Input()
  parent!: FormGroup;
}