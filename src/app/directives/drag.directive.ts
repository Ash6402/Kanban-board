import { Directive, ElementRef, OnInit, Renderer2, inject } from '@angular/core';

@Directive({
  selector: '[appDrag]',
  standalone: true
})
export class DragDirective implements OnInit {
  
  renderer = inject(Renderer2);
  el = inject(ElementRef);
  
  ngOnInit(): void {
    this.renderer.setAttribute(this.el.nativeElement, 'draggable', 'true');
  }
  

}
