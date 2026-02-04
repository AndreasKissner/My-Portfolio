import { Component, inject } from '@angular/core';
import { PortfolioService } from '../../../../../../shared-services/portfolio.service';

@Component({
  selector: 'app-utily-description',
  imports: [],
  templateUrl: './utily-description.component.html',
  styleUrl: './utily-description.component.scss',
})
export class UtilyDescriptionComponent {
public portfolioService = inject(PortfolioService)
}
