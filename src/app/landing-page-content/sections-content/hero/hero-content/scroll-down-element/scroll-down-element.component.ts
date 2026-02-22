import { Component, inject } from '@angular/core';
import { DialogComponent } from '../../../../../shared/components/dialog-components/dialog/dialog.component';
import { TranslateModule } from '@ngx-translate/core';




@Component({
  selector: 'app-scroll-down-element',
  imports: [],
  templateUrl: './scroll-down-element.component.html',
  styleUrl: './scroll-down-element.component.scss',
})
export class ScrollDownElementComponent {

/**
 * Scrolls smoothly to the contact section, offset by the fixed header height.
 * Uses getBoundingClientRect() for accurate position within the scroll container.
 * CSS scroll-behavior: smooth on the host handles the animation.
 */
scrollToContact() {
  const element = document.getElementById('contact');
  if (!element) return;

  const host = document.querySelector('app-landing-page') as HTMLElement;
  const headerHeight = window.matchMedia('(min-width: 576px)').matches ? 88 : 72;

  if (host) {
    const elementTop = element.getBoundingClientRect().top + host.scrollTop;
    host.scrollTop = elementTop - headerHeight;
  }
}

}
