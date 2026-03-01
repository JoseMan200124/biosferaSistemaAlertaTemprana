import { useQuery } from '@tanstack/react-query';
import { httpJson } from '@/shared/api/httpClient';
import { kpisSchema } from '@/entities/kpi';
import { env } from '@/shared/lib/env';

export function useKpis() {
  return useQuery({
    queryKey: ['kpis'],
    queryFn: async () => kpisSchema.parse(await httpJson('/kpis')),
    staleTime: 30_000,
    refetchInterval: env.pollingKpisMs,
  });
}
