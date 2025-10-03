import { Container, Typography, Box, CircularProgress, Button, Alert } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { SearchBar } from './components/SearchBar';
import { MovieList } from './components/MovieList';
import { MovieDetail } from './components/MovieDetail';
import { Pagination } from './components/Pagination';
import { useMovies } from './hooks/useMovies';

function App() {
  const {
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
  } = useMovies();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom sx={{ mb: 3 }}>
        Movie Search
      </Typography>

      <SearchBar onSearch={handleSearch} disabled={loading} />

      {viewMode !== 'search' && (
        <Box sx={{ mb: 2 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={handleBackToSearch}
            variant="outlined"
          >
            Back to Search Results
          </Button>
          <Alert severity="info" sx={{ mt: 2 }}>
            Showing {viewMode === 'similar' ? 'similar' : 'recommended'} movies
          </Alert>
        </Box>
      )}

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 5 }}>
          <CircularProgress size={60} />
        </Box>
      )}

      {!loading && (
        <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', md: 'row' } }}>
          <Box sx={{ flex: 1 }}>
            <MovieList
              movies={movies}
              onMovieClick={setSelectedMovie}
              onShowSimilar={handleShowSimilar}
              onShowRecommended={handleShowRecommended}
              selectedMovieId={selectedMovie?.id}
              viewMode={viewMode}
            />
            {viewMode === 'search' && movies.length > 0 && (
              <Pagination
                currentPage={currentPage}
                onPageChange={(page) => handleSearch(searchQuery, page)}
                disabled={loading}
              />
            )}
          </Box>

          {selectedMovie && (
            <Box sx={{ flex: 1 }}>
              <MovieDetail movie={selectedMovie} />
            </Box>
          )}
        </Box>
      )}
    </Container>
  );
}

export default App;
