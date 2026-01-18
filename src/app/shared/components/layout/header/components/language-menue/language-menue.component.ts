import { Component, inject, input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-language-menue',
  imports: [],
  templateUrl: './language-menue.component.html',
  styleUrl: './language-menue.component.scss',
})
export class LanguageMenueComponent {

  private translate = inject(TranslateService);

  // Ersetzt @Input() isDark: boolean = false;
  isDark = input<boolean>(false);

  // Wenn die aktuelle Sprache Englisch ist, soll der DE-Button gezeigt werden.
  // Also setzen wir isGerman auf true, damit das @if (isGerman) im HTML greift.
  isGerman = this.translate.currentLang !== 'de'; 

  toggleLanguage() {
    // 1. Den Schalter für das Icon umlegen
    this.isGerman = !this.isGerman;
    
    // 2. Die Sprache basierend auf dem neuen Zustand wählen
    // Wenn isGerman jetzt false ist, zeigen wir das EN-Icon und nutzen 'de'
    // Wenn isGerman jetzt true ist, zeigen wir das DE-Icon und nutzen 'en'
    const lang = this.isGerman ? 'en' : 'de';
    
    this.translate.use(lang);
    localStorage.setItem('lang', lang);
  }
}