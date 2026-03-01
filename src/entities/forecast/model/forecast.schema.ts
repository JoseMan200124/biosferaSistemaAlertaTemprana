import { z } from 'zod';

export const forecastDaySchema = z.object({
  date: z.string().min(1),
  precipitationMm: z.number().finite(),
  temperatureC: z.number().finite(),
});

export const forecastSchema = z.array(forecastDaySchema);
