import { Component, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-text-content',
  imports: [],
  templateUrl: './text-content.component.html',
  styleUrl: './text-content.component.scss',
})
export class TextContentComponent implements OnInit {
 // Ein Signal statt einer normalen Variable
  displayText = signal(''); 
  
  private fullText = 'console.log("Hello world");';
  private typoText = 'console.log("Helo';

  ngOnInit(): void {
    this.typeEffect();
  }

  async typeEffect(): Promise<void> {
    // 1. Tippen bis Fehler
    for (let i = 0; i <= this.typoText.length; i++) {
      this.displayText.set(this.typoText.substring(0, i)); // .set() aktualisiert das Signal
      await this.delay(120);
    }

    await this.delay(600);

    // 2. Korrektur
    this.displayText.set('console.log("Hel');
    await this.delay(400);

    // 3. Fertig schreiben
    for (let i = 12; i <= this.fullText.length; i++) {
      this.displayText.set(this.fullText.substring(0, i));
      await this.delay(120);
    }
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
