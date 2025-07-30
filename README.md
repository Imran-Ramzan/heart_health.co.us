# Heart Health Score App

This is a React + TypeScript + Vite application for estimating heart health metrics using a simple scan interface. The app features a modern UI styled with Tailwind CSS and includes three main pages:

- **ScanPage**: Guides the user through a scan process.
- **ResultsPage**: Displays estimated heart health metrics and allows navigation to detailed analysis.
- **DetailsPage**: Provides a deeper breakdown of pulse rate and related health information.

## Features

- **React + TypeScript**: Component-based architecture for maintainability.
- **Tailwind CSS**: Utility-first styling for rapid UI development.
- **Vite**: Fast development server and build tool.
- **SVG Visualizations**: Custom graphics for health metrics.
- **Responsive Design**: Optimized for mobile and desktop.
- **ESLint**: Linting with recommended rules for JS, TS, React, and Vite.

## File Structure

```
src/
  App.tsx                # Main app logic, handles page navigation
  main.tsx               # Entry point, renders App
  index.css              # Tailwind and custom styles
  vite-env.d.ts          # Vite TypeScript types
  components/
    ScanPage.tsx         # Scan page UI
    ResultsPage.tsx      # Results summary UI
    DetailsPage.tsx      # Detailed analysis UI
public/
  ...                    # Static assets
vite.config.ts           # Vite configuration (React, Tailwind plugins)
eslint.config.js         # ESLint configuration
```

## Development

Install dependencies and start the dev server:

```bash
npm install
npm run dev
```

## Linting

Lint your code with:

```bash
npm run lint
```

## How it Works

This app provides estimated heart health metrics for awareness and general wellness. It is not a substitute for professional medical advice.

## Customization

- **Styling**: Edit `src/index.css` for custom styles.
- **Metrics**: Update values and logic in `ScanPage.tsx`, `ResultsPage.tsx`, and `DetailsPage.tsx` as needed.
