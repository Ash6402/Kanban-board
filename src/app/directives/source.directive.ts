import { Directive, HostListener, Input,  WritableSignal, inject } from '@angular/core';
import { Item } from '../models/Item.model';
import { ListService } from '../services/lists.service';

@Directive({
  selector: '[source]',
  standalone: true
})
export class SourceDirective {

  @Input({required: true, alias: 'source'}) list: WritableSignal<Item[]>;  
  sourceList = inject(ListService).source;
  @HostListener('dragstart', ['$event']) dragStart(event)
  { 
   this.sourceList.set(this.list); 
  }

  constructor() { 
  }

}
