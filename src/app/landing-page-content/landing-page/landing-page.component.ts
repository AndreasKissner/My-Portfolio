import { AfterViewInit, Component, QueryList, ViewChildren, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeaderComponent } from '../../shared/components/layout/header/header.component';
import { HeroComponent } from '../sections-content/hero/hero.component';
import { AboutComponent } from '../sections-content/about/about.component';
import { SkillComponent } from '../sections-content/skill/skill.component';
import { PortfolioComponent } from '../sections-content/portfolio/portfolio.component';
import { ReferenceComponent } from '../sections-content/reference/reference.component';
import { ContactComponent } from '../sections-content/contact/contact.component';
import { SectionIndicatorComponent } from '../../shared/components/layout/section-indicator/section-indicator.component';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    HeaderComponent,
    HeroComponent,
    AboutComponent,
    SkillComponent,
    PortfolioComponent,
    ReferenceComponent,
    ContactComponent,
    SectionIndicatorComponent
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent implements AfterViewInit {
  @ViewChildren('section') sections!: QueryList<ElementRef>;

  sectionColors = {
    hero: '#679AAC',
    about: '#F8F7E5',
    skills: '#1D1D1D',
    portfolio: '#F0F0F0',
    references: '#679AAC',
    contact: '#1D1D1D'
  };

  constructor(private route: ActivatedRoute) { }

/**
 * Main lifecycle hook to initialize observers and scroll logic.
 */
ngAfterViewInit() {
  this.initIntersectionObserver();
  this.handleFragmentScrolling();
}

/**
 * Sets up the IntersectionObserver for section visibility animations.
 */
private initIntersectionObserver() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  this.sections.forEach(sec => observer.observe(sec.nativeElement));
}

/**
 * Subscribes to route fragments and scrolls to the target element.
 */
private handleFragmentScrolling() {
  this.route.fragment.subscribe(fragment => {
    if (!fragment) return;
    setTimeout(() => {
      const el = document.getElementById(fragment);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  });
}
}
