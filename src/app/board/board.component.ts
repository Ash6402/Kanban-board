import { Component, DestroyRef, OnDestroy, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppButtonComponent } from '../shared/app-button/app-button.component';
import { SectionComponent } from './section/section.component';
import { DropDirective } from '../directives/drop.directive';
import { SourceDirective } from '../directives/source.directive';
import { DetailFormComponent} from '../detail-form/detail-form.component';
import { HeaderComponent } from '../header/header.component';
import { FirestoreService } from '../services/firestore.service';
import { AuthService } from '../services/auth.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DialogService } from '../services/dialog.service';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [
    CommonModule, 
    AppButtonComponent, 
    SectionComponent, 
    DropDirective, 
    SourceDirective, 
    DetailFormComponent,
    HeaderComponent,
  ],
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnDestroy {
  private firestoreService = inject(FirestoreService);
  dialogService = inject(DialogService);
  private user = inject(AuthService).user;
  private destroyRef = inject(DestroyRef);
  
  todo = this.firestoreService.todo;
  workInProgress = this.firestoreService.workInProgress;
  done = this.firestoreService.done;
  
  // Variable to control the insert-new-item-modal popup
  insert: boolean = false;

  constructor(){
    effect(() => {
      if(this.user())
        this.firestoreService.getItems(this.user().uid).pipe(
          takeUntilDestroyed(this.destroyRef),
      ).subscribe();
    }, {allowSignalWrites: true})
  }

  ngOnDestroy(): void {
    this.firestoreService.reset();
  }
}
