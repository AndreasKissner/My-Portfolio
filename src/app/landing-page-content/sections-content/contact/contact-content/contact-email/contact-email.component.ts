import { Component } from '@angular/core';
import { InputFieldsEmailComponent } from './input-fields-email/input-fields-email.component';
import { CommonModule } from '@angular/common';
import { BtnPrimaerComponent } from "../../../../../shared/components/layout/btn-primaer/btn-primaer.component";
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-contact-email',
  imports: [InputFieldsEmailComponent, CommonModule, BtnPrimaerComponent, BtnPrimaerComponent, FormsModule],
  templateUrl: './contact-email.component.html',
  styleUrl: './contact-email.component.scss',
})
export class ContactEmailComponent {
contactData = {
  name: '',
  email: '',
  message: '',
  privacy: false
};

onSubmit(form: NgForm) {
  if (form.valid) {
    console.log('Formular-Daten:', this.contactData);
    // Hier schickst du die Daten an deinen Server oder Email-Service
    
    // Nach dem Senden das Formular zurücksetzen:
    form.resetForm();
  }
} 
}