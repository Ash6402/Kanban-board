import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDirective } from '../directives/drag.directive';
import { Item } from '../models/Item.model';
import { AnimateDirective } from '../directives/animate.directive';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, DragDirective, AnimateDirective],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() item: Item;
}
