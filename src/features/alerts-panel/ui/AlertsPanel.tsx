'use client';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Skeleton from '@mui/material/Skeleton';
import Alert from '@mui/material/Alert';
import { useAlerts } from '@/features/alerts-panel/api/useAlerts';

const sevColor: Record<string, 'default' | 'warning' | 'error' | 'success' | 'info'> = {
  low: 'info',
  medium: 'warning',
  high: 'error',
};

export function AlertsPanel() {
  const q = useAlerts();

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 1 }}>
          Alertas
        </Typography>

        {q.isLoading && (
          <Stack spacing={1}>
            <Skeleton height={32} />
            <Skeleton height={32} />
            <Skeleton height={32} />
          </Stack>
        )}

        {q.isError && <Alert severity="error">No se pudieron cargar alertas.</Alert>}

        {q.data && (
          <Stack spacing={1}>
            {q.data.map((a) => (
              <Stack
                key={a.id}
                direction="row"
                spacing={1}
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {a.title}
                </Typography>
                <Chip size="small" color={sevColor[a.severity] ?? 'default'} label={a.severity} />
              </Stack>
            ))}
          </Stack>
        )}
      </CardContent>
    </Card>
  );
}
