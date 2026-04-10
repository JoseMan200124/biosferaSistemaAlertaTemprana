export async function getForecast(lat: number, lon: number) {
  const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

  console.log('API KEY detectada:', apiKey);

  if (!apiKey) {
    throw new Error('No se encontró NEXT_PUBLIC_OPENWEATHER_API_KEY en .env.local');
  }

  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&lang=es&appid=${apiKey}`;

  console.log('URL de request OpenWeather:', url);

  const res = await fetch(url);

  if (!res.ok) {
    const errorData = await res.json();
    console.error('Respuesta de error OpenWeather:', errorData);
    throw new Error(errorData?.message || 'Error al obtener datos del clima');
  }

  const data = await res.json();
  return data;
}
