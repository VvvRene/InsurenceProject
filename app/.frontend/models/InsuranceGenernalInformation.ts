// Validation Schema based on your Prisma Model

import { int, z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

export const insuranceGeneralInformationSchema = z.object({
    uuid: z.string().optional().default(''),
    processType: z.enum(['New', 'Renewal']),
    category: z.enum(['Vehicle', 'Home', 'Life']), 
    policyNumber: z.string().optional().default(''),
    quotationNumber: z.string(),
    remark: z.string().optional().nullable(),
    // Mapping relational fields to their respective IDs
    clientId: z.number().min(1, "Client is required"),
    clientBrokerId: z.number().int().nullable().optional(),
    insuranceCompanyId: z.number().min(1, "Insurance Company is required"), 
    brokerId: z.number().min(1, "Broker is required"), 
    // Date fields
    effectiveDate: z.date(),
    expiryDate: z.date(),
    premiumAmount: z.union([z.number(), z.string()])
        .transform((value) => value === '' ? 0 : Number(value))
        .pipe(z.number().nonnegative()),
    currency: z.enum(['HKD', 'USD', 'CNY']),
    updateDate: z.date(),

    previousPolicyId: z.number().optional().nullable(),
    
});

export type InsuranceGeneralInformation = z.infer<typeof insuranceGeneralInformationSchema>;
