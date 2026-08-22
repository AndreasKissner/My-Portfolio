# Andreas Kissner — Portfolio

Personal portfolio website built with Angular 21. Showcases projects, skills, and background as a frontend developer, with a multilingual UI, an AI-powered chat assistant, and a working contact form.

**Live:** [andreas-kissner.cloud](https://developer.andreas-kissner.cloud)

## Features

- Responsive, mobile-first layout
- German / English localization (`@ngx-translate`)
- AI chat widget answering questions about the developer and the projects (n8n + DeepSeek)
- Contact form with email delivery and localized autoresponder (Brevo API)
- WCAG-compliant markup and accessible components
- 3D elements via Three.js

## Tech Stack

- **Frontend:** Angular 21, TypeScript, SCSS, RxJS
- **Backend/Integrations:** PHP (mail relay), Brevo (transactional email), n8n (chat automation)
- **Testing:** Vitest

## Development

```bash
npm install
ng serve
```

Runs at `http://localhost:4200/`.

## Build

```bash
ng build
```

Production artifacts are output to `dist/`.

## Testing

```bash
ng test
```

## Author

**Andreas Kissner**
[developer.andreas-kissner.cloud](https://developer.andreas-kissner.cloud) · [LinkedIn](https://www.linkedin.com/in/andreas-kissner-53557b347)
