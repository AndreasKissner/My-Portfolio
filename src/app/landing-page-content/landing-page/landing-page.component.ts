import { Component} from '@angular/core';
import { HeaderComponent } from '../../shared/components/layout/header/header.component';
import { HeroComponent } from '../sections-content/hero/hero.component';
import { AboutComponent } from '../sections-content/about/about.component';
import { SkillComponent } from '../sections-content/skill/skill.component';
import { PortfolioComponent } from '../sections-content/portfolio/portfolio.component';
import { ReferenceComponent } from '../sections-content/reference/reference.component';
import { ContactComponent } from '../sections-content/contact/contact.component';
import { SectionIndicatorComponent } from '../../shared/components/layout/section-indicator/section-indicator.component';
import { AfterViewInit, QueryList, ViewChildren, ElementRef } from '@angular/core';



// Hier deine 6 Inhalts-Komponenten importieren


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


export class LandingPageComponent  implements AfterViewInit {
  @ViewChildren('section') sections!: QueryList<ElementRef>;

 
  sectionColors = {
    hero: '#679AAC',
    about: '#F8F7E5',
    skills: '#1D1D1D',
    portfolio: '#F0F0F0',
    references: '#679AAC',
    contact: '#1D1D1D'
  };

ngAfterViewInit() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1
  });

  this.sections.forEach(section => {
    observer.observe(section.nativeElement);
  });
}



}