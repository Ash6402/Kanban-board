import { Injectable, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { fromEvent } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConnectionStatusService {

  private onlineSignal =  signal<boolean>(true);

  constructor() {
    fromEvent(window, 'online')
    .pipe(takeUntilDestroyed())
    .subscribe(() => this.onlineSignal.set(true));

    fromEvent(window, 'offline')
    .pipe(takeUntilDestroyed())
    .subscribe(() => this.onlineSignal.set(false));
  }

  get online(){
    return this.onlineSignal.asReadonly();
  }
}
