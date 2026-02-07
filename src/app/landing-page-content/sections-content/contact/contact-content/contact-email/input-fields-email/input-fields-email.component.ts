import { Component, input } from '@angular/core';

@Component({
  selector: 'app-input-fields-email',
  imports: [],
  templateUrl: './input-fields-email.component.html',
  styleUrl: './input-fields-email.component.scss',
})
export class InputFieldsEmailComponent {
labelText = input.required<string>();
}
