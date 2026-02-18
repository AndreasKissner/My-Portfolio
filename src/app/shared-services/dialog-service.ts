import { Injectable, signal } from '@angular/core';

@Injectable()


/**
 * Service to manage the state and visibility of dialog components.
 */
export class DialogService {
  showDialog = signal(false);
  isGerman = signal(false);
  isClosing = signal(false);

  /**
   * Closes the dialog by updating the visibility signal.
   */
  closeDialog() {
    this.showDialog.set(false);
  }

  /**
   * Updates dialog visibility based on hover state for desktop screens.
   */
  onHover(state: boolean) {
    if (window.innerWidth >= 1024) {
      this.showDialog.set(state);
    }
  }

  /**
   * Opens the dialog on click for mobile and tablet devices.
   */
  onClick() {
    console.log('Btn is clicked');
    if (window.innerWidth < 1024) {
      this.showDialog.set(true);
    }
  }
}


