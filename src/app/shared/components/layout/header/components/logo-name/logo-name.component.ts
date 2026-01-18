import { Component, input,  } from '@angular/core';

@Component({
  selector: 'app-logo-name',
  imports: [],
  templateUrl: './logo-name.component.html',
  styleUrl: './logo-name.component.scss',
})
export class LogoNameComponent {
 // Hier erstellen wir den "Briefkasten" für die Farbe
  color = input<string>('white');

}
