import { Component, inject, input, output } from '@angular/core';
import { PortfolioService } from '../../../../../shared-services/portfolio.service';
import { TranslateModule } from '@ngx-translate/core';


@Component({
  selector: 'app-previous-next',
  imports: [TranslateModule],
  templateUrl: './previous-next.component.html',
  styleUrl: './previous-next.component.scss',
})
export class PreviousNextComponent {
portfolioService = inject(PortfolioService);

indexActuel = input<number>(0);

onBack= output<void>();
onForward = output<void>();

/**
 * Emits back navigation event.
 */
back() {
  this.onBack.emit();
  console.log('Is clicked');
}

/**
 * Emits forward navigation event.
 */
forward() {
  this.onForward.emit();
  console.log('Is clicked');
}


}
