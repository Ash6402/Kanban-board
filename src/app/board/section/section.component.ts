import { Component,  Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from 'src/app/card/card.component';
import { Item } from 'src/app/models/Item.model';
import { FirestoreService } from 'src/app/services/firestore.service';
import { LoaderComponent } from 'src/app/shared/loader.component';
import { animate, query, stagger, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-section',
  standalone: true,
  imports: [CommonModule, CardComponent, LoaderComponent],
  templateUrl: './section.component.html',
  styleUrl: './section.component.scss',
  animations: [
    trigger('itemEnter', [
      transition('* <=> *', [   
        query(':enter', [
          style({opacity: 0,}),
          stagger(30,[
            animate('120ms ease-in', style({opacity: 1,}))
          ])
        ])
      ])
    ])
  ]
})
export class SectionComponent {
  status = inject(FirestoreService).status;
  @Input({required: true}) title: string;
  @Input({required: true}) items: Item[];
}
