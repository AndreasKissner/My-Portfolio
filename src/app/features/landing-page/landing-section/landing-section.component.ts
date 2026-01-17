import { Component, input } from '@angular/core';
import { HeaderComponent } from '../../../shared/components/layout/header/header.component';
import { FooterComponent } from '../../../shared/components/layout/footer/footer.component';

@Component({
  selector: 'app-landing-section',
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './landing-section.component.html',
  styleUrl: './landing-section.component.scss',
})
export class LandingSectionComponent {
showFooter = input<boolean>(false);
}
