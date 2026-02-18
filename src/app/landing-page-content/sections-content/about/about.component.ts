import { Component, inject } from '@angular/core';
import { AboutImageComponent } from './about-content/about-image/about-image.component';
import { AboutTextCardComponent } from './about-content/about-text-card/about-text-card.component';
import { AboutTitleComponent } from './about-content/about-title/about-title.component';

@Component({
  selector: 'app-about',
  imports: [ AboutImageComponent, AboutTextCardComponent, AboutTitleComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {

}
