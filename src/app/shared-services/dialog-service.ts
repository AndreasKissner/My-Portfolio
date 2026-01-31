import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })


export class DialogService {
  showDialog = signal(false);
  isGerman = signal(false);
  isClosing = signal(false);

closeDialog() {
  this.isClosing.set(true);

  setTimeout(() => {
    this.showDialog.set(false);
    this.isClosing.set(false);
  }, 300);
}

// open-dialog.btn
  onHover(state: boolean) {
    if (window.innerWidth >= 1024) {
  this.showDialog.set(state);
    }
  }

  onClick() {
    if (window.innerWidth < 1024) {
this.showDialog.set(true);
    }
  }


}

