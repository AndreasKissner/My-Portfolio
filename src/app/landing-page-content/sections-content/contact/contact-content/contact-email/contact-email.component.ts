import { Component, inject } from '@angular/core';
import { InputFieldsEmailComponent } from './input-fields-email/input-fields-email.component';
import { CommonModule } from '@angular/common';
import { BtnPrimaerComponent } from "../../../../../shared/components/layout/btn-primaer/btn-primaer.component";
import { FormsModule, NgForm } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { BackFlashComponent } from './back-flash/back-flash.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-contact-email',
  standalone: true,
  imports: [
    InputFieldsEmailComponent,
    CommonModule,
    BtnPrimaerComponent,
    FormsModule,
    TranslateModule,
    BackFlashComponent,
    RouterLink
  ],
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
  nameFocused = false;
  emailFocused = false;
  messageFocused = false;

  /**
  * Called when the form is submitted.
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
  * Sends the data to the Mail API.
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
  * Handles errors occurring during the HTTP request.
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
 * Displays validation errors when the form is submitted invalidly.
 */
  onInvalidSubmitAttempt(form: NgForm) {
    if (!form.valid) {
      form.control.markAllAsTouched();
      const emailControl = form.controls['userEmail'];
      if (emailControl && emailControl.invalid) {
        this.contactData.email = '';
        emailControl.markAsDirty();
        emailControl.setValue('');
      }
      const nameControl = form.controls['userName'];
      if (nameControl && nameControl.invalid) {
        this.contactData.name = '';
        nameControl.markAsDirty();
        nameControl.setValue('');
      }
      this.isFlashing = true;
      setTimeout(() => this.isFlashing = false, 500);
    }
  }

  /**
  * Resets the form after successful submission.
  */
  private processSuccess(form: NgForm) {
    this.mailSuccess = true;
    this.isSending = false;
    this.errorMessage = '';
    form.resetForm();
    this.contactData = { name: '', email: '', message: '', privacy: false };
    setTimeout(() => this.mailSuccess = false, 3000);
  }

  /**
  * Toggles the focus state of an input field.
  * First click: activates error style and hint placeholder.
  * Second click (while still in field): resets to default state.
  * @param flag - The focus flag to toggle ('nameFocused' | 'emailFocused' | 'messageFocused')
  * @param field - The NgModel reference of the input field
  */
  toggleFocus(flag: 'nameFocused' | 'emailFocused' | 'messageFocused', field: any) {
    if (this[flag]) {
      this[flag] = false;
      field.control.markAsUntouched();
    } else {
      this[flag] = true;
    }
  }
}