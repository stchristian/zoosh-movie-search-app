# Movie Search Application - Solution

## Implementation Approach

This solution was built following specific technical requirements and clean code principles:

- React (no Next.js) with Material-UI, Axios, and graphql-request (latest versions)
- Clean code principles: DRY, YAGNI, KISS
- Clean architecture with separation of concerns (components, services, hooks, types)
- All core + bonus requirements implemented
- Playwright testing verified with MCP integration
- Vercel-ready deployment with `vercel.json`
- Pagination implemented for search queries

## Technical Highlights

**Architecture Decisions:**

- Custom `useMovies` hook encapsulates all movie state and side effects
- Service layer abstracts GraphQL and REST API integrations
- Full TypeScript type safety with dedicated interfaces

**State Management:**

- Local state via custom hook (sufficient for current complexity)
- Manages three view modes: search, similar, recommended
- Preserves search query and pagination state for back navigation

**API Integration:**

- TMDB GraphQL: `searchMovies`, `getSimilarMovies`, `getRecommendedMovies`
- Wikipedia REST API for movie summaries with error handling
- Loading states for all async operations

**Testing:**

- 7 E2E tests covering complete user flows

## Areas for Improvement

**Architecture & State:**

- Introduce centralized state management (Zustand/Redux) for complex cross-component state
- Add React Router for URL-based navigation and shareable movie links
- Implement React Query/TanStack Query for automatic caching and background sync
- Add error boundaries at route/section level for isolated error handling
- GraphQL Code Generator for auto-generated TypeScript types from schema
