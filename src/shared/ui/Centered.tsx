import Box from '@mui/material/Box';
import type { ReactNode } from 'react';

export function Centered({ children }: { children: ReactNode }) {
  return (
    <Box sx={{ minHeight: '60vh', display: 'grid', placeItems: 'center' }}>
      {children}
    </Box>
  );
}
