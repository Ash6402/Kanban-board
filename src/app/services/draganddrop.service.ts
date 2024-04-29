import { Injectable, signal } from '@angular/core';
import { Item } from '../models/Item.model';

@Injectable({
  providedIn: 'root'
})
export class DragandDropService {

  dragged = signal<Item>(null);
  hovered = signal<string>(null);

  constructor() { }
}
