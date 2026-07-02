import React, { useEffect } from 'react';
import {
    Box, TextField, MenuItem, 
} from '@mui/material'; 
import { useForm, Controller, type Control } from 'react-hook-form'; 
import { zodResolver } from '@hookform/resolvers/zod';
import { Stack } from '@mui/system';
import { useTranslation } from 'react-i18next';
import { vehiclePolicyDetailInformationSchema, type VehiclePolicyDetailInformation } from '~/.frontend/models/VehiclePolicyDetailInformation'; 

// Validation Schema based on your Prisma Model 
interface VehicleDetailFormProps {
    control: Control<VehiclePolicyDetailInformation>; // React Hook Form control object
    defaultValues: VehiclePolicyDetailInformation; // Optional default values for editing existing policies
    onChange: (data: VehiclePolicyDetailInformation) => void; // Optional callback to pass form data to parent component
}

const VehicleDetailForm: React.FC<VehicleDetailFormProps> = ({ control, defaultValues, onChange }) => { 
    const { t } = useTranslation();
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
                                            label={t('policy.coverageType')}
                                            error={!!fieldState.error}
                                            helperText={fieldState.error ? fieldState.error.message : ''}
                                        >
                                            <MenuItem value="Comprehensive">{t('policy.comprehensive')}</MenuItem>
                                            <MenuItem value="Third-Party">{t('policy.thirdParty')}</MenuItem>
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
                                            label={t('policy.registrationNumber')}
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
                                            label={t('policy.vehicleType')}
                                            error={!!fieldState.error}
                                            helperText={fieldState.error ? fieldState.error.message : ''}
                                        >
                                            <MenuItem value="Sedan">{t('policy.sedan')}</MenuItem>
                                            <MenuItem value="SUV">{t('policy.suv')}</MenuItem>
                                            <MenuItem value="Truck">{t('policy.truck')}</MenuItem>
                                            <MenuItem value="Motorcycle">{t('policy.motorcycle')}</MenuItem>
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
                                            label={t('policy.engineNumber')}
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
                                            label={t('policy.chassisNumber')}
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
                                            label={t('policy.vehicleBodyType')}
                                            error={!!fieldState.error}
                                            helperText={fieldState.error ? fieldState.error.message : ''}
                                        >
                                            <MenuItem value="Coupe">{t('policy.coupe')}</MenuItem>
                                            <MenuItem value="Convertible">{t('policy.convertible')}</MenuItem>
                                            <MenuItem value="Hatchback">{t('policy.hatchback')}</MenuItem>
                                            <MenuItem value="Minivan">{t('policy.minivan')}</MenuItem>
                                            <MenuItem value="Pickup">{t('policy.pickup')}</MenuItem>
                                            <MenuItem value="Van">{t('policy.van')}</MenuItem>
                                            <MenuItem value="Wagon">{t('policy.wagon')}</MenuItem>
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
                                            label={t('policy.manufacturer')}
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
                                            label={t('policy.modelName')}
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
                                            label={t('policy.engineDisplacement')}
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
                                            label={t('policy.totalWeight')}
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
                                            label={t('policy.yearOfManufacture')}
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
                                            label={t('policy.numberOfSeats')}
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
                                            label={t('policy.region')}
                                            error={!!fieldState.error}
                                            helperText={fieldState.error ? fieldState.error.message : ''}
                                        >
                                            <MenuItem value="Hong Kong">{t('policy.hongKong')}</MenuItem>
                                            <MenuItem value="Mainland China">{t('policy.mainlandChina')}</MenuItem>
                                            <MenuItem value="Overseas">{t('policy.overseas')}</MenuItem>
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
                                            label={t('policy.moneyLenderLicence')}
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