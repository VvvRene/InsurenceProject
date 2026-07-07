import { DateTime } from "luxon";
import z from "zod";

export const ClientInfoSchema = z.object({
    id: z.number().int().optional(),
    type: z.enum(['Company', 'Individual']),
    identity: z.string().min(1, 'Identity is required'),
    abbr: z.string().min(1, 'Title is required'),
    name: z.string().min(1, 'Name is required'),
    chineseName: z.string().nullable().optional(),
    address1: z.string().nullable().optional(),
    address2: z.string().nullable().optional(),
    phoneNumber: z.string().nullable().optional(),
    email: z.string().email().nullable().optional(),
    industry: z.string().nullable().optional(),
    gender: z.string(),
    
    natureOfWork: z.string().nullable().optional(),
    
    remark: z.string().nullable().optional(),
    date: z.date().nullable(),
    brokerId: z.number().int().nullable().optional(),
    subagentId: z.number().int().nullable().optional(),
}).refine(
    (data) => {
        // If subagentId is set, brokerId must also be set
        if (data.subagentId && !data.brokerId) {
            return false;
        }
        return true;
    },
    {
        message: 'Broker is required when a subagent is assigned',
        path: ['brokerId'],
    }
);

export type ClientInfo = z.infer<typeof ClientInfoSchema>;

