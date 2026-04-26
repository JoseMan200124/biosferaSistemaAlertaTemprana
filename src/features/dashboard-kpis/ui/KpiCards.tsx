'use client';

import { useEffect, useState } from 'react';
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

import { getKpis, type KpiItem } from '../api/useKpis';
import { useLocationStore } from '@/shared/store/useLocationStore';

const mockKpis: KpiItem[] = [
  { key: 'temperature', label: 'Temperatura', value: 24, unit: '°C' },
  { key: 'humidity', label: 'Humedad', value: 78, unit: '%' },
  { key: 'wind', label: 'Viento', value: 12, unit: 'km/h' },
];

const getTemperatureColor = (temp: number) => {
  if (temp > 30) return '#E57373';
  if (temp > 20) return '#3FADBA';
  return '#64B5F6';
};

const getIcon = (key: string, value: number) => {
  switch (key) {
    case 'temperature':
      return <ThermostatIcon sx={{ color: getTemperatureColor(value) }} />;
    case 'humidity':
      return <WaterDropIcon sx={{ color: '#3FADBA' }} />;
    case 'wind':
      return <AirIcon sx={{ color: '#3FADBA' }} />;
    default:
      return <ThermostatIcon sx={{ color: '#3FADBA' }} />;
  }
};

const getIconBackground = (key: string, value: number) => {
  if (key === 'temperature') {
    if (value > 30) return 'rgba(229, 115, 115, 0.15)';
    if (value > 20) return 'rgba(63, 173, 186, 0.15)';
    return 'rgba(100, 181, 246, 0.15)';
  }

  return 'rgba(63, 173, 186, 0.15)';
};

export function KpiCards() {
  const { selectedLocation } = useLocationStore();

  const [kpis, setKpis] = useState<KpiItem[]>(mockKpis);
  const [loading, setLoading] = useState(true);
  const [usingMock, setUsingMock] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchKpis = async () => {
      setLoading(true);

      try {
        const data = await getKpis(selectedLocation.lat, selectedLocation.lon);
        setKpis(data);
        setUsingMock(false);
        setError(false);
      } catch (err) {
        console.error('Error OpenWeather en KpiCards:', err);
        setKpis(mockKpis);
        setUsingMock(true);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchKpis();
  }, [selectedLocation]);

  if (loading) {
    return (
      <Grid container spacing={2}>
        {Array.from({ length: 3 }).map((_, i) => (
          <Grid key={i} item xs={12} sm={6} md={4}>
            <Skeleton variant="rounded" height={110} />
          </Grid>
        ))}
      </Grid>
    );
  }

  return (
    <>
      <Alert severity="info" sx={{ mb: 2 }}>
        {usingMock
          ? 'No se pudieron cargar KPIs reales. Mostrando datos de prueba.'
          : `KPIs reales cargados para ${selectedLocation.municipio}.`}
      </Alert>

      {error && (
        <Alert severity="warning" sx={{ mb: 2 }}>
          No se pudo cargar la API en este momento. Se muestran datos mock.
        </Alert>
      )}

      <Grid container spacing={2}>
        {kpis.map((k) => {
          const isTemperature = k.key === 'temperature';
          const valueColor = isTemperature ? getTemperatureColor(k.value) : '#184A72';
          const unitColor = isTemperature ? getTemperatureColor(k.value) : '#3FADBA';

          return (
            <Grid key={k.key} item xs={12} sm={6} md={4}>
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
                  border: '1px solid #E5E7EB',
                  backgroundColor: '#FFFFFF',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
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
                      backgroundColor: getIconBackground(k.key, k.value),
                      border: '1px solid rgba(0,0,0,0.04)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    {getIcon(k.key, k.value)}
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
                        color: valueColor,
                        fontWeight: 800,
                        mt: 0.5,
                      }}
                    >
                      {Number(k.value).toFixed(0)}{' '}
                      <Box component="span" sx={{ color: unitColor, fontWeight: 700 }}>
                        {k.unit ?? ''}
                      </Box>
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
}
