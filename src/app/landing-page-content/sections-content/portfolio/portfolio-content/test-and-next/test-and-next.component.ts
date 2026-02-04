import { Component, inject, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OpenDialogBtnComponent } from '../../../../../shared/components/dialog-components/open-dialog-btn/open-dialog-btn.component';
import { DialogService } from '../../../../../shared-services/dialog-service';
import { TranslateModule } from '@ngx-translate/core';
import { DialogComponent } from '../../../../../shared/components/dialog-components/dialog/dialog.component';
import { UtilyDescriptionComponent } from './utily-description/utily-description.component';
import { LinkGitProjectComponent } from "./link-git-project/link-git-project.component";
import { PortfolioService } from '../../../../../shared-services/portfolio.service';



@Component({
  selector: 'app-test-and-next',
  imports: [RouterModule, OpenDialogBtnComponent, TranslateModule, DialogComponent, UtilyDescriptionComponent, UtilyDescriptionComponent, LinkGitProjectComponent],
  templateUrl: './test-and-next.component.html',
   providers: [DialogService],
  styleUrl: './test-and-next.component.scss',
})
export class TestAndNextComponent {
portfolioService = inject(PortfolioService);
  
dialog = inject(DialogService);
}
