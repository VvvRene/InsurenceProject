import { int, z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

export const vehiclePolicyDetailInformationSchema = z.object({
    coverageType: z.enum(['Comprehensive', 'Third-Party']),
    registrationNumber: z.string().min(1, 'Required'),
    vehicleType: z.enum(['Sedan', 'SUV', 'Truck', 'Motorcycle']),
    engineNumber: z.string().min(1, 'Required'),
    chassisNumber: z.string().min(1, 'Required'),
    vehicleBodyType: z.enum(['Coupe', 'Convertible', 'Hatchback', 'Minivan', 'Pickup', 'Van', 'Wagon']),
    manufacturer: z.string().min(1, 'Required'),
    modelName: z.string().min(1, 'Required'),
    enginDisplacement: z.number().nonnegative().min(50, 'Engine displacement must be at least 50cc'),
    totalWeight: z.number().or(z.string()).optional().nullable().transform((value) => value == null || value === '' ? 0 : Number(value)),
    yearOfManufacture: z.number().or(z.string()).optional().nullable().transform((value) => value == null || value === '' ? new Date().getFullYear() : Number(value)),
    seatNumber: z.number().int().nonnegative().min(1, 'There must be at least 1 seat'),
    region: z.enum(['Hong Kong', 'Mainland China', 'Overseas']),
    moneyLenderLicenceNumber: z.string().optional().nullable(),
});

export type VehiclePolicyDetailInformation = z.infer<typeof vehiclePolicyDetailInformationSchema>;
