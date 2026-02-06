import { Component } from '@angular/core';
import { ReferenceTilteComponent } from './reference-content/reference-tilte/reference-tilte.component';
import { ReferenceBoxContentComponent } from '../../../shared/components/layout/reference-box-content/reference-box-content.component';
import { TranslateModule } from '@ngx-translate/core';


@Component({
  selector: 'app-reference',
  imports: [ReferenceTilteComponent,ReferenceBoxContentComponent,TranslateModule ],
  templateUrl: './reference.component.html',
  styleUrl: './reference.component.scss',
})
export class ReferenceComponent {

}
