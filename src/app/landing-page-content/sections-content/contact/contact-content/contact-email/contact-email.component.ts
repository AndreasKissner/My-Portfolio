import { Component, inject } from '@angular/core';
import { InputFieldsEmailComponent } from './input-fields-email/input-fields-email.component';
import { CommonModule } from '@angular/common';
import { BtnPrimaerComponent } from "../../../../../shared/components/layout/btn-primaer/btn-primaer.component";
import { FormsModule, NgForm } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { BackFlashComponent } from './back-flash/back-flash.component';

@Component({
  selector: 'app-contact-email',
  standalone: true,
  imports: [InputFieldsEmailComponent, CommonModule, BtnPrimaerComponent, FormsModule, TranslateModule, BackFlashComponent],
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
  errorMessage = '';
  isFlashing = false;

  /**
 * Called when the form is submitted.
 * Checks if the form is valid and no request is currently in progress.
 * If valid, it starts sending the email.
 * 
 * @param form - The Angular form (NgForm)
 */
  onSubmit(form: NgForm) {
    if (form.valid && !this.isSending) {
      this.isSending = true;
      this.mailError = false;
      this.errorMessage = '';
      this.sendMail(form);
    }
  }

  /**
   * Sends the form data to the mail API.
   * Handles the response and delegates success or error handling.
   * 
   * @param form - The Angular form (NgForm)
   */
  private sendMail(form: NgForm) {
    this.http.post(this.mailApiUrl, this.contactData)
      .subscribe({
        next: () => {
          this.processSuccess(form);
        },
        error: (error) => {
          this.handleError(error, form);
        }
      });
  }

  /**
   * Handles errors from the mail request.
   * If the server returns status 200 in an error, it is treated as success.
   * Otherwise, an error state is set and a message is shown.
   * 
   * @param error - The HTTP error response
   * @param form - The Angular form (NgForm)
   */

  private handleError(error: any, form: NgForm) {
    if (error.status === 200) {
      this.processSuccess(form);
    } else {
      this.mailError = true;
      this.isSending = false;
      this.errorMessage = 'CONTACT.ERROR_MESSAGE';

      setTimeout(() => this.mailError = false, 3000);
    }
  }

  /**
  * Called when the user tries to submit an invalid form.
  * Marks all fields as touched to show validation errors
  * and triggers a flash animation.
  * 
  * @param form - The Angular form (NgForm)
  */

  onInvalidSubmitAttempt(form: NgForm) {
    if (!form.valid) {
      form.control.markAllAsTouched();
      this.isFlashing = true;
      setTimeout(() => this.isFlashing = false, 500);
    }
  }

  /**
   * Handles a successful mail submission.
   * Resets the form, clears the data, and shows a success message.
   * 
   * @param form - The Angular form (NgForm)
   */
  private processSuccess(form: NgForm) {
    this.mailSuccess = true;
    this.isSending = false;
    this.errorMessage = '';
    form.resetForm();
    this.contactData = { name: '', email: '', message: '', privacy: false };
    setTimeout(() => this.mailSuccess = false, 3000);
  }
}