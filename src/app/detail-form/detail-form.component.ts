import { ChangeDetectionStrategy, Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Item } from '../models/Item.model';
import { ListService } from '../services/lists.service';
import { FirestoreService } from '../services/firestore.service';

@Component({
  selector: 'detail-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './detail-form.component.html',
  styleUrl: './detail-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailFormComponent{
  @Output() close = new EventEmitter<null>();
  listService = inject(ListService);
  fireStoreService = inject(FirestoreService);
  fb = inject(FormBuilder);
  
  form = new FormGroup({
    'title': this.fb.control(null, Validators.required),
    'description': this.fb.control(null, Validators.required),
  })

  onSubmit(){
    if(!this.form.valid) return;

    const item: Item = {  
      title: this.form.value['title'],
      description: this.form.value['description'],
      type: 'todo',
    }
    
    this.fireStoreService.add$.next(item);
    this.close.emit();
  }
}
