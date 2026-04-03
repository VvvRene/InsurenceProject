
import React, { useEffect } from 'react';
import {
    Box, Grid, TextField, MenuItem, Typography, Button,
    Paper, Divider, InputAdornment,
    IconButton
} from '@mui/material';
import { useForm, Controller, type Control } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Stack } from '@mui/system';
import { DateTime } from 'luxon';
import type { Broker, Client, InsuranceCompany } from '~/generated/prisma/browser';
import { insuranceGeneralInformationSchema, type InsuranceGeneralInformation } from '~/.frontend/models/InsuranceGenernalInformation';
import { DatePicker } from '@mui/x-date-pickers';
import { validate } from 'uuid';


interface InsurancePolicyGeneralInformationFormProps {
    control: Control<InsuranceGeneralInformation>; // React Hook Form control object 
    clients: Client[]; // Assuming you have a list of clients to select from
    insuranceCompanies: InsuranceCompany[]; // Assuming insurance companies are also clients, adjust as needed
    brokers: Broker[];  
}

const InsurancePolicyGeneralInformationForm: React.FC<InsurancePolicyGeneralInformationFormProps> = ({
    control, 
    clients,
    insuranceCompanies,
    brokers
}) => {
  
    return (
        <Box sx={{ overflow: 'hidden' }}>
            <form onSubmit={(e) => e.preventDefault()}>
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
                            rules={{
                                validate: (value) => {
                                    if (!value) {
                                        return "Client is required";
                                    }
                                    console.log("Validating clientId:", value, "Available clients:", clients.map(c => c.id));
                                    return true;
                                }

                            }}
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