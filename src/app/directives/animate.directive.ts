import { Directive, ElementRef, HostListener, Input, Renderer2, inject } from '@angular/core';

@Directive({
  selector: '[appAnimate]',
  standalone: true
})
export class AnimateDirective {

  constructor() { }
  el: HTMLElement = inject(ElementRef).nativeElement;
  @Input({required: true}) appAnimate: string[];
  @Input() element: ElementRef;
  renderer = inject(Renderer2);

  @HostListener('click') click(){
    if(!this.el.classList.contains(this.appAnimate[0])){
      this.renderer.addClass(this.el, this.appAnimate[0]);
      this.renderer.addClass(this.element, this.appAnimate[1]);
    }else{
      this.renderer.removeClass(this.el, this.appAnimate[0]); 
      this.renderer.removeClass(this.element, this.appAnimate[1]);
    }
  }

}
