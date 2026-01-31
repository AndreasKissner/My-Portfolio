import { Component, inject } from '@angular/core';
import { DialogService } from '../../../../shared-services/dialog-service';

@Component({
  selector: 'app-open-dialog-btn',
  imports: [],
  templateUrl: './open-dialog-btn.component.html',
  styleUrl: './open-dialog-btn.component.scss',
})
export class OpenDialogBtnComponent {
dialog = inject(DialogService)
}
