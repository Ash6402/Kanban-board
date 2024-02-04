import { Routes } from '@angular/router';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { LoginComponent } from './auth/login/login.component';
import { BoardComponent } from './board/board.component';
import { canActivateFn } from './guards/auth.guard';

export const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'sign-up', component: SignUpComponent, data: { animation: 'signUp' }},
    {path: 'login', component: LoginComponent, data: { animation: 'login' }},
    {path: 'board', component: BoardComponent, canActivate: [canActivateFn], data: { animation: 'board' }},
];
