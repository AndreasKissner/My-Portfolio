import { Component } from '@angular/core';
import { ContactTitleComponent } from './contact-content/contact-title/contact-title.component';
import { ContactProblemContentComponent } from './contact-content/contact-problem-content/contact-problem-content.component';

@Component({
  selector: 'app-contact',
  imports: [ContactTitleComponent, ContactProblemContentComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {

}
