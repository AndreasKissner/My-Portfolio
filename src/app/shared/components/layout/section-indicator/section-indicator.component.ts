import { Component, input, signal, afterNextRender, ElementRef } from '@angular/core';

@Component({
  selector: 'app-section-indicator',
  standalone: true,
  templateUrl: './section-indicator.component.html',
  styleUrl: './section-indicator.component.scss',
})
export class SectionIndicatorComponent {
  color = input<string>('white');
  
  readonly circleImg = input<string>('assets/img/icons/pointerNav/pointer-nav-circle.svg');

  activeSection = signal<string>('hero');

  readonly sections = ['hero', 'about', 'skills', 'portfolio', 'references', 'contact'];

 /**
 * Triggers the observer initialization after the next render cycle.
 */
private _renderEffect = afterNextRender(() => {
  this.initObserver();
});

/**
 * Sets up the IntersectionObserver to track active sections.
 */
private initObserver() {
  const options = { root: null, threshold: 0.6 };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) this.activeSection.set(entry.target.id);
    });
  }, options);

  this.observeSections(observer);
}

/**
 * Connects the observer to each section element by ID.
 */
private observeSections(observer: IntersectionObserver) {
  this.sections.forEach(id => {
    const el = document.getElementById(id);
    if (el) observer.observe(el);
  });
}

/**
 * Smoothly scrolls to a specific element by its ID.
 */
scrollTo(id: string) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
}