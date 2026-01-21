import { Component, input, signal } from '@angular/core';

@Component({
  selector: 'app-header-social-btn',
  imports: [],
  templateUrl: './header-social-btn.component.html',
  styleUrl: './header-social-btn.component.scss',
})
export class HeaderSocialBtnComponent {
  gitSrc = input<string>('assets/img/icons/socialBtn/git.svg');
  gitSrcHover = input<string>('assets/img/icons/socialBtn/gitOrange.svg');

  linkedInSrc = input<string>('assets/img/icons/socialBtn/linkedin.svg');
  linkedInSrcHover = input<string>('assets/img/icons/socialBtn/linkedinOrange.svg');

  mailSrc = input<string>('assets/img/icons/socialBtn/mail.svg');
  mailSrcHover = input<string>('assets/img/icons/socialBtn/mailOrange.svg');

  gitHover = signal(false);
  linkedInHover = signal(false);
  mailHover = signal(false);
}