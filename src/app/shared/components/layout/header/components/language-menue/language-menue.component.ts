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
  isGerman = this.translate.currentLang !== 'de';

/**
 * Toggles the UI language between German and English and persists the choice in localStorage.
 */
toggleLanguage() {
  this.isGerman = !this.isGerman;
  const lang = this.isGerman ? 'en' : 'de';
  this.translate.use(lang);
  localStorage.setItem('lang', lang);
}

}