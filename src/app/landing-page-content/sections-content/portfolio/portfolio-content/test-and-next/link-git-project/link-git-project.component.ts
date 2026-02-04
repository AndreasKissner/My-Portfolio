import { Component, input } from '@angular/core';
import { ALinkBtnComponent } from '../../../../../../shared/components/layout/a-link-btn/a-link-btn.component';

@Component({
  selector: 'app-link-git-project',
  imports: [ALinkBtnComponent],
  templateUrl: './link-git-project.component.html',
  styleUrl: './link-git-project.component.scss',
})
export class LinkGitProjectComponent {

  linkGit = input<string | undefined>();
  linkLive = input<string | undefined>();
}
