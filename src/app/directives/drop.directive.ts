import { Directive,  HostListener, Input, Renderer2, WritableSignal, inject } from '@angular/core';
import { Item, types } from '../models/Item.model';
import { ListService } from '../services/lists.service';

@Directive({
  selector: '[appDrop]',
  standalone: true,
})
export class DropDirective {
  @Input({required: true}) list: WritableSignal<Item[]>; 
  @Input({required: true}) hovered: string;
  listService = inject(ListService);
  renderer = inject(Renderer2);
  draggedItem = this.listService.dragged;
  sourceList = this.listService.source;
  hoveredSection = this.listService.hovered;

  @HostListener('dragover', ['$event']) dragOver(event){
    event.preventDefault();
    this.hoveredSection.set(this.hovered);
  }

  @HostListener('drop', ['$event']) drop(event){
    this.draggedItem().type = this.hovered as types; 
    this.sourceList().update((items: Item[]) => items.filter(item => item != this.draggedItem()))
    this.list.update((items: Item[]) => items ? [...items, this.draggedItem()] : [this.draggedItem()] ); 
  }
  constructor() { }

}
