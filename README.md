# Portfolio

## Overview

This project is a clean, responsive portfolio for David Anthony, built with React, TypeScript, and Vite. The site is designed to present a professional frontend developer identity with a strong emphasis on clarity, responsive behavior, and maintainable content architecture.

## Features

- Mobile-first, responsive single-page layout
- Clean navigation with mobile menu behavior
- Professional hero, about, skills, projects, journey, resume, and contact sections
- Centralized portfolio content in a data module
- Resume link in a production-safe public folder
- Semantic HTML and accessible, readable interactions
- Dark theme with careful contrast and modern styling

## Technology Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- Lucide React

## Architecture

The application uses a lightweight structure centered around reusable UI components and a content-first data model. Portfolio content is kept separate from rendering logic so it can be updated without rewriting interface code.

## Project Structure

```text
src/
  components/
    layout/
    ui/
  data/
  lib/
  App.tsx
  index.css
  main.tsx
public/
  resume/
  favicon.svg
```

## Requirements

- Node.js 18+
- npm

## Installation

```bash
npm install
```

## Running Locally

```bash
npm run dev
```

## Development

```bash
npm run dev
```

## Production Build

```bash
npm run build
```

## Preview

```bash
npm run preview
```

## Testing

```bash
npm run lint
```

## Resume/CV

The resume is stored in the public folder at:

```text
public/resume/david-anthony-resume.html
```

To replace it, update the file in that location and keep the same path in the portfolio data file if needed.

## Deployment

This project is ready for deployment to Vercel using the standard Vite setup. In Vercel, import the repository and keep the default build settings:

- Build command: `npm run build`
- Output directory: `dist`

## Troubleshooting

- If the site does not render correctly, ensure dependencies are installed with `npm install`.
- If the resume page does not load, confirm the file exists in `public/resume`.
- If the mobile menu behaves incorrectly, check the header component and the `aria-expanded` state.

## Contributing

Contributions are welcome for content accuracy and UI polish. Please keep changes focused, accessible, and consistent with the portfolio's minimal visual direction.

## License

This project does not currently include a license file.
