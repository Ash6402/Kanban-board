import { Component,  Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from 'src/app/card/card.component';
import { Item } from 'src/app/models/Item.model';
import { Observable } from 'rxjs';
import { FirestoreService } from 'src/app/services/firestore.service';
import { LoaderComponent } from 'src/app/shared/loader.component';

@Component({
  selector: 'app-section',
  standalone: true,
  imports: [CommonModule, CardComponent, LoaderComponent],
  templateUrl: './section.component.html',
  styleUrl: './section.component.scss'
})
export class SectionComponent {
  status = inject(FirestoreService).status;
  @Input({required: true}) title: string;
  @Input({required: true}) items: Item[];
}
