'use client';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import { SectionTitle } from '@/shared/ui';
import { ForecastPanel } from '@/features/forecast-panel';
import { FiltersPanel } from '@/features/filters';
import { MapView } from '@/features/map-view';

export function ForecastPage() {
  return (
    <Container
      maxWidth="xl"
      sx={{
        py: { xs: 2, md: 3 },
      }}
    >
      <SectionTitle>Pronóstico</SectionTitle>

      <Box sx={{ mb: { xs: 2, md: 3 } }}>
        <MapView />
      </Box>

      <Grid container spacing={{ xs: 2, md: 3 }}>
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
