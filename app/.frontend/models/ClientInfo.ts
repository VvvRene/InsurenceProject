import { DateTime } from "luxon";
import z from "zod";

export const ClientInfoSchema = z.object({
    type: z.enum(['Company', 'Individual']),
    identity: z.string().min(1, 'Identity is required'),
    abbr: z.string().min(1, 'Title is required'),
    name: z.string().min(1, 'Name is required'),
    chineseName: z.string().nullable().optional(),
    address1: z.string().min(1, 'Address is required'),
    address2: z.string().nullable().optional(),
    phoneNumber: z.string().min(1, 'Phone is required'),
    email: z.email(),
    gender: z.string(),
    businessRegistrationNumber: z.string().optional(),
    industry: z.string().nullable().optional(),
    natureOfWork: z.string().nullable().optional(),
    workDescription: z.string().nullable().optional(),
    remark: z.string().nullable().optional(),
    date: z.date().nullable(),
});

export type ClientInfo = z.infer<typeof ClientInfoSchema>;

