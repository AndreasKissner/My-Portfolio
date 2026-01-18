import { Component, input,signal } from '@angular/core';
import { HeaderSocialBtnComponent } from './components/header-social-btn/header-social-btn.component';
import { HeroHeaderNavComponent } from './components/hero-header-nav/hero-header-nav.component';
import { LogoNameComponent } from './components/logo-name/logo-name.component';
import { LanguageMenueComponent } from "./components/language-menue/language-menue.component";

@Component({
  selector: 'app-header',
  imports: [HeaderSocialBtnComponent, HeroHeaderNavComponent, LogoNameComponent, LanguageMenueComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  // Ersetzt @Input() textColor: string = 'white';
  textColor = input<string>('white');

  // Ersetzt @Input() showSocialButtons: boolean = true;
  showSocialButtons = input<boolean>(true);

  // Wir setzen hier wieder die Pfade zu den weißen SVGs ein
  headerGitSrc = signal('assets/img/icons/socialBtn/git.svg');
  headerGitSrcHover = signal('assets/img/icons/socialBtn/gitOrange.svg');

  headerLinkedInSrc = signal('assets/img/icons/socialBtn/linkedin.svg');
  headerLinkedInSrcHover = signal('assets/img/icons/socialBtn/linkedinOrange.svg');

  // Hier wieder 'mail.svg' statt 'emailblack.svg'
  headerMailSrc = signal('assets/img/icons/socialBtn/mail.svg');
  headerMailSrcHover = signal('assets/img/icons/socialBtn/mailOrange.svg');
}
