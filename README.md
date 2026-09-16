# MiniGames - Story 1

## Overview

MiniGames is a Single Page Application (SPA) built for the RS School qualifying stage. Story 1 focuses on setting up project architecture, tooling, responsive design tokens, and implementing the Home Page layout and Auth Dialog.

## Tech Stack

- **Language**: TypeScript (`strict: true`)
- **Bundler**: Vite
- **Styles**: Sass (SCSS) with centralized design tokens & mixins
- **Code Quality**: ESLint (`@typescript-eslint`, `eslint-plugin-unicorn`), Prettier, Husky git hooks
- **Architecture**: SPA (dynamic DOM rendering without JS frameworks)

## Available Scripts

- `npm run dev`: Start Vite development server
- `npm run build`: Build production assets (`tsc` checking + `vite build`)
- `npm run preview`: Locally preview production build
- `npm run lint`: Run ESLint checks across codebase
- `npm run lint:fix`: Fix ESLint automatic issues
- `npm run format`: Format codebase with Prettier
- `npm run format:check`: Check formatting with Prettier
- `npm run prepare`: Initialize Husky git hooks

## Project Structure

```text
src/
├── app/          # SPA entry point and router
├── pages/        # SPA page views (Home, etc.)
├── components/   # UI components (Header, Footer, Dialogs)
├── features/     # Feature-specific modules (Hero, Carousel, Leaderboard)
├── styles/       # Sass tokens, mixins, breakpoints, global styles
├── assets/       # Icons and images
└── utils/        # Shared helper functions
```
