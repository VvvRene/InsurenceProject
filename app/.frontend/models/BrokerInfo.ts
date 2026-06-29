import { z } from 'zod';

export const BrokerInfoSchema = z.object({
  id: z.number().optional(),
  name: z.string().trim().min(1, 'Broker name is required'),
});

export type BrokerInfo = z.infer<typeof BrokerInfoSchema>;
