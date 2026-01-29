import { Component, HostListener } from '@angular/core';
import { BtnPrimaerComponent } from '../../../../../shared/components/layout/btn-primaer/btn-primaer.component';
import { TranslateModule } from '@ngx-translate/core';
import { DialogComponent } from '../../../../../shared/components/layout/dialog/dialog.component';


@Component({
  selector: 'app-about-text-card',
  imports: [BtnPrimaerComponent, TranslateModule,DialogComponent
  ],
  templateUrl: './about-text-card.component.html',
  styleUrl: './about-text-card.component.scss',
})
export class AboutTextCardComponent {
  //For Dialog
  
showDialog = false;


}
