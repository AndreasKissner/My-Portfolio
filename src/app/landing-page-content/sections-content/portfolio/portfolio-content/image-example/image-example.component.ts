import { Component, input } from '@angular/core';
import { PortfolioService } from '../../../../../shared-services/portfolio.service';
import { PortfolioJson } from '../../../../../interfaces/portfolio-interfaces';

@Component({
  selector: 'app-image-example',
  imports: [],
  templateUrl: './image-example.component.html',
  styleUrl: './image-example.component.scss',
})
export class ImageExampleComponent {


content = input<PortfolioJson>();
}
