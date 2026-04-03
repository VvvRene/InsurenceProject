import React, { useEffect } from 'react';
import {
    Box, TextField, MenuItem, 
} from '@mui/material'; 
import { useForm, Controller, type Control } from 'react-hook-form'; 
import { zodResolver } from '@hookform/resolvers/zod';
import { Stack } from '@mui/system';
 
import { vehiclePolicyDetailInformationSchema, type VehiclePolicyDetailInformation } from '~/.frontend/models/VehiclePolicyDetailInformation'; 

// Validation Schema based on your Prisma Model 
interface VehicleDetailFormProps {
    control: Control<VehiclePolicyDetailInformation>; // React Hook Form control object
    defaultValues: VehiclePolicyDetailInformation; // Optional default values for editing existing policies
    onChange: (data: VehiclePolicyDetailInformation) => void; // Optional callback to pass form data to parent component
}

const VehicleDetailForm: React.FC<VehicleDetailFormProps> = ({ control, defaultValues, onChange }) => { 
    return (
        <Box sx={{ overflow: 'hidden' }}>
            <form onSubmit={(e) => e.preventDefault()}>
                <Box sx={{ p: 4, overflowY: 'auto', height: 'fit-contant', maxHeight: "70vh" }}>
                    <Stack >
                        <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between" mb={2}>
                            <Box sx={{ width: '50%' }}>
                                <Controller
                                    name="coverageType"
                                    control={control}
                                    render={({ field, fieldState}) => (
                                        <TextField
                                            {...field}
                                            select
                                            fullWidth
                                            label="Coverage Type"
                                            error={!!fieldState.error}
                                            helperText={fieldState.error ? fieldState.error.message : ''}
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
                                    render={({ field, fieldState}) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            label="Registration Number"
                                            error={!!fieldState.error}
                                            helperText={fieldState.error ? fieldState.error.message : ''}
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
                                    render={({ field, fieldState }) => (
                                        <TextField
                                            {...field}
                                            select
                                            fullWidth
                                            label="Vehicle Type"
                                            error={!!fieldState.error}
                                            helperText={fieldState.error ? fieldState.error.message : ''}
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
                                    render={({ field, fieldState }) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            label="Engine Number"
                                            error={!!fieldState.error}
                                            helperText={fieldState.error ? fieldState.error.message : ''}
                                        
                                        />
                                    )}
                                />
                            </Box>
                            <Box sx={{ width: '50%' }}>
                                <Controller
                                    name="chassisNumber"
                                    control={control}
                                    render={({ field, fieldState }) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            label="Chassis Number"
                                            error={!!fieldState.error}
                                            helperText={fieldState.error ? fieldState.error.message : ''}
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
                                    render={({ field, fieldState}) => (
                                        <TextField  
                                            {...field}
                                            select
                                            fullWidth
                                            label="Vehicle Body Type"
                                            error={!!fieldState.error}
                                            helperText={fieldState.error ? fieldState.error.message : ''}
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
                                    render={({ field, fieldState }) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            label="Manufacturer"
                                            error={!!fieldState.error}
                                            helperText={fieldState.error ? fieldState.error.message : ''}
                                        />
                                    )}
                                />
                            </Box>
                            <Box sx={{ width: '50%' }}>
                                <Controller
                                    name="modelName"
                                    control={control}
                                    render={({ field, fieldState }) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            label="Model Name"
                                            error={!!fieldState.error}
                                            helperText={fieldState.error ? fieldState.error.message : ''}
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
                                    render={({ field, fieldState }) => (
                                        <TextField
                                            {...field}  
                                            type="number"
                                            fullWidth
                                            label="Engine Displacement (cc)"
                                            error={!!fieldState.error}
                                            helperText={fieldState.error ? fieldState.error.message : ''}
                                            onChange={(e)=> field.onChange(Number(e.target.value))}
                                        />
                                    )}
                                />
                            </Box>
                            <Box sx={{ width: '50%' }}>
                                <Controller
                                    name="totalWeight"
                                    control={control}
                                    render={({ field, fieldState }) => (
                                        <TextField
                                            {...field}
                                            type="number"
                                            fullWidth
                                            label="Total Weight (kg)"
                                            error={!!fieldState.error}
                                            helperText={fieldState.error ? fieldState.error.message : ''}
                                            onChange={(e)=> field.onChange(Number(e.target.value))}
                                        />
                                    )}
                                />
                            </Box>
                            <Box sx={{ width: '50%' }}>
                                <Controller
                                    name="yearOfManufacture"
                                    control={control}
                                    render={({ field, fieldState }) => (
                                        <TextField
                                            {...field}
                                            type="number"
                                            fullWidth
                                            label="Year of Manufacture"
                                            error={!!fieldState.error}
                                            helperText={fieldState.error ? fieldState.error.message : ''}
                                        />
                                    )}
                                />
                            </Box>
                            <Box sx={{ width: '50%' }}>
                                <Controller
                                    name="seatNumber"
                                    control={control}
                                    render={({ field, fieldState }) => (
                                        <TextField
                                            {...field}
                                            type="number"
                                            fullWidth   
                                            label="Number of Seats"
                                            error={!!fieldState.error}
                                            helperText={fieldState.error ? fieldState.error.message : ''}
                                            onChange={(e)=> field.onChange(Number(e.target.value))}
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
                                    render={({ field, fieldState}) => (
                                        <TextField
                                            {...field}
                                            select
                                            fullWidth
                                            label="Region"
                                            error={!!fieldState.error}
                                            helperText={fieldState.error ? fieldState.error.message : ''}
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
                                    render={({ field, fieldState }) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            label="Money Lender Licence Number (if applicable)"
                                            error={!!fieldState.error}
                                            helperText={fieldState.error ? fieldState.error.message : ''}
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