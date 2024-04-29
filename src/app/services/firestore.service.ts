import { Injectable, WritableSignal, inject, signal } from '@angular/core';
import { CollectionReference, DocumentReference, Firestore, QuerySnapshot, addDoc, collection, collectionData, deleteDoc, doc, getDocs, query, updateDoc, where } from '@angular/fire/firestore';
import { EMPTY, Observable, Subject, catchError, from, map, of, switchMap, take, tap } from 'rxjs';
import { Item } from '../models/Item.model';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {

  // The variables for managing firestore database
  private firestore = inject(Firestore);
  private usersCollection: CollectionReference;
  private userItemsCollection: CollectionReference;

  add$ = new Subject<Item>();
  update$ = new Subject<Item>();
  delete$ = new Subject<Item>();
  updateLists$ = new Subject<Item>();
  
  // The item signals to use in the applications 
  todoSignal: WritableSignal<Item[]> = signal(null);
  workInProgressSignal: WritableSignal<Item[]> = signal(null);
  doneSignal: WritableSignal<Item[]> = signal(null);

  // variable for managing the fetching state of the items in firestore
  statusSignal: WritableSignal<'pending' | 'fetching' | 'fetched' | 'error'> = signal('pending');
  
  constructor() { 
    this.usersCollection = collection(this.firestore, 'users');

    this.add$.pipe(
      switchMap((item: Item) => {
        // As each task new tasks goes into todo so we always add it in todo signal
        this.todoSignal.update((items) => items ? [...items, item] : [item]); 
        return this.addItem(item);
      })
    ).subscribe();

    this.update$.pipe(
      switchMap((item: Item) => {
        if(item.type=='todo')
          this.updateSignal(this.todoSignal, item);
        else if(item.type=='work-in-progress')
          this.updateSignal(this.workInProgressSignal, item);
        else if(item.type=='done')
          this.updateSignal(this.doneSignal, item);
        return this.updateItem(item);
      })
    ).subscribe();

    this.delete$.pipe(
      switchMap((item: Item) => {
        if(item.type=='todo')
          this.removeItem(this.todoSignal, item.id);
        if(item.type=='work-in-progress')
          this.removeItem(this.workInProgressSignal, item.id);
        if(item.type=='done')
          this.removeItem(this.doneSignal, item.id);
        return this.deleteItem(item);
      })
    ).subscribe();

    this.updateLists$.pipe(
      tap((item: Item) => {
        this.removeItem(this.todoSignal, item.id)
        this.removeItem(this.workInProgressSignal, item.id)
        this.removeItem(this.doneSignal, item.id)

        this.update$.next(item);

        switch(item.type){
          case 'todo': 
            this.todoSignal.update((items: Item[]) => items ? [...items, item] : [item])
            return
          
          case 'work-in-progress': 
            this.workInProgressSignal.update((items: Item[]) => items ? [...items, item] : [item])
            return

          case 'done': 
            this.doneSignal.update((items: Item[]) => items ? [...items, item] : [item])
            return
          }
      })
    ).subscribe();
  }

  addNewUser(user: {userId: string})  {
    return from(addDoc(this.usersCollection, user))
  }

  addItem(item: Item): Observable<DocumentReference> {
    return from(addDoc(this.userItemsCollection, item))
  }

  updateItem(item: Item): Observable<void>{
    return from(updateDoc(
      doc(this.userItemsCollection, item.id ), {
        ...item,
      }
    ))
  }

  deleteItem(item: Item): Observable<void>{
    return from(deleteDoc(
      doc(this.userItemsCollection, item.id)
    ))
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
      take(1),
      catchError(err => {
        this.statusSignal.set('error');
        return of(err);
      })
    );
  } 
    
  filterItemsFn(collectionData$ :Observable<Item[]>){
    return collectionData$.pipe(
      map((items: Item[]) => { 
        this.statusSignal.set('fetched');
        items.map(
          (item: Item) => {
            if(item.type=='todo') this.todoSignal.update((items) => items ? [...items, item] : [item])
            else if(item.type=='work-in-progress') this.workInProgressSignal.update((items) => items ? [...items, item] : [item])
            else if (item.type=='done') this.doneSignal.update((items) => items ? [...items, item] : [item])
          }
        )
        return EMPTY;
      })
    )
  }

  updateSignal(signal: WritableSignal<Item[]>, item: Item){
    if(!signal()) return;
    signal.update((items) => [...items].map((val: Item) => val.id==item.id ? {...item} : val));
  }

  removeItem(signal: WritableSignal<Item[]>, id: string){
    if(!signal()) return;
    signal.update((items) => [...items].filter((val: Item) => val.id !== id));
  }

  get todo(){
    return this.todoSignal.asReadonly();
  }

  get workInProgress(){
    return this.workInProgressSignal.asReadonly();
  }

  get done(){
    return this.doneSignal.asReadonly();
  }

  get status(){
    return this.statusSignal.asReadonly();
  }

  reset(){
    this.todoSignal.set(null);
    this.workInProgressSignal.set(null);
    this.doneSignal.set(null);
  }
}