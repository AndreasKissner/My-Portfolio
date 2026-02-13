import { Component, inject } from '@angular/core';
import { InputFieldsEmailComponent } from './input-fields-email/input-fields-email.component';
import { CommonModule } from '@angular/common';
import { BtnPrimaerComponent } from "../../../../../shared/components/layout/btn-primaer/btn-primaer.component";
import { FormsModule, NgForm } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contact-email',
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

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.http.post(this.mailApiUrl, this.contactData)
        .subscribe({
          next: (response) => {
            this.mailSuccess = true; //
            form.resetForm();
            setTimeout(() => this.mailSuccess = false, 3000);
          },
         /*  error: (error) => {
            console.error('Fehler beim Senden:', error);
          } */
        });

    }
  }
}