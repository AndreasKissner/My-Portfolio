import { Component } from '@angular/core';
import { LandingContainerComponent } from './landing-container/landing-container.component';


@Component({
  selector: 'app-landing-page',
  imports: [LandingContainerComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
})
export class LandingPageComponent {

}
