import { Component, inject, signal, WritableSignal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { AuthServices } from '../../features/auth/services/auth.services';
import { NameComponent } from '../../shared/ui/buttons/green-button/green.button';

@Component({
  selector: 'navbar',
  styleUrl: './navbar.component.scss',
  imports: [MatIconModule, NameComponent],
  template: `
    <div class="navbar">
      <div class="flex-box align-start banner" (click)="navigateToMain()">
        <mat-icon class="material-icons-outlined"> class </mat-icon>
        <h1 class="Banner-text">Job Portal</h1>
      </div>
      <div class="flex-box">
        <ul class="navbar-list">
          <li><a href="#">Home</a></li>
          <li><a href="#">Job</a></li>
          <li><a href="#">About Us</a></li>
          <li><a href="#">Contact Us</a></li>
        </ul>
      </div>
      <div class="flex-box buttons-links align-end">
        <select class="language-dropdown" (change)="changeLang($event)">
          <option class="" value="en">English</option>
          <option class="" value="guj">ગુજરાતી</option>
          <option class="" value="de">German</option>
          <option class="" value="fr">French</option>
        </select>
        @if(authBtnView()) {
        <a class="login-button" (click)="navigateToLogin()">Login</a>
        <green-button
          class="register-button"
          (click)="navigateToRegister()"
          [data]="register"
        />
        } @else if(userName().length > 0) {
        {{ userName() }}
        }
      </div>
    </div>
  `,
})
export class NavbarComponent {
  private router = inject(Router);
  private transloco = inject(TranslocoService);
  private authService = inject(AuthServices);

  authBtnView = signal(true);
  userName = signal('');
  register: WritableSignal<string> = signal('Register');
  constructor() {
    if (this.authService.isLoggedIn()) {
      this.authBtnView.set(false);
      this.userName.set(this.authService.getUserName() ?? '');
    }
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
  navigateToRegister() {
    this.router.navigate(['/register']);
  }
  navigateToMain() {
    this.router.navigate(['/']);
  }

  changeLang(lang: any) {
    this.transloco.setActiveLang(lang.target.value);
  }
}
