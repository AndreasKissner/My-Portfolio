import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Project {
  title: string;
  description: string;
  hoverText: string;
  image: string;
  languages: string;
  liveUrl: string;
}

@Injectable({ providedIn: 'root' })
export class PortfolioService {
  private http = inject(HttpClient);
  private url = 'https://andreaskissner.info/portfolio.json';
  
  projects = signal<Project[]>([]);
  currentIndex = signal(0);

  currentProject = computed(() => {
    const list = this.projects();
    if (list.length === 0) return null;
    return list[this.currentIndex()];
  });

  constructor() {
    this.loadData();
  }

  private loadData() {
    this.http.get<Project[]>(this.url).subscribe({
      next: (data) => this.projects.set(data),
      error: (err) => console.error('Fehler beim Laden der JSON:', err)
    });
  }

  next() {
    if (this.projects().length > 0) {
      this.currentIndex.update(i => (i + 1) % this.projects().length);
    }
  }

  prev() {
    if (this.projects().length > 0) {
      this.currentIndex.update(i => (i - 1 + this.projects().length) % this.projects().length);
    }
  }
}