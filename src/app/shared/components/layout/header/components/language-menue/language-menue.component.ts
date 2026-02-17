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
  isDark = input<boolean>(false);

  // Wir prüfen: Ist die aktuelle Sprache NICHT Deutsch? 
  // Wenn ja (also 'en'), dann soll der deutsche Button angezeigt werden.
  showGermanBtn = this.translate.currentLang !== 'de';

  toggleLanguage() {
    // 1. Status umschalten
    this.showGermanBtn = !this.showGermanBtn;
    
    // 2. Wenn wir jetzt NICHT mehr den deutschen Button zeigen, 
    // muss die Sprache auf Deutsch gewechselt sein.
    const lang = this.showGermanBtn ? 'en' : 'de';
    
    this.translate.use(lang);
    localStorage.setItem('lang', lang);
  }
}