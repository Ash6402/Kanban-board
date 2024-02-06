import { Component, DestroyRef, WritableSignal, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  RouterModule } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { catchError, of, single } from 'rxjs';
import { FirebaseError } from '@angular/fire/app';
import { LoaderComponent } from 'src/app/shared/loader.component';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, LoaderComponent],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})

export class ForgotPasswordComponent {
  authService = inject(AuthService);
  fb = inject(FormBuilder);
  destroyRef = inject(DestroyRef);
  error: WritableSignal<string> = signal(null);
  status: WritableSignal<'pending' | 'sending'| 'error' | 'sent'> = signal('pending');
  form = this.fb.group({
    'email': this.fb.control(null, [Validators.required, Validators.email]),
  })

  resetPass(){
    this.status.set('sending');
    this.authService.resetPassowrd(this.form.get('email').value)
    .pipe(
      catchError((err: FirebaseError) => {
        this.status.set('error');
        return of(this.error.set(err.code.split('/')[1].replace('-', ' ')))
      })
    ).subscribe(() => {
      this.status.set('sent');
    });
  }
}
