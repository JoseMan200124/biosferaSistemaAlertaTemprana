import { z } from 'zod';

export const stationSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  lat: z.number().finite(),
  lon: z.number().finite(),
});

export const stationsSchema = z.array(stationSchema);
