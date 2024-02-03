import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppButtonComponent } from '../shared/app-button/app-button.component';

@Component({
  selector: 'app-sign-out-modal',
  standalone: true,
  imports: [CommonModule, AppButtonComponent],
  templateUrl: './sign-out-modal.component.html',
  styleUrl: './sign-out-modal.component.scss'
})
export class SignOutModalComponent {
  @Output() confirm = new EventEmitter<boolean>();

  confirmFn(choice: boolean){
    this.confirm.emit(choice);
  }
}
