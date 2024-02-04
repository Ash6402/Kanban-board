import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDirective } from '../directives/drag.directive';
import { Item } from '../models/Item.model';
import { AnimateDirective } from '../directives/animate.directive';
import { DetailFormComponent } from '../detail-form/detail-form.component';
import { DialogService } from '../services/dialog.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { AppButtonComponent } from '../shared/app-button/app-button.component';
import { FirestoreService } from '../services/firestore.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, DragDirective, AnimateDirective, DetailFormComponent, AppButtonComponent],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  animations: [
    trigger('choiceTrigger',[
      transition(':enter', [
        style({right: '-10%'}),
        animate('80ms ease-in', style({right: 0})),
      ]),
      transition(':leave', [
        animate('50ms', style({opacity: 0}))
      ])
    ])
  ]
})
export class CardComponent {
  @Input({required: true}) item: Item;
  private firestoreService = inject(FirestoreService);
  dialogService = inject(DialogService);
  confirmChoice: boolean = false;

  delete(){
    this.firestoreService.delete$.next(this.item);
  }
}
