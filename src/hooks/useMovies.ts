import { useState } from 'react';
import { Movie } from '../types/movie';
import { searchMovies, getSimilarMovies, getRecommendedMovies } from '../services/graphql';

export type ViewMode = 'search' | 'similar' | 'recommended';

export const useMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('search');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = async (query: string, page: number = 1) => {
    if (!query.trim()) return;

    setLoading(true);
    setViewMode('search');
    setSearchQuery(query);
    setCurrentPage(page);
    try {
      const results = await searchMovies(query, page);
      setMovies(results);
      setSelectedMovie(null);
    } catch (error) {
      console.error('Search error:', error);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  const handleShowSimilar = async (movie: Movie) => {
    setLoading(true);
    setViewMode('similar');
    try {
      const similar = await getSimilarMovies(movie.id);
      setMovies(similar);
      setSelectedMovie(movie);
    } catch (error) {
      console.error('Similar movies error:', error);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  const handleShowRecommended = async (movie: Movie) => {
    setLoading(true);
    setViewMode('recommended');
    try {
      const recommended = await getRecommendedMovies(movie.id);
      setMovies(recommended);
      setSelectedMovie(movie);
    } catch (error) {
      console.error('Recommended movies error:', error);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  const handleBackToSearch = () => {
    if (searchQuery) {
      handleSearch(searchQuery, currentPage);
    }
  };

  return {
    movies,
    selectedMovie,
    loading,
    viewMode,
    currentPage,
    searchQuery,
    handleSearch,
    handleShowSimilar,
    handleShowRecommended,
    handleBackToSearch,
    setSelectedMovie,
  };
};
