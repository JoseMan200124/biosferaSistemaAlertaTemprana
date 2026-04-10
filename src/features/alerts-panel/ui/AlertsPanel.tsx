'use client';

import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import AirRoundedIcon from '@mui/icons-material/AirRounded';
import LocalFireDepartmentRoundedIcon from '@mui/icons-material/LocalFireDepartmentRounded';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

import { getForecast } from '@/features/forecast-panel/api/getForecast';
import { useLocationStore } from '@/shared/store/useLocationStore';

type RealAlertItem = {
  id: string;
  title: string;
  description: string;
  level: 'high' | 'medium' | 'low';
  type: 'rain' | 'wind' | 'heat' | 'info';
};

function getAlertStyles(level: RealAlertItem['level']) {
  switch (level) {
    case 'high':
      return {
        bg: '#FEF2F2',
        border: '#FECACA',
        title: '#B91C1C',
      };
    case 'medium':
      return {
        bg: '#FFF7ED',
        border: '#FED7AA',
        title: '#C2410C',
      };
    case 'low':
    default:
      return {
        bg: '#EFF6FF',
        border: '#BFDBFE',
        title: '#1D4ED8',
      };
  }
}

function getAlertIcon(type: RealAlertItem['type']) {
  switch (type) {
    case 'rain':
      return <WarningAmberRoundedIcon sx={{ color: '#B91C1C' }} />;
    case 'wind':
      return <AirRoundedIcon sx={{ color: '#C2410C' }} />;
    case 'heat':
      return <LocalFireDepartmentRoundedIcon sx={{ color: '#B91C1C' }} />;
    case 'info':
    default:
      return <InfoOutlinedIcon sx={{ color: '#1D4ED8' }} />;
  }
}

function buildRealAlerts(apiData: any, cityName: string): RealAlertItem[] {
  if (!apiData?.list || !Array.isArray(apiData.list)) {
    return [
      {
        id: 'info-1',
        title: 'Monitoreo activo',
        description: `No se detectaron alertas relevantes para ${cityName}.`,
        level: 'low',
        type: 'info',
      },
    ];
  }

  const firstEntries = apiData.list.slice(0, 8); // aprox próximas 24h
  const maxPop = Math.max(...firstEntries.map((item: any) => item.pop ?? 0));
  const maxWindKmh = Math.max(...firstEntries.map((item: any) => (item.wind?.speed ?? 0) * 3.6));
  const maxTemp = Math.max(...firstEntries.map((item: any) => item.main?.temp ?? 0));

  const alerts: RealAlertItem[] = [];

  if (maxPop >= 0.6) {
    alerts.push({
      id: 'rain-high',
      title: 'Lluvia fuerte',
      description: `Probabilidad alta de lluvia en ${cityName} durante las próximas horas.`,
      level: 'high',
      type: 'rain',
    });
  } else if (maxPop >= 0.3) {
    alerts.push({
      id: 'rain-medium',
      title: 'Lluvia moderada',
      description: `Se recomienda monitoreo por posible lluvia en ${cityName}.`,
      level: 'medium',
      type: 'rain',
    });
  }

  if (maxWindKmh >= 35) {
    alerts.push({
      id: 'wind-high',
      title: 'Viento fuerte',
      description: `Se prevén ráfagas fuertes de viento en ${cityName}.`,
      level: 'high',
      type: 'wind',
    });
  } else if (maxWindKmh >= 20) {
    alerts.push({
      id: 'wind-medium',
      title: 'Viento moderado',
      description: `Se detectan condiciones de viento relevantes en ${cityName}.`,
      level: 'medium',
      type: 'wind',
    });
  }

  if (maxTemp >= 32) {
    alerts.push({
      id: 'heat-high',
      title: 'Calor alto',
      description: `Temperaturas elevadas previstas para ${cityName}.`,
      level: 'high',
      type: 'heat',
    });
  } else if (maxTemp >= 28) {
    alerts.push({
      id: 'heat-medium',
      title: 'Temperatura elevada',
      description: `Se recomienda seguimiento por temperaturas altas en ${cityName}.`,
      level: 'medium',
      type: 'heat',
    });
  }

  if (alerts.length === 0) {
    alerts.push({
      id: 'info-1',
      title: 'Monitoreo activo',
      description: `No se detectaron alertas críticas para ${cityName} en este momento.`,
      level: 'low',
      type: 'info',
    });
  }

  return alerts.slice(0, 3);
}

export function AlertsPanel() {
  const { selectedLocation } = useLocationStore();

  const [alerts, setAlerts] = useState<RealAlertItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [usingMock, setUsingMock] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchAlerts = async () => {
      setLoading(true);

      try {
        const res = await getForecast(selectedLocation.lat, selectedLocation.lon);
        const realAlerts = buildRealAlerts(res, res.city?.name ?? selectedLocation.municipio);

        setAlerts(realAlerts);
        setUsingMock(false);
        setError(false);
      } catch (err) {
        console.error('Error OpenWeather en AlertsPanel:', err);

        setAlerts([
          {
            id: 'mock-1',
            title: 'Monitoreo activo',
            description: `No se pudieron cargar alertas reales para ${selectedLocation.municipio}.`,
            level: 'low',
            type: 'info',
          },
        ]);

        setUsingMock(true);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchAlerts();
  }, [selectedLocation]);

  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
        border: '1px solid #E5E7EB',
        backgroundColor: '#FFFFFF',
      }}
    >
      <CardContent sx={{ p: 2.5 }}>
        <Typography
          variant="h6"
          sx={{
            color: '#184A72',
            fontWeight: 800,
            mb: 2,
          }}
        >
          Alertas
        </Typography>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 3 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Alert severity="info" sx={{ mb: 2 }}>
              {usingMock
                ? 'Mostrando alerta informativa de respaldo.'
                : `Alertas actualizadas para ${selectedLocation.municipio}.`}
            </Alert>

            {error && (
              <Alert severity="warning" sx={{ mb: 2 }}>
                No se pudo consultar la API en este momento.
              </Alert>
            )}

            <Stack spacing={1.5}>
              {alerts.map((alertItem) => {
                const styles = getAlertStyles(alertItem.level);

                return (
                  <Box
                    key={alertItem.id}
                    sx={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 1.5,
                      p: 1.75,
                      borderRadius: 2,
                      backgroundColor: styles.bg,
                      border: `1px solid ${styles.border}`,
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                      },
                    }}
                  >
                    <Box
                      sx={{
                        mt: 0.2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {getAlertIcon(alertItem.type)}
                    </Box>

                    <Box>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 700,
                          color: styles.title,
                          lineHeight: 1.2,
                        }}
                      >
                        {alertItem.title}
                      </Typography>

                      <Typography
                        variant="body2"
                        sx={{
                          color: '#35566E',
                          mt: 0.4,
                        }}
                      >
                        {alertItem.description}
                      </Typography>
                    </Box>
                  </Box>
                );
              })}
            </Stack>
          </>
        )}
      </CardContent>
    </Card>
  );
}
