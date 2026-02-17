import { Component, inject, signal, AfterViewInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { startTabRotation } from '../favicon-logic';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements AfterViewInit {
  protected readonly title = signal('myportfolio');
  private titleService = inject(Title);
  private translate = inject(TranslateService);

  /**
     * Initializes the application language from localStorage or defaults to English.
     */
  private initLang = (() => {
    const savedLang = localStorage.getItem('lang') || 'en';
    this.translate.use(savedLang);
  })();

  /**
   * Handles post-initialization tasks like scroll reset and tab title rotation.
   */
  ngAfterViewInit() {
    history.replaceState(null, '', location.pathname);
    window.scrollTo(0, 0);
    startTabRotation(this.titleService);
  }
}