import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppButtonComponent } from '../shared/app-button/app-button.component';
import { Subject, switchMap, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { SignOutModalComponent } from '../sign-out-modal/sign-out-modal.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, AppButtonComponent, SignOutModalComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  authService = inject(AuthService);
  signOut = new Subject<null>();
  router = inject(Router);
  confirmSignOut: boolean = false;

  constructor(){
    this.signOut.pipe(
      takeUntilDestroyed(),
      switchMap(() => this.authService.signOut()),
      tap(() => this.confirmSignOut = false),
    ).subscribe({
      next: () => this.router.navigate(['/login'])
    })
  }

  signOutFn(choice: boolean){
    choice ? this.signOut.next(null) : this.confirmSignOut = false;
  }
}
