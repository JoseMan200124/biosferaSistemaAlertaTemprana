export type KpiItem = {
  key: string;
  label: string;
  value: number;
  unit?: string;
};

export async function getKpis(lat: number, lon: number): Promise<KpiItem[]> {
  const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

  if (!apiKey) {
    throw new Error('No se encontró NEXT_PUBLIC_OPENWEATHER_API_KEY en .env.local');
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=es&appid=${apiKey}`;

  const res = await fetch(url);

  if (!res.ok) {
    const errorData = await res.json();
    console.error('Respuesta de error OpenWeather KPI:', errorData);
    throw new Error(errorData?.message || 'Error al obtener KPIs del clima');
  }

  const data = await res.json();

  return [
    {
      key: 'temperature',
      label: 'Temperatura',
      value: Math.round(data.main?.temp ?? 0),
      unit: '°C',
    },
    {
      key: 'humidity',
      label: 'Humedad',
      value: Math.round(data.main?.humidity ?? 0),
      unit: '%',
    },
    {
      key: 'wind',
      label: 'Viento',
      value: Math.round((data.wind?.speed ?? 0) * 3.6),
      unit: 'km/h',
    },
  ];
}
