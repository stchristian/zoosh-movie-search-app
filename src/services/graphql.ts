import { GraphQLClient } from 'graphql-request';
import { Movie } from '../types/movie';

const GRAPHQL_ENDPOINT = 'https://tmdb.sandbox.zoosh.ie/graphql';

const client = new GraphQLClient(GRAPHQL_ENDPOINT);

const MOVIE_FIELDS = `
  id
  name
  overview
  genres {
    id
    name
  }
  score
  votes
  poster {
    small
    medium
  }
  releaseDate
`;

export const searchMovies = async (query: string, page: number = 1): Promise<Movie[]> => {
  const searchQuery = `
    query SearchMovies($query: String!, $page: PageRange!) {
      searchMovies(query: $query, page: $page, language: English) {
        ${MOVIE_FIELDS}
      }
    }
  `;

  const data = await client.request<{ searchMovies: Movie[] }>(searchQuery, {
    query,
    page,
  });

  return data.searchMovies;
};

export const getSimilarMovies = async (movieId: string): Promise<Movie[]> => {
  const similarQuery = `
    query GetMovie($id: ID!) {
      movie(id: $id, language: English) {
        similar(limit: 10) {
          ${MOVIE_FIELDS}
        }
      }
    }
  `;

  const data = await client.request<{ movie: { similar: Movie[] } }>(similarQuery, {
    id: movieId,
  });

  return data.movie.similar;
};

export const getRecommendedMovies = async (movieId: string): Promise<Movie[]> => {
  const recommendedQuery = `
    query GetMovie($id: ID!) {
      movie(id: $id, language: English) {
        recommended(limit: 10) {
          ${MOVIE_FIELDS}
        }
      }
    }
  `;

  const data = await client.request<{ movie: { recommended: Movie[] } }>(recommendedQuery, {
    id: movieId,
  });

  return data.movie.recommended;
};
