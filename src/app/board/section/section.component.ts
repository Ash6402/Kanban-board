import { Component, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from 'src/app/card/card.component';
import { FirestoreService } from 'src/app/services/firestore.service';
import { LoaderComponent } from 'src/app/shared/loader.component';
import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { Item } from 'src/app/models/Item.model';

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
        ], {optional: true}),
      ])
    ])
  ]
})
export class SectionComponent {
  status = inject(FirestoreService).status;
  title = input.required<string>();
  items = input.required<Item[]>();
}
