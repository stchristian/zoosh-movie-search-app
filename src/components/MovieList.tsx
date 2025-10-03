import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Chip,
  Box,
  Typography,
  Paper,
  Rating,
  IconButton,
  Tooltip,
  Avatar,
} from "@mui/material";
import RecommendIcon from "@mui/icons-material/Recommend";
import SimilarIcon from "@mui/icons-material/Movie";
import MovieIcon from "@mui/icons-material/MovieOutlined";
import { Movie } from "../types/movie";
import { ViewMode } from "../hooks/useMovies";

interface MovieListProps {
  movies: Movie[];
  onMovieClick: (movie: Movie) => void;
  onShowSimilar?: (movie: Movie) => void;
  onShowRecommended?: (movie: Movie) => void;
  selectedMovieId?: string;
  viewMode: ViewMode;
}

export const MovieList = ({
  movies,
  onMovieClick,
  onShowSimilar,
  onShowRecommended,
  selectedMovieId,
  viewMode,
}: MovieListProps) => {
  if (movies.length === 0) {
    return (
      <Paper sx={{ p: 3, textAlign: "center" }}>
        <Typography color="text.secondary">No movies found</Typography>
      </Paper>
    );
  }

  return (
    <Paper elevation={2}>
      <List>
        {movies.map((movie) => (
          <ListItem
            key={movie.id}
            disablePadding
            secondaryAction={
              viewMode === "search" && (
                <Box sx={{ display: "flex", gap: 0.5 }}>
                  <Tooltip title="Show Similar Movies">
                    <IconButton
                      edge="end"
                      onClick={(e) => {
                        e.stopPropagation();
                        onShowSimilar?.(movie);
                      }}
                      size="small"
                    >
                      <SimilarIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Show Recommended Movies">
                    <IconButton
                      edge="end"
                      onClick={(e) => {
                        e.stopPropagation();
                        onShowRecommended?.(movie);
                      }}
                      size="small"
                    >
                      <RecommendIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              )
            }
            sx={{
              borderBottom: "1px solid",
              borderColor: "divider",
              "&:last-child": { borderBottom: "none" },
            }}
          >
            <ListItemButton
              onClick={() => onMovieClick(movie)}
              selected={selectedMovieId === movie.id}
            >
              <Avatar
                src={movie.poster?.small || movie.poster?.medium}
                alt={movie.name}
                variant="rounded"
                sx={{
                  width: 56,
                  height: 84,
                  mr: 2,
                  bgcolor: "grey.300",
                }}
              >
                {!movie.poster?.small && !movie.poster?.medium && <MovieIcon />}
              </Avatar>
              <ListItemText
                primary={<Typography variant="h6">{movie.name}</Typography>}
                slotProps={{
                  secondary: { component: "div" },
                }}
                secondary={
                  <Box sx={{ mt: 1 }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        mb: 1,
                      }}
                    >
                      <Rating
                        value={movie.score / 2}
                        precision={0.1}
                        readOnly
                        size="small"
                      />
                      <Typography variant="body2" color="text.secondary">
                        {movie.score.toFixed(1)}/10 ({movie.votes} votes)
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap" }}>
                      {movie.genres.map((genre) => (
                        <Chip key={genre.id} label={genre.name} size="small" />
                      ))}
                    </Box>
                  </Box>
                }
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};
