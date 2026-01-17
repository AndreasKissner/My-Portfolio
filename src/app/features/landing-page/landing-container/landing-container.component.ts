import { Component } from '@angular/core';
import { LandingSectionComponent } from '../landing-section/landing-section.component';


@Component({
  selector: 'app-landing-container',
  imports: [LandingSectionComponent],
  templateUrl: './landing-container.component.html',
  styleUrl: './landing-container.component.scss',
})
export class LandingContainerComponent {
}
