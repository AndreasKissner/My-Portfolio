import { Component, inject, input, signal } from '@angular/core';
/* import { Router } from '@angular/router'; */
import { ScrollToService } from '../../../../../../shared-services/scroll-to-service';

@Component({
  selector: 'app-header-social-btn',
  imports: [],
  templateUrl: './header-social-btn.component.html',
  styleUrl: './header-social-btn.component.scss',
})
export class HeaderSocialBtnComponent {

  private scrollToService = inject(ScrollToService);

  gitSrc = input<string>('assets/img/icons/socialBtn/git.svg');
  gitSrcHover = input<string>('assets/img/icons/socialBtn/gitOrange.svg');

  linkedInSrc = input<string>('assets/img/icons/socialBtn/linkedin.svg');
  linkedInSrcHover = input<string>('assets/img/icons/socialBtn/linkedinOrange.svg');

  mailSrc = input<string>('assets/img/icons/socialBtn/mail.svg');
  mailSrcHover = input<string>('assets/img/icons/socialBtn/mailOrange.svg');

  gitHover = signal(false);
  linkedInHover = signal(false);
  mailHover = signal(false);

  /**
 * Handles the click event to scroll to the contact section.
 */
  goToContact(event: MouseEvent) {
    this.scrollToService.scrollTo('contact');
  }

}