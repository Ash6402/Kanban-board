import { AfterViewInit, Component, ElementRef, Input, Renderer2, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="loader" #loader></div>
  `,
  styles: ` 
  .loader {
  width: 80px;
  aspect-ratio: 1;
  border-radius: 50%;
  border: 8px solid #0000;
  position: relative;
  animation: l24 1s infinite linear;
}
.loader:before,
.loader:after {
  content: "";
  position: absolute;
  inset: -8px;
  border-radius: 50%;
  border: inherit;
  animation: inherit;
  animation-duration: 2s;
}
.loader:after {
  animation-duration: 4s;
}
@keyframes l24 {
  100% {transform: rotate(1turn)}
}

.small{
  width: 10px;
  border: 2px solid #0000;
}

.medium{
  width: 50px;
  border: 5px solid #0000;
}

.large{
  width: 80px;
  border: 8px solid #0000;
}
  `
})
export class LoaderComponent implements AfterViewInit {
  @Input() color: string;
  @Input({required: true}) size: string;
  renderer = inject(Renderer2);  
  @ViewChild('loader') loader: ElementRef;

  ngAfterViewInit(): void {
    this.renderer.setStyle(this.loader.nativeElement, 'borderRightColor', this.color ?? '#2d3250');
    this.renderer.addClass(this.loader.nativeElement, this.size);
  }

}
