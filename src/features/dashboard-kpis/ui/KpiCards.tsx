'use client';

import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import Alert from '@mui/material/Alert';
import { useKpis } from '@/features/dashboard-kpis/api/useKpis';

export function KpiCards() {
  const q = useKpis();

  if (q.isLoading) {
    return (
      <Grid container spacing={2}>
        {Array.from({ length: 4 }).map((_, i) => (
          <Grid key={i} item xs={12} sm={6} md={3}>
            <Skeleton height={92} />
          </Grid>
        ))}
      </Grid>
    );
  }

  if (q.isError) return <Alert severity="error">No se pudieron cargar KPIs.</Alert>;

  return (
    <Grid container spacing={2}>
      {q.data?.map((k) => (
        <Grid key={k.key} item xs={12} sm={6} md={3}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="caption" sx={{ opacity: 0.8 }}>
                {k.label}
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 800, mt: 0.5 }}>
                {k.value} {k.unit ?? ''}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
