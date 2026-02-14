import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/layout/header/header.component';
import { FooterComponent } from "../../components/layout/footer/footer.component";
import { TranslateModule } from '@ngx-translate/core';
import { TwoIconsComponent } from '../../../landing-page-content/sections-content/contact/contact-content/two-icons/two-icons.component';

@Component({
  selector: 'app-legal-notice',
  imports: [HeaderComponent, FooterComponent, FooterComponent,TranslateModule, TwoIconsComponent],
  templateUrl: './legal-notice.component.html',
  styleUrl: './legal-notice.component.scss',
})
export class LegalNoticeComponent {

}
