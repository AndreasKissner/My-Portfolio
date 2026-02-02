import { Component } from '@angular/core';
import { HeaderTextComponent } from './portfolio-content/header-text/header-text.component';
import { ImageExampleComponent } from './portfolio-content/image-example/image-example.component';
import { TestAndNextComponent } from './portfolio-content/test-and-next/test-and-next.component';
import { PreviousNextComponent } from './portfolio-content/previous-next/previous-next.component';


@Component({
  selector: 'app-portfolio',
  imports: [HeaderTextComponent,ImageExampleComponent, TestAndNextComponent, PreviousNextComponent],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss',
})
export class PortfolioComponent {

}
