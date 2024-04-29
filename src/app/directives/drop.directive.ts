import { Directive,  HostListener, Renderer2, inject, input } from '@angular/core';
import { types } from '../models/Item.model';
import { FirestoreService } from '../services/firestore.service';
import { DragandDropService } from '../services/draganddrop.service';

@Directive({
  selector: '[appDrop]',
  standalone: true,
})
export class DropDirective {
  hovered = input.required<string>();
  ddService = inject(DragandDropService);
  firestoreService = inject(FirestoreService);
  renderer = inject(Renderer2);
  draggedItem = this.ddService.dragged;
  hoveredSection = this.ddService.hovered;

  @HostListener('dragover', ['$event']) dragOver(event: DragEvent){
    event.preventDefault();
    this.hoveredSection.set(this.hovered());
  }

  @HostListener('drop', ['$event']) drop(){
    if(!this.draggedItem()) return;
    this.draggedItem().type = this.hovered() as types; 
    this.firestoreService.updateLists$.next(this.draggedItem())
    this.draggedItem.set(null);
  }
  constructor() { }

}
