import { Component, input } from '@angular/core';

import { ALinkBtnComponent } from '../../../../../shared/components/layout/a-link-btn/a-link-btn.component';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-test-and-next',
  imports: [ALinkBtnComponent, RouterModule],
  templateUrl: './test-and-next.component.html',
  styleUrl: './test-and-next.component.scss',
})
export class TestAndNextComponent {

}
