import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SectionService {
  readonly activeSection = signal<string>('hero');
  readonly activeTextColor = signal<string>('white');

  setActive(id: string, textColor: string = 'white') {
    this.activeSection.set(id);
    this.activeTextColor.set(textColor);
  }
}