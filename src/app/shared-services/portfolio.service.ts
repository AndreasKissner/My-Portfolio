import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PortfolioJson } from '../interfaces/portfolio-interfaces';


@Injectable({ providedIn: 'root' })

export class PortfolioService {
  private http = inject(HttpClient);
  private url = 'assets/json/portfolio.json';

  /**
   * Fetches the portfolio data from the specified URL.
   */
  getData() {
    return this.http.get<PortfolioJson[]>(this.url);
  }
}