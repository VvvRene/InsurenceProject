import { z } from 'zod';

export const VehicleOptionInfoSchema = z.object({
  id: z.number().optional(),
  name: z.string().trim().min(1, 'Name is required'),
});

export type VehicleOptionInfo = z.infer<typeof VehicleOptionInfoSchema>;