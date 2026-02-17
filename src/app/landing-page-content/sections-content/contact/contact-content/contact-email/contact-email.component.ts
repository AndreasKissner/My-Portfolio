import { Component, inject } from '@angular/core';
import { InputFieldsEmailComponent } from './input-fields-email/input-fields-email.component';
import { CommonModule } from '@angular/common';
import { BtnPrimaerComponent } from "../../../../../shared/components/layout/btn-primaer/btn-primaer.component";
import { FormsModule, NgForm } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contact-email',
  standalone: true,
  imports: [InputFieldsEmailComponent, CommonModule, BtnPrimaerComponent, FormsModule, TranslateModule],
  templateUrl: './contact-email.component.html',
  styleUrl: './contact-email.component.scss',
})
export class ContactEmailComponent {

  private http = inject(HttpClient);

  contactData = {
    name: '',
    email: '',
    message: '',
    privacy: false
  };

  private mailApiUrl = 'https://portfolio.andreaskissner.info/send_mail.php';

  mailSuccess = false;
  mailError = false; 
  isSending = false; 
  errorMessage = ''; // Diese Zeile sorgt dafür, dass dein HTML-Error verschwindet

  onSubmit(form: NgForm) {
    // Nur senden, wenn das Formular gültig ist UND nicht gerade schon ein Sendevorgang läuft
    if (form.valid && !this.isSending) {
      this.isSending = true;
      this.mailError = false;
      this.errorMessage = ''; 

      this.http.post(this.mailApiUrl, this.contactData)
        .subscribe({
          next: (response) => {
            this.processSuccess(form);
          },
          error: (error) => {
            // Falls PHP 200 OK liefert (Mail wurde gesendet), aber Textmüll das JSON-Parsing stört
            if (error.status === 200) {
              this.processSuccess(form);
            } else {
              this.mailError = true;
              this.isSending = false;
              this.errorMessage = 'Fehler beim Senden. Bitte versuche es später erneut.';
              console.error('Fehler beim Senden:', error);
            }
          }
        });
    }
  }

  private processSuccess(form: NgForm) {
    this.mailSuccess = true;
    this.isSending = false;
    this.errorMessage = '';
    form.resetForm();
    // Daten zurücksetzen
    this.contactData = { name: '', email: '', message: '', privacy: false };
    // Erfolgsmeldung nach 3 Sekunden ausblenden
    setTimeout(() => this.mailSuccess = false, 3000);
  }
}