import React, { useEffect } from 'react';
import {
    Box, Grid, TextField, MenuItem, Typography, Button,
    Paper, Divider, InputAdornment,
    IconButton
} from '@mui/material'; 
import { useForm, Controller } from 'react-hook-form'; 
import { zodResolver } from '@hookform/resolvers/zod';
import { Stack } from '@mui/system';
 
import { vehiclePolicyDetailInformationSchema, type VehiclePolicyDetailInformation } from '~/.frontend/models/VehiclePolicyDetailInformation'; 

// Validation Schema based on your Prisma Model 
interface VehicleDetailFormProps {
    defaultValues: VehiclePolicyDetailInformation; // Optional default values for editing existing policies
    onChange: (data: VehiclePolicyDetailInformation) => void; // Optional callback to pass form data to parent component
}

const VehicleDetailForm: React.FC<VehicleDetailFormProps> = ({ defaultValues, onChange }) => {

    const { control, handleSubmit, watch, formState: { errors } } = useForm<VehiclePolicyDetailInformation>({
        resolver: zodResolver(vehiclePolicyDetailInformationSchema),
        defaultValues: defaultValues
    });

    useEffect(() => {
        const subscription = watch((value, { name, type }) => {
            onChange(value as VehiclePolicyDetailInformation); // Call the onChange callback with the latest form data whenever any field changes
        });
        return () => subscription.unsubscribe();
    }, [watch]);

    const onSubmit = (data: VehiclePolicyDetailInformation) => {
        console.log("Form Submitted:", data);
    };

    return (
        <Box sx={{ overflow: 'hidden' }}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box sx={{ p: 4, overflowY: 'auto', height: 'fit-contant', maxHeight: "70vh" }}>
                    <Stack >
                        <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between" mb={2}>
                            <Box sx={{ width: '50%' }}>
                                <Controller
                                    name="coverageType"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            select
                                            fullWidth
                                            label="Coverage Type"
                                            error={!!errors.coverageType}
                                            helperText={errors.coverageType ? errors.coverageType.message : ''}
                                        >
                                            <MenuItem value="Comprehensive">Comprehensive</MenuItem>
                                            <MenuItem value="Third-Party">Third-Party</MenuItem>
                                        </TextField>
                                    )}
                                />
                            </Box>
                            <Box sx={{ width: '50%' }}>
                                <Controller
                                    name="registrationNumber"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            label="Registration Number"
                                            error={!!errors.registrationNumber}
                                            helperText={errors.registrationNumber ? errors.registrationNumber.message : ''}
                                        />
                                    )}
                                />
                            </Box>
                        </Stack>

                        <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between" mb={2}>
                            <Box sx={{ width: '50%' }}>
                                <Controller
                                    name="vehicleType"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            select
                                            fullWidth
                                            label="Vehicle Type"
                                            error={!!errors.vehicleType}
                                            helperText={errors.vehicleType ? errors.vehicleType.message : ''}
                                        >
                                            <MenuItem value="Sedan">Sedan</MenuItem>
                                            <MenuItem value="SUV">SUV</MenuItem>
                                            <MenuItem value="Truck">Truck</MenuItem>
                                            <MenuItem value="Motorcycle">Motorcycle</MenuItem>
                                        </TextField>
                                    )}
                                />
                            </Box>
                            <Box sx={{ width: '50%' }}>
                                <Controller
                                    name="engineNumber"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            label="Engine Number"
                                            error={!!errors.engineNumber}
                                            helperText={errors.engineNumber ? errors.engineNumber.message : ''}
                                        />
                                    )}
                                />
                            </Box>
                            <Box sx={{ width: '50%' }}>
                                <Controller
                                    name="chassisNumber"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            label="Chassis Number"
                                            error={!!errors.chassisNumber}
                                            helperText={errors.chassisNumber ? errors.chassisNumber.message : ''}
                                        />
                                    )}
                                />
                            </Box>
                        </Stack>
                        <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between" mb={2}>
                            <Box sx={{ width: '50%' }}>
                                <Controller
                                    name="vehicleBodyType"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            select
                                            fullWidth
                                            label="Vehicle Body Type"
                                            error={!!errors.vehicleBodyType}
                                            helperText={errors.vehicleBodyType ? errors.vehicleBodyType.message : ''}
                                        >
                                            <MenuItem value="Coupe">Coupe</MenuItem>
                                            <MenuItem value="Convertible">Convertible</MenuItem>
                                            <MenuItem value="Hatchback">Hatchback</MenuItem>
                                            <MenuItem value="Minivan">Minivan</MenuItem>
                                            <MenuItem value="Pickup">Pickup</MenuItem>
                                            <MenuItem value="Van">Van</MenuItem>
                                            <MenuItem value="Wagon">Wagon</MenuItem>
                                        </TextField>
                                    )}
                                />
                            </Box>
                            <Box sx={{ width: '50%' }}>
                                <Controller
                                    name="manufacturer"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            label="Manufacturer"
                                            error={!!errors.manufacturer}
                                            helperText={errors.manufacturer ? errors.manufacturer.message : ''}
                                        />
                                    )}
                                />
                            </Box>
                            <Box sx={{ width: '50%' }}>
                                <Controller
                                    name="modelName"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            label="Model Name"
                                            error={!!errors.modelName}
                                            helperText={errors.modelName ? errors.modelName.message : ''}
                                        />
                                    )}
                                />
                            </Box>
                        </Stack>
                        <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between" mb={2}>
                            <Box sx={{ width: '50%' }}>
                                <Controller
                                    name="enginDisplacement"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            type="number"
                                            fullWidth
                                            label="Engine Displacement (cc)"
                                            error={!!errors.enginDisplacement}
                                            helperText={errors.enginDisplacement ? errors.enginDisplacement.message : ''}
                                        />
                                    )}
                                />
                            </Box>
                            <Box sx={{ width: '50%' }}>
                                <Controller
                                    name="totalWeight"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            type="number"
                                            fullWidth
                                            label="Total Weight (kg)"
                                            error={!!errors.totalWeight}
                                            helperText={errors.totalWeight ? errors.totalWeight.message : ''}
                                        />
                                    )}
                                />
                            </Box>
                            <Box sx={{ width: '50%' }}>
                                <Controller
                                    name="yearOfManufacture"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            type="number"
                                            fullWidth
                                            label="Year of Manufacture"
                                            error={!!errors.yearOfManufacture}
                                            helperText={errors.yearOfManufacture ? errors.yearOfManufacture.message : ''}
                                        />
                                    )}
                                />
                            </Box>
                            <Box sx={{ width: '50%' }}>
                                <Controller
                                    name="seatNumber"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            type="number"
                                            fullWidth
                                            label="Number of Seats"
                                            error={!!errors.seatNumber}
                                            helperText={errors.seatNumber ? errors.seatNumber.message : ''}
                                        />
                                    )}
                                />
                            </Box>
                        </Stack>
                        <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between" mb={2}>
                            <Box sx={{ width: '35%' }}>
                                <Controller
                                    name="region"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            select
                                            fullWidth
                                            label="Region"
                                            error={!!errors.region}
                                            helperText={errors.region ? errors.region.message : ''}
                                        >
                                            <MenuItem value="Hong Kong">Hong Kong</MenuItem>
                                            <MenuItem value="Mainland China">Mainland China</MenuItem>
                                            <MenuItem value="Overseas">Overseas</MenuItem>
                                        </TextField>
                                    )}
                                />
                            </Box>
                            <Box sx={{ width: '65%' }}>
                                <Controller
                                    name="moneyLenderLicenceNumber"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            label="Money Lender Licence Number (if applicable)"
                                            error={!!errors.moneyLenderLicenceNumber}
                                            helperText={errors.moneyLenderLicenceNumber ? errors.moneyLenderLicenceNumber.message : ''}
                                        />
                                    )}
                                />
                            </Box>
                        </Stack>
                    </Stack>
                </Box>
            </form >
        </Box >
    );
};

export default VehicleDetailForm;