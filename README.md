# Movie Search Application

A React TypeScript application for searching movies using the TMDB GraphQL API and displaying Wikipedia summaries.

## Features

- 🔍 Movie search with pagination
- 📊 Display movie details (name, genres, rating, votes)
- 📖 Wikipedia integration for movie summaries
- 🎬 Similar and recommended movies
- ⚡ Loading spinners for async operations
- 🎨 Material-UI design
- ✅ Playwright tests

## Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Material-UI** - Component library
- **graphql-request** - GraphQL client
- **Axios** - HTTP client for Wikipedia API
- **Playwright** - E2E testing

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Run Tests

```bash
npm test
```

## Deployment to Vercel

### Option 1: Using Vercel CLI

1. Install Vercel CLI globally:

```bash
npm i -g vercel
```

2. Deploy:

```bash
vercel
```

### Option 2: Using Vercel Dashboard

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Vercel will auto-detect the Vite configuration
6. Click "Deploy"

The project is already configured with `vercel.json` for optimal deployment settings.

## Project Structure

```
src/
├── components/          # React components
│   ├── SearchBar.tsx   # Search input component
│   ├── MovieList.tsx   # Movie list with ratings
│   ├── MovieDetail.tsx # Wikipedia summary panel
│   └── Pagination.tsx  # Pagination controls
├── services/           # API services
│   ├── graphql.ts     # TMDB GraphQL queries
│   └── wikipedia.ts   # Wikipedia REST API
├── hooks/             # Custom React hooks
│   └── useMovies.ts   # Movie state management
├── types/             # TypeScript types
│   └── movie.ts       # Movie interfaces
├── App.tsx            # Main application
└── main.tsx           # Entry point

tests/
└── movie-search.spec.ts # E2E tests
```

## Usage

1. **Search Movies**: Enter a movie title in the search bar and click Search
2. **View Details**: Click on any movie to see its Wikipedia summary
3. **Related Movies**: Click the movie icon to see similar movies
4. **Recommended**: Click the recommend icon to see recommended movies
5. **Pagination**: Navigate through search results using Previous/Next buttons

## API Endpoints

- **TMDB GraphQL**: `https://tmdb.sandbox.zoosh.ie/graphql`
- **Wikipedia REST**: `https://en.wikipedia.org/api/rest_v1/page/summary/{title}`

## License

MIT
