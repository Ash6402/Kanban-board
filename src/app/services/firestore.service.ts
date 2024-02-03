import { Injectable, WritableSignal, inject, signal } from '@angular/core';
import { CollectionReference, DocumentReference, Firestore, QuerySnapshot, addDoc, collection, collectionData, getDocs, query, where } from '@angular/fire/firestore';
import { EMPTY, Observable, Subject, from, map, of, switchMap, tap } from 'rxjs';
import { Item } from '../models/Item.model';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {

  // The variables for managing firestore database
  private firestore = inject(Firestore);
  private usersCollection: CollectionReference;
  private userItemsCollection: CollectionReference;

  // Fetching items and adding items obserables
  // getItems = new Subject<{id: string}>();
  add$ = new Subject<Item>();
  
  // The item signals to use in the applications 
  todoSignal: WritableSignal<Item[]> = signal(null);
  workInProgressSignal: WritableSignal<Item[]> = signal(null);
  doneSignal: WritableSignal<Item[]> = signal(null);
  
  // variable for managing the fetching state of the items in firestore
  statusSignal: WritableSignal<'pending' | 'fetching' | 'fetched' | 'error'> = signal('pending');
  
  constructor() { 
    this.usersCollection = collection(this.firestore, 'users');

    this.add$.pipe(
      tap((item: Item) => {
        // As each task new tasks goes into todo so we always add it in todo signal
        this.todoSignal.update((items) => [...items, item]); 
        this.addItem(item);
      })
    ).subscribe();
  }

  addNewUser(user: {userId: string})  {
    return from(addDoc(this.usersCollection, user))
  }

  addItem(item: Item): Observable<DocumentReference> {
    return from(addDoc(this.userItemsCollection, item))
  }
  
  getItems(id: string){
    return of(id).pipe(
      tap(() => this.statusSignal.set('fetching')),
      switchMap((id) => getDocs(query(this.usersCollection, where('userId',"==", id)))),
      switchMap((snapshot: QuerySnapshot) => {
        const documentId = snapshot.docs[0].id;
        this.userItemsCollection = collection(this.firestore, `users/${documentId}/items`);
        return this.filterItemsFn(collectionData(this.userItemsCollection, {idField: 'id'}) as Observable<Item[]>)
      }),
      );
    } 
    
  filterItemsFn(collectionData$ :Observable<Item[]>){
    return collectionData$.pipe(
      map((items: Item[]) => { 
        this.statusSignal.set('fetched');
        console.log(items);
        items.map(
          (item: Item) => {
            if(item.type='todo') this.todoSignal.update((items) => items ? [...items, item] : [item])
            else if(item.type='work-in-progress') this.workInProgressSignal.update((items) => items ? [...items, item] : [item])
            else if (item.type='done') this.doneSignal.update((items) => items ? [...items, item] : [item])
          }
        )
        return EMPTY;
      })
    )
  }

  get todo(){
    return this.todoSignal; 
  }

  get workInProgress(){
    return this.workInProgressSignal;
  }

  get done(){
    return this.doneSignal;
  }

  get status(){
    return this.statusSignal.asReadonly();
  }

  reset(){
    this.todoSignal.set(null);
    this.workInProgressSignal.set(null);
    this.done.set(null);
  }

}