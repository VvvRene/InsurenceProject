import { z } from 'zod';

export const InsuranceCompanyInfoSchema = z.object({
  id: z.number().optional(),
  name: z.string().trim().min(1, 'Insurance company name is required'),
});

export type InsuranceCompanyInfo = z.infer<typeof InsuranceCompanyInfoSchema>;
