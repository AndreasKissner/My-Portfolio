import { Component, input, signal, ElementRef, ViewChild, inject } from '@angular/core';
/* import { DOCUMENT } from '@angular/common'; */
import { HeaderSocialBtnComponent } from '../header-social-btn/header-social-btn.component';
/* import { Router } from '@angular/router'; */
import { ScrollToService } from '../../../../../../shared-services/scroll-to-service';
@Component({
  selector: 'app-hero-header-nav',
  standalone: true,
  imports: [HeaderSocialBtnComponent,],
  templateUrl: './hero-header-nav.component.html',
  styleUrl: './hero-header-nav.component.scss',
})
export class HeroHeaderNavComponent {
 /*  private doc = inject(DOCUMENT);
  private router = inject(Router); */
  private scrollToService = inject(ScrollToService);

  /** Burger button element (focus returns here after closing). */
  @ViewChild('burgerBtn', { static: false }) burgerBtn?: ElementRef<HTMLElement>;

  /** Menu container element (used to detect focus leaving the menu). */
  @ViewChild('menuContent', { static: false }) menuContent?: ElementRef<HTMLElement>;

  /** First menu link (focused when the menu opens). */
  @ViewChild('firstLink', { static: false }) firstLink?: ElementRef<HTMLElement>;

  burgerColor = input<string>('white');
  navGitSrc = input<string>('assets/img/icons/socialBtn/git.svg');
  navGitSrcHover = input<string>('assets/img/icons/socialBtn/gitOrange.svg');
  navLinkedInSrc = input<string>('assets/img/icons/socialBtn/linkedin.svg');
  navLinkedInSrcHover = input<string>('assets/img/icons/socialBtn/linkedinOrange.svg');
  navMailSrc = input<string>('assets/img/icons/socialBtn/mail.svg');
  navMailSrcHover = input<string>('assets/img/icons/socialBtn/mailOrange.svg');
  isMenuOpen = signal(false);

  /**
* Toggles the mobile menu open/closed and moves keyboard focus accordingly.
* - When opening: focuses the first menu link.
* - When closing: returns focus to the burger button.
*/
  toggleMenu() {
    const nextState = !this.isMenuOpen();
    this.isMenuOpen.set(nextState);
    if (nextState) {
      setTimeout(() => {
        this.firstLink?.nativeElement.focus();
      });
    } else {
      setTimeout(() => {
        this.burgerBtn?.nativeElement.focus();
      });
    }
  }

  /**
  * Closes the mobile menu and returns keyboard focus to the burger button.
  */
  /**
   */
  onClose() {
    setTimeout(() => {
      this.isMenuOpen.set(false);
      this.burgerBtn?.nativeElement.focus();
    }, 50); // 50 Millisekunden reichen oft schon aus
  }

  /**
   * Closes the menu when keyboard focus leaves the menu container (e.g. by tabbing out).
   */
  onMenuFocusOut(event: FocusEvent) {
    const next = event.relatedTarget as HTMLElement | null;
    const menuEl = this.menuContent?.nativeElement;
    if (!menuEl) return;
    if (!next || !menuEl.contains(next)) {
      this.onClose();
    }
  }

goTo(event: MouseEvent, id: string) {
  this.onClose();
  this.scrollToService.scrollTo(id);
}

}