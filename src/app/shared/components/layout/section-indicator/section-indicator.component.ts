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

  /**
   * Initializes the IntersectionObserver for all defined sections.
   */
  private initObserver() {
    const host = document.querySelector('app-landing-page') as HTMLElement;
    const observer = new IntersectionObserver((entries) => {
      this.processEntries(entries, host);
    }, { 
      root: host, 
      // FAKT: 0.4 MUSS hier enthalten sein, damit die checkActivation-Logik greift
      threshold: [0.1, 0.4, 0.7] 
    });

    this.sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
  }

  /**
   * Handles scroll position tracking and triggers entry checks.
   */
  private processEntries(entries: IntersectionObserverEntry[], host: HTMLElement) {
    const currentScrollTop = host?.scrollTop ?? 0;
    this.lastScrollTop = currentScrollTop;
    entries.forEach(entry => this.checkActivation(entry));
  }

  /**
   * Updates the active section if an entry meets the visibility threshold.
   */
  private checkActivation(entry: IntersectionObserverEntry) {
    if (entry.isIntersecting && entry.intersectionRatio >= 0.4) {
      const textColor = sectionTextColors[entry.target.id] ?? 'white';
      this.sectionService.setActive(entry.target.id, textColor);
    }
  }

  /**
   * Smoothly scrolls to a specific section by its ID.
   */
  scrollToId(id: string) {
    const element = document.getElementById(id);
    const host = document.querySelector('app-landing-page') as HTMLElement;
    if (!element || !host) return;
    const headerHeight = window.matchMedia('(min-width: 576px)').matches ? 88 : 72;
    const elementTop = element.getBoundingClientRect().top + host.scrollTop;
    host.scrollTo({
      top: elementTop - headerHeight,
      behavior: 'smooth'
    });
  }
}