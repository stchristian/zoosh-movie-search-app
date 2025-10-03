import { useState, FormEvent } from 'react';
import { TextField, Button, Box, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface SearchBarProps {
  onSearch: (query: string, page: number) => void;
  disabled?: boolean;
}

export const SearchBar = ({ onSearch, disabled }: SearchBarProps) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query, 1);
    }
  };

  return (
    <Paper elevation={1} sx={{ p: 2, mb: 3 }}>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', gap: 1 }}>
        <TextField
          fullWidth
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for movies..."
          disabled={disabled}
          size="medium"
        />
        <Button
          type="submit"
          variant="contained"
          disabled={disabled || !query.trim()}
          startIcon={<SearchIcon />}
        >
          Search
        </Button>
      </Box>
    </Paper>
  );
};
