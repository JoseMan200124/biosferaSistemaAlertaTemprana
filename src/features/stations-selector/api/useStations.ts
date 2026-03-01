import { useQuery } from '@tanstack/react-query';
import { httpJson } from '@/shared/api/httpClient';
import { stationsSchema } from '@/entities/station';

export function useStations() {
  return useQuery({
    queryKey: ['stations'],
    queryFn: async () => stationsSchema.parse(await httpJson('/stations')),
    staleTime: 5 * 60_000,
  });
}
