import { Injectable, signal } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class ListService{
   todo = signal(todoList);
   workInProgress = signal(workInProgressList);
   done = signal(doneList);
}

let todoList = [
 {
     text: "This is the todo card.   "
 }
]

let workInProgressList = [
 {
     text: "This is the Work In Progress card."
 }
]

let doneList = [
 {
     text: "This is the done list",
 }
]