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
});

export type ClientInfo = z.infer<typeof ClientInfoSchema>;

