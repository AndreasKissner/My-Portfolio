import { Component } from '@angular/core';
import { TextBoxComponent } from './skill-content/text-box/text-box.component';
import { TenIconsComponent } from "./skill-content/ten-icons/ten-icons.component";
import { MoreSkillIconComponent } from "./skill-content/more-skill-icon/more-skill-icon.component";

@Component({
  selector: 'app-skill',
  imports: [TextBoxComponent, TenIconsComponent, MoreSkillIconComponent],
  templateUrl: './skill.component.html',
  styleUrl: './skill.component.scss',
})
export class SkillComponent {

}
