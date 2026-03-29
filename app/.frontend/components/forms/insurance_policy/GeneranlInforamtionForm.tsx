
import React, { useEffect } from 'react';
import {
    Box, Grid, TextField, MenuItem, Typography, Button,
    Paper, Divider, InputAdornment,
    IconButton
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Stack } from '@mui/system';
import { DateTime } from 'luxon';
import type { Broker, Client, InsuranceCompany } from '~/generated/prisma/browser';
import { insuranceGeneralInformationSchema, type InsuranceGeneralInformation } from '~/.frontend/models/InsuranceGenernalInformation';
import { DatePicker } from '@mui/x-date-pickers';


interface InsurancePolicyGeneralInformationFormProps {
    defaultValues: InsuranceGeneralInformation; // Optional default values for editing existing policies
    clients: Client[]; // Assuming you have a list of clients to select from
    insuranceCompanies: InsuranceCompany[]; // Assuming insurance companies are also clients, adjust as needed
    brokers: Broker[]; // Add broker type if needed
    onChange?: (data: InsuranceGeneralInformation) => void; // Optional callback to notify parent of changes
}

const InsurancePolicyGeneralInformationForm: React.FC<InsurancePolicyGeneralInformationFormProps> = ({
    defaultValues, // Optional default values for editing existing policies
    clients,
    insuranceCompanies,
    brokers,
    onChange // Optional callback to notify parent of changes
}) => {

    const { control, handleSubmit, watch, formState: { errors } } = useForm<InsuranceGeneralInformation>({
        resolver: zodResolver(insuranceGeneralInformationSchema),
        defaultValues: defaultValues
    });

    useEffect(() => {
        const subscription = watch((value, { name, type }) => {
            onChange?.(value as InsuranceGeneralInformation); // Notify parent of changes
        });
        return () => subscription.unsubscribe();
    }, [watch]);

    const onSubmit = (data: InsuranceGeneralInformation) => {
        console.log("Form Submitted:", data);
    };

    return (
        <Box sx={{ overflow: 'hidden' }}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box sx={{ p: 4, overflowY: 'auto', height: 'fit-contant', maxHeight: "70vh" }}>
                    <Stack spacing={2.5}>
                        {/* Row 1: Type and Identity */}
                        <Box sx={{ width: '30%', minWidth: '180px' }}>
                            <Controller
                                name="category"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <TextField
                                        {...field}
                                        select
                                        disabled
                                        hidden
                                        label="Client Type"
                                        fullWidth
                                        error={!!fieldState.error}
                                        helperText={fieldState.error?.message}
                                    >
                                        <MenuItem value="Vehicle">Vehicle</MenuItem>
                                        <MenuItem value="Home">Home</MenuItem>
                                        <MenuItem value="Life">Life</MenuItem>
                                    </TextField>
                                )}
                            />
                        </Box>

                        {/* Row 2: Policy Number & Update Date */}
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <Box sx={{ width: '50%', minWidth: '120px' }} >
                                <Controller
                                    name="uuid"
                                    control={control}
                                    render={({ field, fieldState }) => (
                                        <TextField
                                            disabled
                                            {...field}
                                            label="Policy Number"
                                            fullWidth
                                            error={!!fieldState.error}
                                            helperText={fieldState.error?.message}
                                        />
                                    )}
                                />
                            </Box>

                            <Box sx={{ width: '15%', minWidth: '120px' }} >
                                <Controller
                                    name="processType"
                                    control={control}
                                    render={({ field, fieldState }) => (
                                        <TextField
                                            {...field}
                                            select
                                            fullWidth
                                            label="Process Type"
                                            error={!!fieldState.error}
                                            helperText={fieldState.error?.message}
                                            value={field.value || ''}
                                        >
                                            <MenuItem value="New">N</MenuItem>
                                            <MenuItem value="Renewal">R</MenuItem>
                                        </TextField>
                                    )}
                                />
                            </Box>

                            <Box sx={{ width: '35%', minWidth: '120px' }} >
                                <Controller
                                    name="updateDate"
                                    control={control}
                                    render={({ field: { onChange, value, ...fieldProps }, fieldState: { error } }) => (
                                        <DatePicker
                                            {...fieldProps}
                                            label="Update Date"
                                            disabled={true}
                                            value={value == null ? DateTime.now() : DateTime.fromJSDate(new Date(value))} // Always show current date
                                            onChange={(newValue) => onChange(newValue?.toJSDate())} // Explicitly update form state
                                            slotProps={{
                                                textField: {
                                                    fullWidth: true,
                                                    error: !!error,
                                                    helperText: error?.message,
                                                },
                                            }}
                                        />
                                    )}
                                />
                            </Box>
                        </Box>

                        {/* Row 3: Contact Information */}
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <Box sx={{ width: '50%' }} >
                                <Controller
                                    name="quotationNumber"
                                    control={control}
                                    render={({ field, fieldState }) => (
                                        <TextField
                                            {...field}
                                            label="Quotation Number"
                                            fullWidth
                                            error={!!fieldState.error}
                                            helperText={fieldState.error?.message}
                                        />
                                    )}
                                />
                            </Box>
                            <Box sx={{ width: '50%' }} >
                                <Controller
                                    name="policyNumber"
                                    control={control}
                                    render={({ field, fieldState }) => (
                                        <TextField
                                            {...field}
                                            label="Policy Number"
                                            fullWidth
                                            error={!!fieldState.error}
                                            helperText={fieldState.error?.message}
                                        />
                                    )}
                                />
                            </Box>
                        </Box>

                        {/* Client Information */}
                        <Controller
                            name="clientId"
                            control={control}
                            render={({ field, fieldState }) => (
                                <TextField
                                    {...field}
                                    select
                                    label="Client"
                                    error={!!fieldState.error}
                                    helperText={fieldState.error?.message}
                                    value={field.value || ''}
                                >
                                    {
                                        clients.map(client => (
                                            <MenuItem key={client.id} value={client.id}>
                                                {client.name}
                                            </MenuItem>
                                        ))
                                    }
                                </TextField>
                            )}
                        />

                        {/* Insurance Company */}
                        <Controller
                            name="insuranceCompanyId"
                            control={control}
                            render={({ field, fieldState }) => (
                                <TextField
                                    {...field}
                                    select
                                    label="Insurance Company"
                                    error={!!fieldState.error}
                                    helperText={fieldState.error?.message}
                                    value={field.value || ''}
                                >
                                    {
                                        insuranceCompanies.map(insuranceCompany => (
                                            <MenuItem key={insuranceCompany.id} value={insuranceCompany.id}>
                                                {insuranceCompany.name}
                                            </MenuItem>
                                        ))
                                    }
                                </TextField>
                            )}
                        />

                        {/* Broker Information */}
                        <Controller
                            name="brokerId"
                            control={control}
                            render={({ field, fieldState }) => (
                                <TextField
                                    {...field}
                                    select
                                    label="Broker"
                                    error={!!fieldState.error}
                                    helperText={fieldState.error?.message}
                                    value={field.value || ''}
                                >
                                    {
                                        brokers.map(broker => (
                                            <MenuItem key={broker.id} value={broker.id}>
                                                {broker.name}
                                            </MenuItem>
                                        ))
                                    }
                                </TextField>
                            )}
                        />

                        <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ mt: 3 }}>
                            <Box sx={{ width: '50%', minWidth: '120px' }} >
                                <Controller
                                    name="effectiveDate"
                                    control={control}
                                    render={({ field: { onChange, value, ...fieldProps }, fieldState: { error } }) => (
                                        <DatePicker
                                            {...fieldProps}
                                            label="Effective Date"
                                            disabled={true}
                                            value={value == null ? DateTime.now() : DateTime.fromJSDate(new Date(value))} // Always show current date
                                            onChange={(newValue) => onChange(newValue?.toJSDate())} // Explicitly update form state
                                            slotProps={{
                                                textField: {
                                                    fullWidth: true,
                                                    error: !!error,
                                                    helperText: error?.message,
                                                },
                                            }}
                                        />
                                    )}
                                />
                            </Box>
                            <Box sx={{ width: '50%', minWidth: '120px' }} >
                                <Controller
                                    name="expiryDate"
                                    control={control}
                                    render={({ field: { onChange, value, ...fieldProps }, fieldState: { error } }) => (
                                        <DatePicker
                                            {...fieldProps}
                                            label="Expiry Date"
                                            disabled={true}
                                            value={value == null ? DateTime.now() : DateTime.fromJSDate(new Date(value))} // Always show current date
                                            onChange={(newValue) => onChange(newValue?.toJSDate())} // Explicitly update form state
                                            slotProps={{
                                                textField: {
                                                    fullWidth: true,
                                                    error: !!error,
                                                    helperText: error?.message,
                                                },
                                            }}
                                        />
                                    )}
                                />
                            </Box>
                        </Stack>
                        <Controller
                            name="remark"
                            control={control}
                            render={({ field, fieldState }) => (
                                <TextField
                                    {...field}
                                    label="Remark"
                                    error={!!fieldState.error}
                                    helperText={fieldState.error?.message}
                                    value={field.value || ''}
                                    multiline
                                    rows={4}
                                />
                            )}
                        />
                    </Stack>
                </Box>
            </form>
        </Box>
    );
};

export default InsurancePolicyGeneralInformationForm;