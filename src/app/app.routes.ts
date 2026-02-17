import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page-content/landing-page/landing-page.component';
import { LegalNoticeComponent } from './shared/legal/legal-notice/legal-notice.component';
import { PrivacyPoliceComponent } from './shared/legal/privacy/privacy-police/privacy-police.component';


export const routes: Routes = [
    {
        path: '', component : LandingPageComponent
    },
    {
        path: 'legal-notice' , component : LegalNoticeComponent
    },
      {
        path: 'privacy-policy' , component : PrivacyPoliceComponent
    },

];
