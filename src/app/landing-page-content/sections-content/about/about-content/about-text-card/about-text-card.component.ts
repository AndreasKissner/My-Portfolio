import { Component } from '@angular/core';
import { BtnPrimaerComponent } from '../../../../../shared/components/layout/btn-primaer/btn-primaer.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-about-text-card',
  imports: [BtnPrimaerComponent, TranslateModule],
  templateUrl: './about-text-card.component.html',
  styleUrl: './about-text-card.component.scss',
})
export class AboutTextCardComponent {

}
