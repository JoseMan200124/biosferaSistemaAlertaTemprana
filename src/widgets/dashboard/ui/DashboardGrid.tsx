'use client';

import Grid from '@mui/material/Grid';
import { KpiCards } from '@/features/dashboard-kpis';
import { MapView } from '@/features/map-view';
import { AlertsPanel } from '@/features/alerts-panel';
import { ForecastPanel } from '@/features/forecast-panel';
import { FiltersPanel } from '@/features/filters';

export function DashboardGrid() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <KpiCards />
      </Grid>

      <Grid item xs={12} lg={8}>
        <MapView />
      </Grid>

      <Grid item xs={12} lg={4}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FiltersPanel />
          </Grid>
          <Grid item xs={12}>
            <AlertsPanel />
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <ForecastPanel />
      </Grid>
    </Grid>
  );
}
