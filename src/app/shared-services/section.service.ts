import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SectionService {
  readonly activeSection = signal<string>('hero');
  readonly activeTextColor = signal<string>('white');

 /**
   * Sets the currently active section and updates its associated text color.
   * * @param id - The unique identifier of the section to activate.
   * @param textColor - The color to be applied to the active section text (defaults to 'white').
   */
  setActive(id: string, textColor: string = 'white') {
    this.activeSection.set(id);
    this.activeTextColor.set(textColor);
  }
}