import { Component, inject, OnInit, signal } from '@angular/core';
import { HeaderComponent } from '../../shared/components/layout/header/header.component';
import { FooterComponent } from '../../shared/components/layout/footer/footer.component';
import { HeroComponent } from '../sections-content/hero/hero.component';
import { AboutComponent } from '../sections-content/about/about.component';
import { SkillComponent } from '../sections-content/skill/skill.component';
import { PortfolioComponent } from '../sections-content/portfolio/portfolio.component';
import { ReferenceComponent } from '../sections-content/reference/reference.component';
import { ContactComponent } from '../sections-content/contact/contact.component';
import { SectionIndicatorComponent } from '../../shared/components/layout/section-indicator/section-indicator.component';
import { PortfolioService } from '../../shared-services/portfolio.service';
import { PortfolioJson } from '../../interfaces/portfolio-interfaces';

// Hier deine 6 Inhalts-Komponenten importieren


@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
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

// landing-page.component.ts

export class LandingPageComponent implements OnInit {
 
  sectionColors = {
    hero: '#679AAC',
    about: '#F8F7E5',
    skills: '#1D1D1D',
    portfolio: '#F0F0F0',
    references: '#679AAC',
    contact: '#1D1D1D'
  };

  private portService = inject(PortfolioService);

  allData = signal<PortfolioJson[]>([]);
  currentIndex = signal<number>(0);

  ngOnInit() {
    this.portService.getData().subscribe(result => { console.log('Portfolio-Daten:', result);
      this.allData.set(result);
    })
  }
    // From Button
nextContent() {
  this.currentIndex.update(index => {
    if (index < 4) {
      return index + 1;
    } else {
      return 0;
    }
  });
}

prevContent() {
  this.currentIndex.update(index => {
    if (index > 0) {
      return index - 1;
    } else {
      return 4;
    }
  });
}




}