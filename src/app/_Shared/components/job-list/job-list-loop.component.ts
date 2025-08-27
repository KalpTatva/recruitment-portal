import {
  Component,
  Input,
  OnChanges,
  OnInit,
  signal,
  SimpleChanges,
  WritableSignal,
} from '@angular/core';
import { TagSuccessComponent } from '../../ui/tags/success-tags/success-tags.button';
import { NameComponent } from '../../ui/buttons/green-button/green.button';

@Component({
  standalone: true,
  imports: [TagSuccessComponent, NameComponent],
  selector: 'job-loop-list-component',
  styleUrl: './job-list-loop.component.scss',
  templateUrl: './job-list-loop.component.html'
})
export class JobListComponent implements OnInit, OnChanges {
  constructor() {}
  temptime: WritableSignal<string> = signal('10 min ago');
  jobDetails: WritableSignal<string> = signal('Job Details');
  ngOnInit() {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['job']) {
    }
  }
}
