import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button class="add-button">
      <img class="add-icon" src="/assets/icons/add.png"/>
    </button>  
  `,
  styleUrls: ['./add-button.component.scss']
})
export class AddButtonComponent {

}
