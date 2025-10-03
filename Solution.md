# Movie Search Application - Solution

## Overview

A React TypeScript application for searching movies via TMDB GraphQL API with Wikipedia integration. Features include search with pagination, similar/recommended movies, and comprehensive E2E testing.

## Tech Stack

- **React 18** + **TypeScript** + **Vite** - Modern React setup
- **Material-UI 6** - Component library for UI consistency
- **graphql-request** - Lightweight GraphQL client
- **Axios** - REST API client for Wikipedia
- **Playwright** - E2E testing framework

## Architecture

```
src/
├── components/      # UI components (SearchBar, MovieList, MovieDetail, Pagination)
├── services/        # API integrations (GraphQL + Wikipedia REST)
├── hooks/           # Custom hooks (useMovies for state management)
├── types/           # TypeScript interfaces
└── App.tsx          # Main component
```

## Features Implemented ✅

**Core:**

- Movie search with pagination
- Display movie data (name, genres, rating, votes, poster thumbnail)
- Wikipedia summary integration with external link
- Loading spinners for async operations

**Bonus:**

- Similar/recommended movies via icon buttons
- Material-UI design system
- 7 E2E Playwright tests
- Dual-state navigation (search ↔ similar ↔ recommended)

## Areas for Improvement

**Architecture & State:**

- Introduce centralized state management (Zustand/Redux) for complex state sharing
- Add React Router for proper URL-based navigation and deep linking
- Implement React Query/TanStack Query for API caching and data synchronization
- Add error boundaries for graceful error handling at component level
- Configure ESLint + Prettier with pre-commit hooks (Husky)
- Generate TypeScript types from GraphQL schema (GraphQL Code Generator)
