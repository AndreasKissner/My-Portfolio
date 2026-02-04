import { Component, inject } from '@angular/core';
import { PortfolioService } from '../../../../../shared-services/portfolio.service';


@Component({
  selector: 'app-previous-next',
  imports: [],
  templateUrl: './previous-next.component.html',
  styleUrl: './previous-next.component.scss',
})
export class PreviousNextComponent {
portfolioService = inject(PortfolioService);
}
