import { Injectable, WritableSignal, inject, signal } from '@angular/core';
import { Auth, User, UserCredential, authState, createUserWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, sendSignInLinkToEmail, signInWithEmailAndPassword, signInWithEmailLink, updateProfile, user, } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { from, switchMap, tap } from 'rxjs';
import { FirestoreService } from './firestore.service';
import { Router } from '@angular/router';

interface Credentials{
  username?: string,
  email: string,
  password: string,
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  firestore = inject(Firestore);
  firestoreService = inject(FirestoreService);
  router = inject(Router);
  auth = inject(Auth);
  authState$ = authState(this.auth);
  userSignal: WritableSignal<User> = signal(null);
  
  constructor() {
    this.authState$.subscribe({
      next: (user: User | null) => {
        if(user){
          this.userSignal.set(user);
          this.router.navigate(['/board']);
        }else{
          this.userSignal.set(null);
          this.router.navigate(['/login']);
        } 
      }}
    )    
    
  }

  login(credentials: Credentials){
    return from(
      signInWithEmailAndPassword(this.auth, credentials.email, credentials.password)
    )
  }

  signup(credentials: Credentials) {
    return from(
      createUserWithEmailAndPassword(this.auth, credentials.email, credentials.password)
    ).pipe(
      tap((userCredentails: UserCredential) => sendEmailVerification(userCredentails.user)),
      switchMap((UserCredential: UserCredential) => {
        updateProfile(UserCredential.user, {displayName: credentials.username})
        return this.firestoreService.addNewUser({
          userId: UserCredential.user.uid,
        })
      }),
    )
  }

  resetPassowrd(email: string){
    return  from(sendPasswordResetEmail(this.auth, email))
  }
  
  signOut(){
    return from(this.auth.signOut());
  }

  get user(){
    return this.userSignal.asReadonly();
  }

}