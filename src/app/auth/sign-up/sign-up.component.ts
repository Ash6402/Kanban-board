import { ChangeDetectionStrategy, Component, DestroyRef, ElementRef, Renderer2, ViewChild, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { AuthService } from 'src/app/services/auth.service';
import { confirmPass } from 'src/app/validators/validators';
import { LoaderComponent } from 'src/app/shared/loader.component';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, LoaderComponent],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpComponent {
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  destroyRef = inject(DestroyRef);
  signingUp = false;
  error = signal(null);
  renderer = inject(Renderer2); 
  router = inject(Router); 

  form = new FormGroup({
    "username": this.fb.control(null, [Validators.required, Validators.minLength(3)]),
    "email": this.fb.control(null, [Validators.required, Validators.email]),
    "password": this.fb.control(null, [Validators.required, Validators.minLength(8)]),
    "confirm-pass": this.fb.control(null, Validators.required),
  }, {validators: confirmPass})

  submit(form: FormGroup): void {
    this.signingUp = true;
    const email = this.form.get('email').value;
    const password = this.form.get('password').value;
    const username = this.form.get('username').value;
    this.authService.signup({username, email, password})
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe({
      next: () => {
        this.signingUp = false;
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.signingUp = false;
        this.error.set(err);
        console.log(err);
      }
    });
  }
}

