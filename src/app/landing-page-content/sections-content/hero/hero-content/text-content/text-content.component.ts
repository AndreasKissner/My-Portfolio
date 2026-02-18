import { Component, OnInit, signal } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-text-content',
  imports: [TranslateModule],
  templateUrl: './text-content.component.html',
  styleUrl: './text-content.component.scss',
})
export class TextContentComponent implements OnInit {
  displayText = signal(''); 
  
  private fullText = 'console.log("Hello (-: ");';
  private typoText = 'console.log("Helo';

/**
 * Initializes the component and starts the typing effect.
 */
ngOnInit(): void {
  this.typeEffect();
}

/**
 * Creates a typing animation effect for the display text.
 */
async typeEffect(): Promise<void> {
  const textToType = "Lets start ! I'm";
  this.displayText.set('');

  for (let i = 0; i <= textToType.length; i++) {
    this.displayText.set(textToType.substring(0, i));
    await this.delay(120);
  }
}

/**
 * Pauses execution for a specified duration in milliseconds.
 */
private delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
}
