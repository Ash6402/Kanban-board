import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Item } from '../models/Item.model';
import { ListService } from '../services/lists.service';
import { FirestoreService } from '../services/firestore.service';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'detail-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './detail-form.component.html',
  styleUrl: './detail-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('enterTrigger', [
      transition(':enter', [
        style({opacity: 0}),
        animate('100ms', style({opacity: 1}))
      ])
    ])
  ]
})
export class DetailFormComponent implements OnInit{
  @Output() close = new EventEmitter<void>();
  listService = inject(ListService);
  fireStoreService = inject(FirestoreService);
  fb = inject(FormBuilder);

  // If the form is opened to edit an existing card!
  @Input() toEdit: Item = null;
  
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
      id: this.toEdit?.id ?? null,
    }
    
    this.toEdit ?
    this.fireStoreService.update$.next(item) : 
    this.fireStoreService.add$.next(item);
    this.close.emit();
  }

  ngOnInit(): void {
    if(this.toEdit){
      this.form.setValue({
        title: this.toEdit.title,
        description: this.toEdit.description,
      })
    }
  }
}
