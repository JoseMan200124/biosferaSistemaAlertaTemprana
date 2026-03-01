import { useQuery } from '@tanstack/react-query';
import { httpJson } from '@/shared/api/httpClient';
import { forecastSchema } from '@/entities/forecast';
import { env } from '@/shared/lib/env';

export function useForecast(stationId?: string) {
  const qs = stationId ? `?stationId=${encodeURIComponent(stationId)}` : '';
  return useQuery({
    queryKey: ['forecast', stationId ?? 'all'],
    queryFn: async () => forecastSchema.parse(await httpJson(`/forecast${qs}`)),
    staleTime: 60_000,
    refetchInterval: env.pollingForecastMs,
  });
}
