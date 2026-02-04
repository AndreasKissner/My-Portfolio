import { Component, inject, input, output } from '@angular/core';
import { PortfolioService } from '../../../../../shared-services/portfolio.service';


@Component({
  selector: 'app-previous-next',
  imports: [],
  templateUrl: './previous-next.component.html',
  styleUrl: './previous-next.component.scss',
})
export class PreviousNextComponent {
portfolioService = inject(PortfolioService);

indexActuel = input<number>(0);

//For Landing page  
onBack= output<void>();
onForward = output<void>();

  back(){
   this.onBack.emit();
  }

  forward(){
    this.onForward.emit();
  }

}
