import { Component, input,  } from '@angular/core';

@Component({
  selector: 'app-logo-name',
  imports: [],
  templateUrl: './logo-name.component.html',
  styleUrl: './logo-name.component.scss',
})

export class LogoNameComponent {
  color = input<string>('white');
}
