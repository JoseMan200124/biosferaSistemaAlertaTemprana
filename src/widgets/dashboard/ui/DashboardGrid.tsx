// Layout reorganizado para acercarse al mockup aprobado:
// mapa arriba, pronostico debajo y columna derecha con filtros + alertas.
'use client';

import Grid from '@mui/material/Grid';
import { KpiCards } from '@/features/dashboard-kpis';
import { MapView } from '@/features/map-view';
import { AlertsPanel } from '@/features/alerts-panel';
import { ForecastPanel } from '@/features/forecast-panel';
import { FiltersPanel } from '@/features/filters';

export function DashboardGrid() {
  return (
    <Grid container spacing={3} alignItems="stretch">
      {/* KPIs arriba */}
      <Grid item xs={12}>
        <KpiCards />
      </Grid>

      {/* Columna izquierda: mapa + pronóstico */}
      <Grid item xs={12} lg={8}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <MapView />
          </Grid>

          <Grid item xs={12}>
            <ForecastPanel />
          </Grid>
        </Grid>
      </Grid>

      {/* Columna derecha: filtros + alertas */}
      <Grid item xs={12} lg={4}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FiltersPanel />
          </Grid>

          <Grid item xs={12}>
            <AlertsPanel />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
