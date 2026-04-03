// Validation Schema based on your Prisma Model

import { int, z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

export const insuranceGeneralInformationSchema = z.object({
    uuid: z.string().min(1, 'Required'),
    processType: z.enum(['New', 'Renewal']),
    category: z.enum(['Vehicle', 'Home', 'Life']), 
    policyNumber: z.string().min(1, 'Required'),
    quotationNumber: z.string(),
    remark: z.string().optional().nullable(),
    // Mapping relational fields to their respective IDs
    clientId: z.number().min(1, "Client is required"),
    insuranceCompanyId: z.number().min(1, "Insurance Company is required"), 
    brokerId: z.number().min(1, "Broker is required"), 
    // Date fields
    effectiveDate: z.date(),
    expiryDate: z.date(),
    premiumAmount: z.number().nonnegative(),
    currency: z.enum(['HKD', 'USD', 'CNY']),
    updateDate: z.date(),

    previousPolicyId: z.number().optional().nullable(),
    
});

export type InsuranceGeneralInformation = z.infer<typeof insuranceGeneralInformationSchema>;
