import { Title } from '@angular/platform-browser';

export function startTabRotation(titleService: Title) {
  const favicon = document.getElementById('dynamic-favicon') as HTMLLinkElement;
  let step = 0;

  setInterval(() => {
    step = (step + 1) % 3;

    switch (step) {
      case 0:
        titleService.setTitle('Andreas');
        if (favicon) favicon.href = 'favicon/a.svg';
        break;
      case 1:
        titleService.setTitle('Kissner');
        if (favicon) favicon.href = 'favicon/k.svg';
        break;
      case 2:
        titleService.setTitle('Developer');
        if (favicon) favicon.href = 'favicon/d.svg';
        break;
    }
  }, 2000);
}