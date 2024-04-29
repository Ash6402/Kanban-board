import { ApplicationRef, EnvironmentInjector, Injectable, createComponent, inject, input } from '@angular/core';
import { DetailFormComponent } from '../detail-form/detail-form.component';
import { Item } from '../models/Item.model';

@Injectable({
  providedIn: 'root'
})
export class DialogService{

  injector = inject(EnvironmentInjector);
  applicationRef = inject(ApplicationRef);

  showDialog(data?: Item){
    const dialog = document.createElement('dialog');
    const dialogComponentRef = createComponent(DetailFormComponent, {
      environmentInjector: this.injector,
      hostElement: dialog,
    })

    this.applicationRef.attachView(dialogComponentRef.hostView);

    dialogComponentRef.instance.close.subscribe({
      next: () => {
        document.body.removeChild(dialog);
        this.applicationRef.detachView(dialogComponentRef.hostView);
      },
    })

    if(data)
      dialogComponentRef.instance.toEdit = data;

    document.body.appendChild(dialog);
  }

  constructor() { }
}
