import { Component, input, signal, afterNextRender, ElementRef } from '@angular/core';

@Component({
  selector: 'app-section-indicator',
  standalone: true,
  templateUrl: './section-indicator.component.html',
  styleUrl: './section-indicator.component.scss',
})
export class SectionIndicatorComponent {
  readonly circleImg = input<string>('assets/img/icons/pointerNav/pointer-nav-circle.svg');
  // Lokales Signal für die aktive Sektion
   activeSection = signal<string>('hero');
  // Die Liste der IDs, die wir tracken wollen
  readonly sections = ['hero', 'about', 'skills', 'portfolio', 'references', 'contact'];

private _renderEffect = afterNextRender(() => {
    this.initObserver();
  });

  private initObserver() {
    const options = {
      root: null,
      threshold: 0.6 // 60% der Sektion müssen sichtbar sein
    };

  const observer = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (entry.isIntersecting) {
      this.activeSection.set(entry.target.id);
    }
  }
}, options);

    this.sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
  }

  scrollTo(id: string) {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}