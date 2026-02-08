import { Component } from '@angular/core';
import { ContactTitleComponent } from './contact-content/contact-title/contact-title.component';
import { ContactProblemContentComponent } from './contact-content/contact-problem-content/contact-problem-content.component';
import { FooterComponent } from '../../../shared/components/layout/footer/footer.component';
import { ContactEmailComponent } from './contact-content/contact-email/contact-email.component';

@Component({
  selector: 'app-contact',
  imports: [ContactTitleComponent, ContactProblemContentComponent,FooterComponent, ContactEmailComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {

}
