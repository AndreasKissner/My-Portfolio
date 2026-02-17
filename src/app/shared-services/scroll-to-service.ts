import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ScrollToService {
  private router = inject(Router);
  private doc = inject(DOCUMENT);

  scrollTo(id: string) {
    const isOnLandingPage = this.router.url === '/';

    if (isOnLandingPage) {
      const el = this.doc.getElementById(id);
      if (!el) return;
      setTimeout(() => {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        history.replaceState(null, '', `#${id}`);
      }, 60);
    } else {
      this.router.navigate(['/'], { fragment: id });
    }
  }
}