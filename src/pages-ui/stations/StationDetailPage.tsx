'use client';

import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { SectionTitle } from '@/shared/ui';

export function StationDetailPage({ id }: { id: string }) {
  return (
    <Container maxWidth="md" sx={{ py: 2 }}>
      <Stack spacing={1}>
        <SectionTitle>Estación</SectionTitle>
        <Typography variant="body1" sx={{ opacity: 0.9 }}>
          ID: {id}
        </Typography>
      </Stack>
    </Container>
  );
}
