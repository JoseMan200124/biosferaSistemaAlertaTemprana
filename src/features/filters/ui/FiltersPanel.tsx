'use client';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { StationsSelector } from '@/features/stations-selector';
import { useFiltersStore } from '@/features/filters/model/useFiltersStore';

export function FiltersPanel() {
  const stationId = useFiltersStore((s) => s.stationId);
  const setStationId = useFiltersStore((s) => s.setStationId);

  return (
    <Card variant="outlined">
      <CardContent>
        <Stack spacing={2}>
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            Filtros
          </Typography>
          <StationsSelector value={stationId} onChange={setStationId} />
        </Stack>
      </CardContent>
    </Card>
  );
}
