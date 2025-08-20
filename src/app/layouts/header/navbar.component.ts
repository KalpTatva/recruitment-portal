import { Component, inject, signal, WritableSignal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { AuthServices } from '../../features/auth/services/auth.services';
import { NameComponent } from '../../shared/ui/buttons/green-button/green.button';
import { RedButtonComponent } from '../../shared/ui/buttons/red-button/red.button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarSuccessComponent } from '../../shared/components/snackbarSuccess/snackbar.success';

@Component({
  selector: 'navbar',
  styleUrl: './navbar.component.scss',
  imports: [MatIconModule, NameComponent, RedButtonComponent],
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
        <span (click)="handleUserProfileNavigation()">
          {{ userName() }}
        </span>
        <red-button [data]="logOut" (click)="handleLogout()" />
        }
      </div>
    </div>
  `,
})
export class NavbarComponent {
  private router = inject(Router);
  private transloco = inject(TranslocoService);
  private authService = inject(AuthServices);
  private snackBar = inject(MatSnackBar);

  authBtnView = signal(true);
  userName = signal('');
  logOut: WritableSignal<string> = signal('Logout');
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
  handleUserProfileNavigation() {
    if (this.authService.isLoggedIn()) {
      const role = this.authService.getRole();
      if (role === 'Admin') {
        this.router.navigate(['/admin']);
      } else if (role === 'Candidate') {
        this.router.navigate(['/user']);
      } else if (role === 'Interviewer') {
        this.router.navigate(['/interviewer']);
      }
    }
  }

  changeLang(lang: any) {
    this.transloco.setActiveLang(lang.target.value);
  }

  handleLogout() {
    this.authService.logout();
    this.authBtnView.set(true);
    this.userName.set('');
    this.router.navigate(['/login']);
    this.openSnackBarSuccess('Logout Successfully!');
  }

  // snackbars
  openSnackBarSuccess(message: string) {
    this.snackBar.openFromComponent(SnackBarSuccessComponent, {
      data: message,
      panelClass: 'snackbar-success',
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
    });
  }

  openSnackBarError(message: string) {
    this.snackBar.openFromComponent(SnackBarSuccessComponent, {
      data: message,
      panelClass: 'snackbar-error',
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
    });
  }
}
