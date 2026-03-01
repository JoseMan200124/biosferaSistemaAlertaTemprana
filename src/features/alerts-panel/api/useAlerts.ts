import { useQuery } from '@tanstack/react-query';
import { httpJson } from '@/shared/api/httpClient';
import { alertsSchema } from '@/entities/alert';
import { env } from '@/shared/lib/env';

export function useAlerts() {
  return useQuery({
    queryKey: ['alerts'],
    queryFn: async () => alertsSchema.parse(await httpJson('/alerts')),
    staleTime: 15_000,
    refetchInterval: env.pollingAlertsMs,
  });
}
