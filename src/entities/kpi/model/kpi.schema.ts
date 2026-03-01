import { z } from 'zod';

export const kpiSchema = z.object({
  key: z.string().min(1),
  label: z.string().min(1),
  value: z.number().finite(),
  unit: z.string().optional(),
});

export const kpisSchema = z.array(kpiSchema);
