import { Component, inject, signal, AfterViewInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { startTabRotation } from '../favicon-logic';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements AfterViewInit {

  protected readonly title = signal('myportfolio');
  private titleService = inject(Title);

  ngAfterViewInit() {
    history.replaceState(null, '', location.pathname); // Anti scroll move .
    window.scrollTo(0, 0);

    startTabRotation(this.titleService);
  }
}
