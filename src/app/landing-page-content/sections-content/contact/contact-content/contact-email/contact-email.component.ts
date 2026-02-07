import { Component } from '@angular/core';
import { InputFieldsEmailComponent } from './input-fields-email/input-fields-email.component';
import { CommonModule } from '@angular/common';
import { BtnPrimaerComponent } from "../../../../../shared/components/layout/btn-primaer/btn-primaer.component";

@Component({
  selector: 'app-contact-email',
  imports: [InputFieldsEmailComponent, CommonModule, BtnPrimaerComponent, BtnPrimaerComponent],
  templateUrl: './contact-email.component.html',
  styleUrl: './contact-email.component.scss',
})
export class ContactEmailComponent {

}
