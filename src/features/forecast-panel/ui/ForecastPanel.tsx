// ForecastPanel rediseñado segun mockup aprobado.
// Usa datos mock temporales mientras se conecta la API real.

'use client';

import { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Divider from '@mui/material/Divider';

type ForecastDay = {
  id: string;
  label: string;
  temperature: string;
  humidity: string;
  wind: string;
  precipitation: string;
};

const mockForecast: ForecastDay[] = [
  {
    id: 'day1',
    label: 'Día 1',
    temperature: '24 °C',
    humidity: '78 %',
    wind: '12 km/h',
    precipitation: '8 mm',
  },
  {
    id: 'day2',
    label: 'Día 2',
    temperature: '23 °C',
    humidity: '74 %',
    wind: '10 km/h',
    precipitation: '5 mm',
  },
  {
    id: 'day3',
    label: 'Día 3',
    temperature: '25 °C',
    humidity: '70 %',
    wind: '14 km/h',
    precipitation: '3 mm',
  },
  {
    id: 'day4',
    label: 'Día 4',
    temperature: '22 °C',
    humidity: '82 %',
    wind: '9 km/h',
    precipitation: '11 mm',
  },
  {
    id: 'day5',
    label: 'Día 5',
    temperature: '21 °C',
    humidity: '85 %',
    wind: '8 km/h',
    precipitation: '15 mm',
  },
];

export function ForecastPanel() {
  const [selectedDay, setSelectedDay] = useState<ForecastDay>(mockForecast[0]);

  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
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

        <Alert severity="info" sx={{ mb: 2 }}>
          Mostrando datos de prueba para el pronóstico.
        </Alert>

        <Stack
          direction="row"
          spacing={1.5}
          sx={{
            mb: 3,
            overflowX: 'auto',
            pb: 1,
          }}
        >
          {mockForecast.map((day) => {
            const isActive = selectedDay.id === day.id;

            return (
              <Button
                key={day.id}
                onClick={() => setSelectedDay(day)}
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
                  boxShadow: isActive ? 'none' : undefined,
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
            <Typography variant="h6" sx={{ color: '#3FADBA', fontWeight: 800, mt: 0.5 }}>
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
            <Typography variant="h6" sx={{ color: '#3FADBA', fontWeight: 800, mt: 0.5 }}>
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
            <Typography variant="h6" sx={{ color: '#3FADBA', fontWeight: 800, mt: 0.5 }}>
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
              Precipitación
            </Typography>
            <Typography variant="h6" sx={{ color: '#3FADBA', fontWeight: 800, mt: 0.5 }}>
              {selectedDay.precipitation}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
