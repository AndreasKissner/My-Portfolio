import { Component } from '@angular/core';
import { ProfilImageContainerComponent } from './hero-content/profil-image-container/profil-image-container.component';
import { BtnPrimaerComponent } from '../../../shared/components/layout/btn-primaer/btn-primaer.component';
import { TextContentComponent } from './hero-content/text-content/text-content.component';
import { ScrollDownElementComponent } from "./hero-content/scroll-down-element/scroll-down-element.component";

ServiceWorker

@Component({
  selector: 'app-hero',
  imports: [ProfilImageContainerComponent, BtnPrimaerComponent, TextContentComponent, ScrollDownElementComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent {

}
