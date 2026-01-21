import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { startTabRotation } from '../favicon-logic';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('myportfolio');
    private titleService = inject(Title);

     ngOnInit() {
    // Einfach die ausgelagerte Funktion aufrufen
    startTabRotation(this.titleService);
  }

  
}
