import { Component, OnInit, signal } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterModule],
  selector: 'nav',
  styleUrl: './nav.component.scss',
  templateUrl: './nav.component.html',
})
export class NavsComponent implements OnInit {
  currentBanner = signal('');

  ngOnInit(): void {
    this.handleBannerName(this.router.url.toString());
  }

  constructor(private router: Router) {
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        const currentPath = this.router.url.toString();
        this.handleBannerName(currentPath);
      }
    });
  }

  handleBannerName(currentPath: any) {
    console.log(currentPath);
    if (currentPath.includes('jobs')) {
      this.currentBanner.set('Jobs');
    } else if (currentPath.includes('AboutUs')) {
      this.currentBanner.set('About Us');
    } else if (currentPath.includes('contact-us')) {
      this.currentBanner.set('Contact Us');
    } else if (currentPath.includes('job-details')) {
      this.currentBanner.set("Job Details");
    }
  }
}
