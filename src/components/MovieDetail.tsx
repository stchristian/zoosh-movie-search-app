import { useEffect, useState } from 'react';
import {
  Paper,
  Typography,
  Box,
  CircularProgress,
  Link,
  Divider,
  Alert,
} from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Movie, WikipediaSummary } from '../types/movie';
import { getWikipediaSummary } from '../services/wikipedia';

interface MovieDetailProps {
  movie: Movie;
}

export const MovieDetail = ({ movie }: MovieDetailProps) => {
  const [summary, setSummary] = useState<WikipediaSummary | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchSummary = async () => {
      setLoading(true);
      setError(false);
      const data = await getWikipediaSummary(movie.name);
      if (data) {
        setSummary(data);
      } else {
        setError(true);
      }
      setLoading(false);
    };

    fetchSummary();
  }, [movie.id, movie.name]);

  return (
    <Paper elevation={2} sx={{ p: 3 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        {movie.name}
      </Typography>

      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {movie.overview}
        </Typography>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Typography variant="h6" gutterBottom>
        Wikipedia Summary
      </Typography>

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 3 }}>
          <CircularProgress />
        </Box>
      )}

      {!loading && error && (
        <Alert severity="info">
          Wikipedia summary not available for this movie.
        </Alert>
      )}

      {!loading && !error && summary && (
        <Box>
          <Typography variant="body1" paragraph>
            {summary.extract}
          </Typography>
          {summary.content_urls?.desktop?.page && (
            <Link
              href={summary.content_urls.desktop.page}
              target="_blank"
              rel="noopener noreferrer"
              sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
            >
              Read more on Wikipedia
              <OpenInNewIcon fontSize="small" />
            </Link>
          )}
        </Box>
      )}
    </Paper>
  );
};
