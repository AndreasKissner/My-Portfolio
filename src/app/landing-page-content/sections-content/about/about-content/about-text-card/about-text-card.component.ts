import { Component, HostListener, inject } from '@angular/core';
import { BtnPrimaerComponent } from '../../../../../shared/components/layout/btn-primaer/btn-primaer.component';
import { TranslateModule } from '@ngx-translate/core';
import { DialogComponent } from '../../../../../shared/components/dialog-components/dialog/dialog.component';
import { OpenDialogBtnComponent } from '../../../../../shared/components/dialog-components/open-dialog-btn/open-dialog-btn.component';
import { DialogService } from '../../../../../shared-services/dialog-service';

@Component({

  selector: 'app-about-text-card',
  imports: [BtnPrimaerComponent, TranslateModule, OpenDialogBtnComponent, DialogComponent
  ],
  providers: [DialogService],
  templateUrl: './about-text-card.component.html',
  styleUrl: './about-text-card.component.scss',
})
export class AboutTextCardComponent {
  dialog = inject(DialogService);
  showDialog = false;
}
