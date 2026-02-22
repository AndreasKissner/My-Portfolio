import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SectionService {
  readonly activeSection = signal<string>('hero');

  setActive(id: string) {
    this.activeSection.set(id);
  }
}