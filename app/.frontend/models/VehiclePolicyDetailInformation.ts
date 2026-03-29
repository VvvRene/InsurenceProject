import { int, z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

export const vehiclePolicyDetailInformationSchema = z.object({
    coverageType: z.enum(['Comprehensive', 'Third-Party']),
    registrationNumber: z.enum(['New', 'Renewal']),
    vehicleType: z.enum(['Sedan', 'SUV', 'Truck', 'Motorcycle']),
    engineNumber: z.string().min(1, 'Required'),
    chassisNumber: z.string().min(1, 'Required'),
    vehicleBodyType: z.enum(['Coupe', 'Convertible', 'Hatchback', 'Minivan', 'Pickup', 'Van', 'Wagon']),
    manufacturer: z.string().min(1, 'Required'),
    modelName: z.string().min(1, 'Required'),
    enginDisplacement: z.number().nonnegative(),
    totalWeight: z.number().nonnegative(),
    yearOfManufacture: z.number().int().min(1900).max(new Date().getFullYear()),
    seatNumber: z.number().int().nonnegative(),
    region: z.enum(['Hong Kong', 'Mainland China', 'Overseas']),
    moneyLenderLicenceNumber: z.string().optional().nullable(),
});

export type VehiclePolicyDetailInformation = z.infer<typeof vehiclePolicyDetailInformationSchema>;
