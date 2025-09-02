import {
  Component,
  Input,
  OnChanges,
  OnInit,
  Signal,
  signal,
  SimpleChanges,
  WritableSignal,
} from '@angular/core';
import { TagSuccessComponent } from '../../ui/tags/success-tags/success-tags.button';
import { NameComponent } from '../../ui/buttons/green-button/green.button';
import { JobListsInterface } from '../../../Interface/job-lists.interface';
import { formatDate } from '@angular/common';

@Component({
  standalone: true,
  imports: [TagSuccessComponent, NameComponent],
  selector: 'job-loop-list-component',
  styleUrl: './job-list-loop.component.scss',
  templateUrl: './job-list-loop.component.html',
})
export class JobListComponent implements OnInit, OnChanges {
  constructor() {}
  public API_URL = 'http://localhost:5146/api';
  temptime: WritableSignal<string> = signal('10 min ago');
  jobDetails: WritableSignal<string> = signal('Job Details');

  @Input() data: JobListsInterface | undefined;

  ngOnInit() {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      console.log('new value of data : ', this.data);
      const currentDate = formatDate(
        new Date(),
        'yyyy-MM-ddTHH:mm:ss.SS',
        'en-US'
      );
      console.log(currentDate, this.data?.createdAt);

      this.temptime.set(this.data?.createdAt ?? "");

    }
  }
}
