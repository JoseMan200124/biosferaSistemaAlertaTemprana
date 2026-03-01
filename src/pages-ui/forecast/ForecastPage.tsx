'use client';

import Container from '@mui/material/Container';
import { SectionTitle } from '@/shared/ui';
import { ForecastPanel } from '@/features/forecast-panel';
import { FiltersPanel } from '@/features/filters';
import Grid from '@mui/material/Grid';

export function ForecastPage() {
  return (
    <Container maxWidth="xl" sx={{ py: 2 }}>
      <SectionTitle>Pronóstico</SectionTitle>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <FiltersPanel />
        </Grid>
        <Grid item xs={12} md={8}>
          <ForecastPanel />
        </Grid>
      </Grid>
    </Container>
  );
}
