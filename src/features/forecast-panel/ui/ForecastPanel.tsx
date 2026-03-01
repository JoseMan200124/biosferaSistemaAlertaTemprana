'use client';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import Alert from '@mui/material/Alert';
import ReactECharts from 'echarts-for-react';
import { useForecast } from '@/features/forecast-panel/api/useForecast';
import { useFiltersStore } from '@/features/filters/model/useFiltersStore';

export function ForecastPanel() {
  const stationId = useFiltersStore((s) => s.stationId);
  const q = useForecast(stationId);

  if (q.isLoading) {
    return (
      <Card variant="outlined">
        <CardContent>
          <Skeleton height={24} />
          <Skeleton height={220} />
        </CardContent>
      </Card>
    );
  }

  if (q.isError) return <Alert severity="error">No se pudo cargar pronóstico.</Alert>;

  const dates = q.data?.map((d) => d.date) ?? [];
  const precipitation = q.data?.map((d) => d.precipitationMm) ?? [];
  const temp = q.data?.map((d) => d.temperatureC) ?? [];

  const option = {
    tooltip: { trigger: 'axis' },
    legend: { data: ['Precipitación (mm)', 'Temperatura (°C)'] },
    xAxis: { type: 'category', data: dates },
    yAxis: [
      { type: 'value', name: 'mm' },
      { type: 'value', name: '°C' },
    ],
    series: [
      { name: 'Precipitación (mm)', type: 'bar', data: precipitation },
      { name: 'Temperatura (°C)', type: 'line', yAxisIndex: 1, data: temp },
    ],
  };

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 1 }}>
          Pronóstico
        </Typography>
        <ReactECharts option={option} style={{ height: 260 }} />
      </CardContent>
    </Card>
  );
}
