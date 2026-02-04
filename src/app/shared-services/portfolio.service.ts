import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PortfolioJson } from '../interfaces/portfolio-interfaces';

export interface Project {
/*    title: string;
  description: string;
  hoverText: string;
  image: string;
  languages: string;
  liveUrl: string;  */
}

@Injectable({ providedIn: 'root' })

export class PortfolioService {
  private http = inject(HttpClient);
  private url = 'assets/json/portfolio.json';

  getData(){
    return this.http.get<PortfolioJson[]>(this.url);
  }
}