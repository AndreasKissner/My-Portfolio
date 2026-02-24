import { Component, HostBinding, HostListener, input, signal } from '@angular/core';
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

  /**
   * Binds the current signal-based color to the host's background style.
   */
  @HostBinding('style.background-color') get hostBg() {
    return this.bgColor();
  }

  /**
   * Toggles the host's CSS position between fixed and static.
   */
  @HostBinding('style.position') get hostPosition() {
    return this.isFixed() ? 'fixed' : 'static';
  }

  readonly isFixed = input<boolean>(true);
  readonly bgColor = input<string>('transparent');
  textColor = input<string>('white');
  showSocialButtons = input<boolean>(true);

  headerGitSrc = signal('assets/img/icons/socialBtn/git.svg');
  headerGitSrcHover = signal('assets/img/icons/socialBtn/gitOrange.svg');

  headerLinkedInSrc = signal('assets/img/icons/socialBtn/linkedin.svg');
  headerLinkedInSrcHover = signal('assets/img/icons/socialBtn/linkedinOrange.svg');

  headerMailSrc = signal('assets/img/icons/socialBtn/mail.svg');
  headerMailSrcHover = signal('assets/img/icons/socialBtn/mailOrange.svg');
}