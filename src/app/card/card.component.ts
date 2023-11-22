import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDirective } from '../directives/drag.directive';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, DragDirective],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() item: {text: string};
}
