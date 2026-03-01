import { z } from 'zod';

export const alertSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  severity: z.enum(['low', 'medium', 'high']),
  createdAt: z.string().min(1),
});

export const alertsSchema = z.array(alertSchema);
