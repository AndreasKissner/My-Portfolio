import { Component, input, signal, afterNextRender } from '@angular/core';
import { SectionService } from '../../../../shared-services/section.service';


@Component({
  selector: 'app-section-indicator',
  standalone: true,
  templateUrl: './section-indicator.component.html',
  styleUrl: './section-indicator.component.scss',
})
export class SectionIndicatorComponent {
  color = input<string>('white');
  readonly circleImg = input<string>('assets/img/icons/pointerNav/pointer-nav-circle.svg');
  readonly sections = ['hero', 'about', 'skills', 'portfolio', 'references', 'contact'];

  activeSection!: typeof this.sectionService.activeSection; // ← Typ-Deklaration ohne Zuweisung

  constructor(private sectionService: SectionService) {
    this.activeSection = this.sectionService.activeSection; // ← Zuweisung im Constructor
  }


  private _renderEffect = afterNextRender(() => {
    this.initObserver();
  });

  private initObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.sectionService.setActive(entry.target.id);
        }
      });
    }, { root: null, threshold: 0.6 });

    this.sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
  }

scrollTo(id: string) {
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