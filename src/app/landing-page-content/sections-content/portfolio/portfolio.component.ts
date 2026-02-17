import { Component, inject, OnInit, signal } from '@angular/core';
import { HeaderTextComponent } from './portfolio-content/header-text/header-text.component';
import { ImageExampleComponent } from './portfolio-content/image-example/image-example.component';
import { TestAndNextComponent } from './portfolio-content/test-and-next/test-and-next.component';
import { PreviousNextComponent } from './portfolio-content/previous-next/previous-next.component';
import { PortfolioJson } from '../../../interfaces/portfolio-interfaces';
import { PortfolioService } from '../../../shared-services/portfolio.service';


@Component({
  selector: 'app-portfolio',
  imports: [HeaderTextComponent, ImageExampleComponent, TestAndNextComponent, PreviousNextComponent],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss',
})
export class PortfolioComponent implements OnInit {
  private portService = inject(PortfolioService);

  allData = signal<PortfolioJson[]>([]);
  currentIndex = signal<number>(0);

  /** Loads data from the service and stores it in allData */
  ngOnInit() {
    this.portService.getData().subscribe(result => {
      this.allData.set(result);
    })
  }

  /** Moves to the next item (loops back to the start) */
  nextContent() {
    this.currentIndex.update(index => {
      if (index < 1) {
        return index + 1;
      } else {
        return 0;
      }
    });
  }

  /** Moves to the previous item (loops to the end) */
  prevContent() {
    this.currentIndex.update(index => {
      if (index > 0) {
        return index - 1;
      } else {
        return 1;
      }
    });
  }
}
