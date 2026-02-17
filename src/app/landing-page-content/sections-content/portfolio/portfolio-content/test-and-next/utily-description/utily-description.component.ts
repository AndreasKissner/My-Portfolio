import { Component, inject, input } from '@angular/core';
import { PortfolioService } from '../../../../../../shared-services/portfolio.service';


@Component({
  selector: 'app-utily-description',
  imports: [],
  templateUrl: './utily-description.component.html',
  styleUrl: './utily-description.component.scss',
})
export class UtilyDescriptionComponent {

languageText = input<string | undefined>();
descriptionText = input<string | undefined>();

}
