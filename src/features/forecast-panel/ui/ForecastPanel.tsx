'use client';

import { useEffect, useMemo, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Divider from '@mui/material/Divider';
import CircularProgress from '@mui/material/CircularProgress';

import { getForecast } from '../api/getForecast';
import { useLocationStore } from '@/shared/store/useLocationStore';

type ForecastDay = {
  id: string;
  label: string;
  temperature: string;
  humidity: string;
  wind: string;
  precipitation: string;
  description: string;
};

const mockForecast: ForecastDay[] = [
  {
    id: 'day1',
    label: 'Hoy',
    temperature: '24 °C',
    humidity: '78 %',
    wind: '12 km/h',
    precipitation: '8 %',
    description: 'Nubes dispersas',
  },
  {
    id: 'day2',
    label: 'Mañana',
    temperature: '23 °C',
    humidity: '74 %',
    wind: '10 km/h',
    precipitation: '5 %',
    description: 'Lluvia ligera',
  },
  {
    id: 'day3',
    label: 'Vie',
    temperature: '25 °C',
    humidity: '70 %',
    wind: '14 km/h',
    precipitation: '3 %',
    description: 'Parcialmente nublado',
  },
  {
    id: 'day4',
    label: 'Sáb',
    temperature: '22 °C',
    humidity: '82 %',
    wind: '9 km/h',
    precipitation: '11 %',
    description: 'Lluvia moderada',
  },
  {
    id: 'day5',
    label: 'Dom',
    temperature: '21 °C',
    humidity: '85 %',
    wind: '8 km/h',
    precipitation: '15 %',
    description: 'Tormenta',
  },
];

const formatWeatherText = (text: string) => {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1);
};

const getTemperatureColor = (tempText: string) => {
  const temp = parseInt(tempText, 10);

  if (temp > 30) return '#E57373';
  if (temp > 20) return '#3FADBA';
  return '#64B5F6';
};

function getDayLabel(dateStr: string, index: number): string {
  const date = new Date(dateStr);

  if (index === 0) return 'Hoy';
  if (index === 1) return 'Mañana';

  const formatter = new Intl.DateTimeFormat('es-ES', {
    weekday: 'short',
  });

  const dayName = formatter.format(date).replace('.', '');
  return dayName.charAt(0).toUpperCase() + dayName.slice(1);
}

function buildDailyForecast(apiData: any): ForecastDay[] {
  if (!apiData?.list || !Array.isArray(apiData.list)) return mockForecast;

  const grouped = new Map<string, any[]>();

  for (const item of apiData.list) {
    const date = item.dt_txt?.split(' ')[0];
    if (!date) continue;

    if (!grouped.has(date)) {
      grouped.set(date, []);
    }

    grouped.get(date)?.push(item);
  }

  const days = Array.from(grouped.entries()).slice(0, 5);

  return days.map(([date, entries], index) => {
    const preferredEntry = entries.find((item) => item.dt_txt?.includes('12:00:00')) || entries[0];

    return {
      id: `day${index + 1}`,
      label: getDayLabel(date, index),
      temperature: `${Math.round(preferredEntry.main.temp)} °C`,
      humidity: `${preferredEntry.main.humidity} %`,
      wind: `${Math.round(preferredEntry.wind.speed * 3.6)} km/h`,
      precipitation: `${preferredEntry.pop ? Math.round(preferredEntry.pop * 100) : 0} %`,
      description: formatWeatherText(preferredEntry.weather?.[0]?.description ?? 'sin descripción'),
    };
  });
}

