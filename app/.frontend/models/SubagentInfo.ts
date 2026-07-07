import { z } from 'zod';

export const SubagentInfoSchema = z.object({
  id: z.number().optional(),
  name: z.string().trim().min(1, 'Subagent name is required'),
  brokerId: z.number().min(1, 'Broker is required'),
});

export type SubagentInfo = z.infer<typeof SubagentInfoSchema>;