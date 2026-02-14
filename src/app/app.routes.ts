import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page-content/landing-page/landing-page.component';
import { LegalNoticeComponent } from './shared/legal/legal-notice/legal-notice.component';


export const routes: Routes = [
    {
        path: '', component : LandingPageComponent
    },
    {
        path: 'legal-notice' , component : LegalNoticeComponent
    }
];
