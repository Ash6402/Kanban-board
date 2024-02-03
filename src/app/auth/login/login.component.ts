import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthService } from 'src/app/services/auth.service';
import { LoaderComponent } from 'src/app/shared/loader.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, LoaderComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  fb = inject(FormBuilder);
  router = inject(Router);
  authService = inject(AuthService);
  error = signal<ValidationErrors>(null);
  destroyRef = inject(DestroyRef);
  cdr = inject(ChangeDetectorRef);
  loggingIn = false;
  form = this.fb.group({
    'email': this.fb.control(null, Validators.required),
    'password': this.fb.control(null, Validators.required),
  })

  submit(form){
    this.loggingIn = true;
    const email = form.get('email').value;
    const password = form.get('password').value;
    this.authService.login({email, password})    
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe({
      next: () => {
        this.loggingIn = false;
        this.router.navigate(['/board']);
      },
      error: (err) => {
        this.loggingIn = false;
        this.error.set(err);
      }
    });
  }
}
