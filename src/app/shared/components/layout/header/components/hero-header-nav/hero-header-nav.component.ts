import { Component, input, signal } from '@angular/core';
import { HeaderSocialBtnComponent } from '../header-social-btn/header-social-btn.component';

@Component({
  selector: 'app-hero-header-nav',
  standalone: true,
  imports: [HeaderSocialBtnComponent],
  templateUrl: './hero-header-nav.component.html',
  styleUrl: './hero-header-nav.component.scss',
})
export class HeroHeaderNavComponent {

  // signaö für die Linien-Farbe
  burgerColor = input<string>('white');

  navGitSrc = input<string>('assets/img/icons/socialBtn/git.svg');
  navGitSrcHover = input<string>('assets/img/icons/socialBtn/gitOrange.svg');

  navLinkedInSrc = input<string>('assets/img/icons/socialBtn/linkedin.svg');
  navLinkedInSrcHover = input<string>('assets/img/icons/socialBtn/linkedinOrange.svg');

  navMailSrc = input<string>('assets/img/icons/socialBtn/mail.svg');
  navMailSrcHover = input<string>('assets/img/icons/socialBtn/mailOrange.svg');


  isMenuOpen = signal(false);

  toggleMenu() {

    this.isMenuOpen.set(!this.isMenuOpen());
  }

  onClose() {
    this.isMenuOpen.set(false);
  }
  handleContentClick(event: MouseEvent) {
    event.stopPropagation();
  }
}