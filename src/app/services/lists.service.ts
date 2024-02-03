import { Injectable, WritableSignal, signal } from "@angular/core";
import { Item } from "../models/Item.model";

@Injectable({
    providedIn: 'root'
})

export class ListService{
  dragged = signal<Item>(null);
  source = signal<WritableSignal<Item[]>>(null);
  hovered = signal<String>(null);
  constructor(){}
}