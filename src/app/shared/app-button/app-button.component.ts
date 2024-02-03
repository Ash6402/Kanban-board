import { AfterViewChecked, AfterViewInit, Component, ElementRef, Input, Renderer2, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button class="app-button" #button>
      <ng-content></ng-content>
    </button>  
  `,
  styleUrls: ['./app-button.component.scss']
})
export class AppButtonComponent implements AfterViewInit {
  @ViewChild('button') button: ElementRef<HTMLButtonElement>;
  @Input({required: true}) color: string;
  renderer = inject(Renderer2);
  
  ngAfterViewInit(): void {
    this.renderer.addClass(this.button.nativeElement, this.color);
  }

}
