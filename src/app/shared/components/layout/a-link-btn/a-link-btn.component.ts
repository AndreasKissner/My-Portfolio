import { Component, input } from '@angular/core';


@Component({
  selector: 'app-a-link-btn',
  imports: [],
  templateUrl: './a-link-btn.component.html',
  styleUrl: './a-link-btn.component.scss',
})
export class ALinkBtnComponent {
link = input<string>('');
}
