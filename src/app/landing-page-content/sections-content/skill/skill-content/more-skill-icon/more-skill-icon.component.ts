import { Component, inject } from '@angular/core';
import { OpenDialogBtnComponent } from '../../../../../shared/components/dialog-components/open-dialog-btn/open-dialog-btn.component';
import { DialogService } from '../../../../../shared-services/dialog-service';
import { DialogComponent } from '../../../../../shared/components/dialog-components/dialog/dialog.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-more-skill-icon',
  imports: [OpenDialogBtnComponent, DialogComponent, TranslateModule],
  templateUrl: './more-skill-icon.component.html',
  providers: [DialogService],
  styleUrl: './more-skill-icon.component.scss',
})
export class MoreSkillIconComponent {
  dialog = inject(DialogService)
}
