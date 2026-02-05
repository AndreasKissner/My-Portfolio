import { Component } from '@angular/core';
import { ReferenceTilteComponent } from './reference-content/reference-tilte/reference-tilte.component';
import { ReferenceBoxContentComponent } from '../../../shared/components/layout/reference-box-content/reference-box-content.component';


@Component({
  selector: 'app-reference',
  imports: [ReferenceTilteComponent,ReferenceBoxContentComponent ],
  templateUrl: './reference.component.html',
  styleUrl: './reference.component.scss',
})
export class ReferenceComponent {

}
