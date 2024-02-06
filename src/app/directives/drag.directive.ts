import { Directive, ElementRef, HostListener, Input, OnInit, Renderer2, inject } from '@angular/core';
import { Item } from '../models/Item.model';
import { ListService } from '../services/lists.service'

@Directive({
  selector: '[appDrag]',
  standalone: true
})
export class DragDirective implements OnInit {

  renderer = inject(Renderer2);
  el = inject(ElementRef);
  offsetX: number;
  offsetY: number;
  width: number;
  @Input({required: true}) item: Item;
  draggedItem = inject(ListService).dragged;

  

  @HostListener('dragstart', ['$event']) dragStart(event: DragEvent){
    this.renderer.setStyle(event.target, 'transition', 'none'); 
    this.draggedItem.set(this.item);
  }

  @HostListener('mousedown', ['$event']) mouseDown(event: MouseEvent){
    // console.log(event);
    // this.offsetX = event.offsetX;
    // this.offsetY = event.offsetY;
    // this.width = (<HTMLElement>event.target).clientWidth;
  }

  @HostListener('drag', ['$event']) drag(event: DragEvent){
    // console.log(event);
    // this.renderer.setStyle(this.el.nativeElement, 'width', `${this.width}px`);
    // this.renderer.setStyle(this.el.nativeElement, 'position', 'absolute');
    // this.renderer.setStyle(this.el.nativeElement, 'left', `${event.clientX - this.offsetX}px`);
    // this.renderer.setStyle(this.el.nativeElement, 'top', `${event.clientY - this.offsetY}px`);
  } 

  @HostListener('dragend', ['$event']) dragEnd(event: DragEvent){
    // this.renderer.setStyle(this.el.nativeElement, 'position', 'relative');
    // this.renderer.setStyle(this.el.nativeElement, 'top', '0px');
    // this.renderer.setStyle(this.el.nativeElement, 'left', '0px');
  }

  ngOnInit(): void {
    this.renderer.setAttribute(this.el.nativeElement, 'draggable', 'true');
  }

}
