import { Component, inject, input, signal } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-social-btn',
  imports: [],
  templateUrl: './header-social-btn.component.html',
  styleUrl: './header-social-btn.component.scss',
})
export class HeaderSocialBtnComponent {

  private router = inject(Router);
  gitSrc = input<string>('assets/img/icons/socialBtn/git.svg');
  gitSrcHover = input<string>('assets/img/icons/socialBtn/gitOrange.svg');

  linkedInSrc = input<string>('assets/img/icons/socialBtn/linkedin.svg');
  linkedInSrcHover = input<string>('assets/img/icons/socialBtn/linkedinOrange.svg');

  mailSrc = input<string>('assets/img/icons/socialBtn/mail.svg');
  mailSrcHover = input<string>('assets/img/icons/socialBtn/mailOrange.svg');

  gitHover = signal(false);
  linkedInHover = signal(false);
  mailHover = signal(false);

  goToContact(event: MouseEvent) {
  const isOnLandingPage = this.router.url === '/';

  if (isOnLandingPage) {
    event.preventDefault();
    const el = document.getElementById('contact');
    if (!el) return;
    setTimeout(() => {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.replaceState(null, '', '#contact');
    }, 60);
  } else {
    this.router.navigate(['/'], { fragment: 'contact' });
  }
}
}