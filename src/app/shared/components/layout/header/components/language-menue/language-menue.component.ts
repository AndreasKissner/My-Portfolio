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

  
  showGermanBtn = this.translate.currentLang !== 'de';

 /**
 * Toggles the application language between German and English.
 */
toggleLanguage() {
  this.showGermanBtn = !this.showGermanBtn;
  const lang = this.showGermanBtn ? 'en' : 'de';
  this.translate.use(lang);
  localStorage.setItem('lang', lang);
}
}