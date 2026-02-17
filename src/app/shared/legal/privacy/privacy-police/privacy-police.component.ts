import { Component } from '@angular/core';
import { HeaderComponent } from '../../../components/layout/header/header.component';
import { FooterComponent } from '../../../components/layout/footer/footer.component';
import { TranslateModule } from '@ngx-translate/core';
import { TwoIconsComponent } from '../../../../landing-page-content/sections-content/contact/contact-content/two-icons/two-icons.component';
import { BackFlashComponent } from '../../../../landing-page-content/sections-content/contact/contact-content/contact-email/back-flash/back-flash.component';

@Component({
  selector: 'app-privacy-police',
  imports: [HeaderComponent,FooterComponent,TranslateModule,TwoIconsComponent,BackFlashComponent],
  templateUrl: './privacy-police.component.html',
  styleUrl: './privacy-police.component.scss',
})
export class PrivacyPoliceComponent {

}
