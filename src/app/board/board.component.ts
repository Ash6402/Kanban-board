import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddButtonComponent } from '../shared/add-button/add-button.component';
import { CardComponent } from '../card/card.component';
import { ListService } from '../services/lists.service';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, AddButtonComponent, CardComponent],
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {
  listService = inject(ListService);

  drop(event){
    console.log(event);
  }

  drag(event: Event){
    event.preventDefault();
    console.log("Hello");
  }
}
