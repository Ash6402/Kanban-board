import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDirective } from '../directives/drag.directive';
import { Item } from '../models/Item.model';
import { AnimateDirective } from '../directives/animate.directive';
import { DetailFormComponent } from '../detail-form/detail-form.component';
import { DialogService } from '../services/dialog.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, DragDirective, AnimateDirective, DetailFormComponent],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input({required: true}) item: Item;
  dialogService = inject(DialogService);
}
