import { Component, inject, input } from '@angular/core';

import { ALinkBtnComponent } from '../../../../../shared/components/layout/a-link-btn/a-link-btn.component';
import { RouterModule } from '@angular/router';
import { OpenDialogBtnComponent } from '../../../../../shared/components/dialog-components/open-dialog-btn/open-dialog-btn.component';
import { DialogService } from '../../../../../shared-services/dialog-service';
import { TranslateModule } from '@ngx-translate/core';
import { DialogComponent } from '../../../../../shared/components/dialog-components/dialog/dialog.component';



@Component({
  selector: 'app-test-and-next',
  imports: [ALinkBtnComponent, RouterModule, OpenDialogBtnComponent,TranslateModule, DialogComponent],
  templateUrl: './test-and-next.component.html',
   providers: [DialogService],
  styleUrl: './test-and-next.component.scss',
})
export class TestAndNextComponent {
dialog = inject(DialogService);
}
