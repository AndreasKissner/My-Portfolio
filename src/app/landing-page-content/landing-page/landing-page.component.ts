import {
  AfterViewInit,
  Component,
  computed,
  ElementRef,
  OnDestroy,
  QueryList,
  ViewChildren,
  NgZone
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeaderComponent } from '../../shared/components/layout/header/header.component';
import { HeroComponent } from '../sections-content/hero/hero.component';
import { AboutComponent } from '../sections-content/about/about.component';
import { SkillComponent } from '../sections-content/skill/skill.component';
import { PortfolioComponent } from '../sections-content/portfolio/portfolio.component';
import { ReferenceComponent } from '../sections-content/reference/reference.component';
import { ContactComponent } from '../sections-content/contact/contact.component';
import { SectionIndicatorComponent } from '../../shared/components/layout/section-indicator/section-indicator.component';
import { SectionService } from '../../shared-services/section.service';


interface HeaderState {
  bgColor: string;
  textColor: string;
  showSocialButtons: boolean;
}

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
export class LandingPageComponent implements AfterViewInit, OnDestroy {
  @ViewChildren('section') sections!: QueryList<ElementRef>;

  sectionColors = {
    hero: '#679AAC',
    about: '#F8F7E5',
    skills: '#1D1D1D',
    portfolio: '#F0F0F0',
    references: '#679AAC',
    contact: '#1D1D1D'
  };

  private sectionHeaderMap: Record<string, HeaderState> = {
    hero: { bgColor: '#679AAC', textColor: 'white', showSocialButtons: true },
    about: { bgColor: '#F8F7E5', textColor: 'black', showSocialButtons: false },
    skills: { bgColor: '#1D1D1D', textColor: 'white', showSocialButtons: false },
    portfolio: { bgColor: '#F0F0F0', textColor: 'black', showSocialButtons: false },
    references: { bgColor: '#679AAC', textColor: 'black', showSocialButtons: false },
    contact: { bgColor: '#1D1D1D', textColor: 'white', showSocialButtons: false },
  };

  activeSection = computed<HeaderState>(() =>
    this.sectionHeaderMap[this.sectionService.activeSection()] ?? this.sectionHeaderMap['hero']
  );

  private visibilityObserver!: IntersectionObserver;

  constructor(
    private route: ActivatedRoute,
    private sectionService: SectionService,
    private ngZone: NgZone,
    private el: ElementRef
  ) { }

  /**
  * Initializes observers and fragment-based scrolling after view is ready.
  */
  ngAfterViewInit(): void {
    this.initVisibilityObserver();
    this.handleFragmentScrolling();
  }

  /**
   * Cleans up observers on component destruction.
   */
  ngOnDestroy(): void {
    this.visibilityObserver?.disconnect();
  }

  /**
   * Returns the fixed header height based on current breakpoint.
   */
  private getHeaderHeight(): number {
    return window.matchMedia('(min-width: 576px)').matches ? 88 : 72;
  }

  /**
   * Adds 'visible' class to sections as they enter the viewport.
   * Used to trigger CSS entrance animations.
   */
  private initVisibilityObserver(): void {
    this.visibilityObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.1 }
    );
    this.sections.forEach(sec => this.visibilityObserver.observe(sec.nativeElement));
  }

  /**
   * Listens for route fragment changes and scrolls to the target section,
   * offset by the fixed header height.
   */
  private handleFragmentScrolling(): void {
    this.route.fragment.subscribe(fragment => {
      if (!fragment) return;
      setTimeout(() => {
        const el = document.getElementById(fragment);
        if (el) {
          const host = this.el.nativeElement as HTMLElement;
          const elementTop = el.getBoundingClientRect().top + host.scrollTop;
          host.scrollTo({ top: elementTop - this.getHeaderHeight(), behavior: 'smooth' });
        }
      }, 100);
    });
  }

  /**
   * Scrolls to a section by ID, offset by the fixed header height.
   * Used by the section indicator and external navigation links.
   */
  scrollToSection(id: string): void {
    const el = document.getElementById(id);
    if (!el) return;
    const host = this.el.nativeElement as HTMLElement;
    const elementTop = el.getBoundingClientRect().top + host.scrollTop;
    host.scrollTo({ top: elementTop - this.getHeaderHeight(), behavior: 'smooth' });
  }
}

