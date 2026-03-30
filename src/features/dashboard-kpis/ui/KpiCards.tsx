// Rediseño visual de KPI cards con iconos y fallback mock
// para permitir avanzar en UI aunque la API falle.

'use client';

import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import AirIcon from '@mui/icons-material/Air';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';

import { useKpis } from '@/features/dashboard-kpis/api/useKpis';

const iconMap: Record<string, JSX.Element> = {
  temperature: <ThermostatIcon sx={{ color: '#3FADBA' }} />,
  humidity: <WaterDropIcon sx={{ color: '#3FADBA' }} />,
  wind: <AirIcon sx={{ color: '#3FADBA' }} />,
  precipitation: <ThunderstormIcon sx={{ color: '#3FADBA' }} />,
};

const mockKpis = [
  { key: 'temperature', label: 'Temperatura', value: 24, unit: '°C' },
  { key: 'humidity', label: 'Humedad', value: 78, unit: '%' },
  { key: 'wind', label: 'Viento', value: 12, unit: 'km/h' },
  { key: 'precipitation', label: 'Precipitación', value: 8, unit: 'mm' },
];

export function KpiCards() {
  const q = useKpis();

  if (q.isLoading) {
    return (
      <Grid container spacing={2}>
        {Array.from({ length: 4 }).map((_, i) => (
          <Grid key={i} item xs={12} sm={6} md={3}>
            <Skeleton variant="rounded" height={110} />
          </Grid>
        ))}
      </Grid>
    );
  }

  const kpisToRender = q.isError ? mockKpis : (q.data ?? mockKpis);

  return (
    <>
      {q.isError && (
        <Alert severity="info" sx={{ mb: 2 }}>
          No se pudieron cargar KPIs reales. Mostrando datos de prueba.
        </Alert>
      )}

      <Grid container spacing={2}>
        {kpisToRender.map((k) => (
          <Grid key={k.key} item xs={12} sm={6} md={3}>
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                border: '1px solid #E5E7EB',
                backgroundColor: '#FFFFFF',
                transition: 'all 0.2s ease',
                '&:hover': {
                  transform: 'translateY(-3px)',
                  boxShadow: '0 6px 16px rgba(0,0,0,0.12)',
                },
              }}
            >
              <CardContent
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  py: 2.5,
                }}
              >
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: '50%',
                    backgroundColor: 'rgba(63, 173, 186, 0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 6px 16px rgba(0,0,0,0.1)',
                    },
                  }}
                >
                  {iconMap[k.key] ?? <ThermostatIcon sx={{ color: '#3FADBA' }} />}
                </Box>

                <Box>
                  <Typography
                    variant="body2"
                    sx={{
                      color: '#184A72',
                      fontWeight: 600,
                      lineHeight: 1.2,
                    }}
                  >
                    {k.label}
                  </Typography>

                  <Typography
                    variant="h5"
                    sx={{
                      color: '#184A72',
                      fontWeight: 800,
                      mt: 0.5,
                    }}
                  >
                    {k.value}{' '}
                    <Box component="span" sx={{ color: '#3FADBA', fontWeight: 700 }}>
                      {k.unit ?? ''}
                    </Box>
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
