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
import { GreenButtonComponent } from '../../ui/buttons/green-button/green.button';
import { JobListsInterface } from '../../../Interface/jobs.interface';

@Component({
  standalone: true,
  imports: [TagSuccessComponent, GreenButtonComponent],
  selector: 'job-loop-list-component',
  styleUrl: './job-list-loop.component.scss',
  templateUrl: './job-list-loop.component.html',
})
export class JobListComponent implements OnInit, OnChanges {
  constructor() {}
  temptime: WritableSignal<string> = signal('10 min ago');
  jobDetails: WritableSignal<string> = signal('Job Details');

  @Input() data: JobListsInterface | undefined;

  ngOnInit() {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.temptime.set(this.data?.createdAt ?? "");
    }
  }
}
