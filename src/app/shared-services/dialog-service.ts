import { Injectable, signal } from '@angular/core';

@Injectable()


export class DialogService {
  showDialog = signal(false);
  isGerman = signal(false);
  isClosing = signal(false);

  closeDialog() {
    this.showDialog.set(false);

}

// open-dialog.btn
  onHover(state: boolean) {
    if (window.innerWidth >= 1024) {
  this.showDialog.set(state);
    }
  }

  onClick() {
    console.log('Btn is clicked');
    if (window.innerWidth < 1024) {
this.showDialog.set(true);
    }
  }
}

