import { Component, computed, input, afterNextRender } from '@angular/core';
import { SectionService } from '../../../../shared-services/section.service';

const sectionTextColors: Record<string, string> = {
  hero: 'white',
  about: 'black',
  skills: 'white',
  portfolio: 'black',
  references: 'black',
  contact: 'white'
};

@Component({
  selector: 'app-section-indicator',
  standalone: true,
  templateUrl: './section-indicator.component.html',
  styleUrl: './section-indicator.component.scss',
})
export class SectionIndicatorComponent {
  readonly circleImg = input<string>('assets/img/icons/pointerNav/pointer-nav-circle.svg');
  readonly sections = ['hero', 'about', 'skills', 'portfolio', 'references', 'contact'];

  activeSection!: typeof this.sectionService.activeSection;
  color = computed(() => this.sectionService.activeTextColor());

  private lastScrollTop = 0;

  constructor(private sectionService: SectionService) {
    this.activeSection = this.sectionService.activeSection;
  }

  private _renderEffect = afterNextRender(() => {
    this.initObserver();
  });

  private initObserver() {
    const host = document.querySelector('app-landing-page') as HTMLElement;

    const observer = new IntersectionObserver((entries) => {
      const currentScrollTop = host?.scrollTop ?? 0;
      const scrollingDown = currentScrollTop >= this.lastScrollTop;
      this.lastScrollTop = currentScrollTop;

      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
          const textColor = sectionTextColors[entry.target.id] ?? 'white';
          this.sectionService.setActive(entry.target.id, textColor);
        }
      });

    }, { root: host, threshold: [0.1, 0.7] });

    this.sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
  }

  scrollToId(id: string) {
    const element = document.getElementById(id);
    if (!element) return;

    const host = document.querySelector('app-landing-page') as HTMLElement;
    const headerHeight = window.matchMedia('(min-width: 576px)').matches ? 88 : 72;

    if (host) {
      const elementTop = element.getBoundingClientRect().top + host.scrollTop;
      host.scrollTo({
        top: elementTop - headerHeight,
        behavior: 'smooth'
      });
    }
  }
}