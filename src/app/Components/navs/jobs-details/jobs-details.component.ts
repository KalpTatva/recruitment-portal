import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobsServices } from '../../../Service/jobs.services';
import { JobDetailInterface } from '../../../Interface/jobs.interface';
import { TagSuccessComponent } from "../../../_Shared/ui/tags/success-tags/success-tags.button";

@Component({
  standalone: true,
  imports: [CommonModule, TagSuccessComponent],
  selector: 'job-details',
  templateUrl: './jobs-details.component.html',
  styleUrl: './jobs-details.component.scss'
})

export class JobDetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private jobService = inject(JobsServices);
  temptime: WritableSignal<string> = signal('10 min ago');
  data = signal<JobDetailInterface | null>(null);
  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    console.log(id);

    this.jobService.getJobDetails(id).subscribe({
      next : (res) => {
        console.log(res);
        this.data.set(res.data);
        this.temptime.set(res.data.createdAt);
        console.log(this.data);
      },
      error : (err) => {
        console.log(err.error);
      }
    })
  }

}