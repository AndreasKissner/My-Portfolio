import { Component, input, signal } from '@angular/core';
import { HeaderComponent } from '../../shared/components/layout/header/header.component';
import { FooterComponent } from '../../shared/components/layout/footer/footer.component';
import { HeroComponent } from '../sections-content/hero/hero.component';
import { AboutComponent } from '../sections-content/about/about.component';
import { SkillComponent } from '../sections-content/skill/skill.component';
import { PortfolioComponent } from '../sections-content/portfolio/portfolio.component';
import { ReferenceComponent } from '../sections-content/reference/reference.component';
import { ContactComponent } from '../sections-content/contact/contact.component';

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
    ContactComponent
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {

}