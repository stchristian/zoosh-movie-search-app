import { Box, Button, Typography } from '@mui/material';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

interface PaginationProps {
  currentPage: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
}

export const Pagination = ({ currentPage, onPageChange, disabled }: PaginationProps) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, mt: 3 }}>
      <Button
        variant="outlined"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={disabled || currentPage === 1}
        startIcon={<NavigateBeforeIcon />}
      >
        Previous
      </Button>
      <Typography variant="body1">
        Page {currentPage}
      </Typography>
      <Button
        variant="outlined"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={disabled}
        endIcon={<NavigateNextIcon />}
      >
        Next
      </Button>
    </Box>
  );
};