export function ForecastPanel() {
  const { selectedLocation } = useLocationStore();

  const [forecastData, setForecastData] = useState<ForecastDay[]>(mockForecast);
  const [selectedDayId, setSelectedDayId] = useState<string>('day1');
  const [cityName, setCityName] = useState<string>('Tegucigalpa');
  const [loading, setLoading] = useState(true);
  const [usingMock, setUsingMock] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const res = await getForecast(selectedLocation.lat, selectedLocation.lon);
        const transformed = buildDailyForecast(res);

        setForecastData(transformed);
        setSelectedDayId('day1');
        setCityName(res.city?.name ?? selectedLocation.municipio);
        setUsingMock(false);
        setError(false);
      } catch (err) {
        console.error('Error OpenWeather en ForecastPanel:', err);
        setForecastData(mockForecast);
        setSelectedDayId('day1');
        setCityName(selectedLocation.municipio);
        setUsingMock(true);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedLocation]);

  const selectedDay = forecastData.find((day) => day.id === selectedDayId) ?? forecastData[0];

  const infoMessage = useMemo(() => {
    if (loading) return '';
    if (usingMock) return 'Mostrando datos de prueba para el pronóstico.';
    return `Pronóstico real cargado para ${cityName}.`;
  }, [loading, usingMock, cityName]);

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
            fontSize: '1.5rem',
          }}
        >
          Pronóstico (Próximos días)
        </Typography>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Alert severity="info" sx={{ mb: 2 }}>
              {infoMessage}
            </Alert>

            {error && (
              <Alert severity="warning" sx={{ mb: 2 }}>
                No se pudo cargar la API en este momento. Se muestran datos mock.
              </Alert>
            )}

            <Stack
              direction="row"
              spacing={1.5}
              sx={{
                mb: 3,
                overflowX: 'auto',
                pb: 1,
              }}
            >
              {forecastData.map((day) => {
                const isActive = selectedDay.id === day.id;

                return (
                  <Button
                    key={day.id}
                    onClick={() => setSelectedDayId(day.id)}
                    variant={isActive ? 'contained' : 'outlined'}
                    sx={{
                      minWidth: 76,
                      px: 2,
                      py: 0.8,
                      borderRadius: 2,
                      textTransform: 'none',
                      fontWeight: 700,
                      whiteSpace: 'nowrap',
                      backgroundColor: isActive ? '#3FADBA' : '#FFFFFF',
                      color: isActive ? '#FFFFFF' : '#184A72',
                      borderColor: '#3FADBA',
                      boxShadow: 'none',
                      '&:hover': {
                        backgroundColor: isActive ? '#3599A5' : 'rgba(63, 173, 186, 0.08)',
                        borderColor: '#3FADBA',
                        boxShadow: 'none',
                      },
                    }}
                  >
                    {day.label}
                  </Button>
                );
              })}
            </Stack>

            <Divider sx={{ mb: 2 }} />

            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  sm: 'repeat(2, 1fr)',
                },
                gap: 2,
              }}
            >
              <Box
                sx={{
                  p: 2,
                  borderRadius: 2,
                  backgroundColor: '#F8FAFC',
                  border: '1px solid #E5E7EB',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
                }}
              >
                <Typography variant="body2" sx={{ color: '#184A72', fontWeight: 600 }}>
                  Temperatura
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    color: getTemperatureColor(selectedDay.temperature),
                    fontWeight: 800,
                    mt: 0.5,
                  }}
                >
                  {selectedDay.temperature}
                </Typography>
              </Box>

              <Box
                sx={{
                  p: 2,
                  borderRadius: 2,
                  backgroundColor: '#F8FAFC',
                  border: '1px solid #E5E7EB',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
                }}
              >
                <Typography variant="body2" sx={{ color: '#184A72', fontWeight: 600 }}>
                  Humedad
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    color: '#3FADBA',
                    fontWeight: 800,
                    mt: 0.5,
                  }}
                >
                  {selectedDay.humidity}
                </Typography>
              </Box>

              <Box
                sx={{
                  p: 2,
                  borderRadius: 2,
                  backgroundColor: '#F8FAFC',
                  border: '1px solid #E5E7EB',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
                }}
              >
                <Typography variant="body2" sx={{ color: '#184A72', fontWeight: 600 }}>
                  Viento
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    color: '#3FADBA',
                    fontWeight: 800,
                    mt: 0.5,
                  }}
                >
                  {selectedDay.wind}
                </Typography>
              </Box>

              <Box
                sx={{
                  p: 2,
                  borderRadius: 2,
                  backgroundColor: '#F8FAFC',
                  border: '1px solid #E5E7EB',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
                }}
              >
                <Typography variant="body2" sx={{ color: '#184A72', fontWeight: 600 }}>
                  Probabilidad de lluvia
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    color: '#3FADBA',
                    fontWeight: 800,
                    mt: 0.5,
                  }}
                >
                  {selectedDay.precipitation}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" sx={{ color: '#35566E' }}>
                Condición: {selectedDay.description}
              </Typography>
            </Box>
          </>
        )}
      </CardContent>
    </Card>
  );
}
