import React, { useEffect } from 'react';
import {
    Box, Grid, TextField, MenuItem, Typography, Button,
    Paper, Divider, InputAdornment,
    IconButton, Autocomplete
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useForm, Controller, useWatch, type Control } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Stack } from '@mui/system';
import { DateTime } from 'luxon';
import { useTranslation } from 'react-i18next';
import type { Broker, Client, InsuranceCompany, Subagent } from '~/generated/prisma/browser';
import { insuranceGeneralInformationSchema, type InsuranceGeneralInformation } from '~/.frontend/models/InsuranceGenernalInformation';
import { DatePicker } from '@mui/x-date-pickers';
import { NumericFormat } from 'react-number-format';
import { validate } from 'uuid';


interface InsurancePolicyGeneralInformationFormProps {
    control: Control<InsuranceGeneralInformation>; // React Hook Form control object 
    clients: Client[]; // Assuming you have a list of clients to select from
    subagents: Subagent[];
    insuranceCompanies: InsuranceCompany[]; // Assuming insurance companies are also clients, adjust as needed
    brokers: Broker[];  
    onAddInsuranceCompany?: () => void;
    onAddBroker?: () => void;
    onAddClient?: () => void;
}

const InsurancePolicyGeneralInformationForm: React.FC<InsurancePolicyGeneralInformationFormProps> = ({
    control, 
    clients,
    subagents,
    insuranceCompanies,
    brokers,
    onAddInsuranceCompany,
    onAddBroker,
    onAddClient
}) => {
    const { t } = useTranslation();

    const selectedClientId = useWatch({ control, name: 'clientId' });
    const selectedClient = selectedClientId ? clients.find((client) => client.id === selectedClientId) : null;

    // Derive the broker and subagent names from the selected client's relations
    const selectedClientBrokerName = selectedClient?.brokerId
        ? brokers.find((b) => b.id === selectedClient.brokerId)?.name ?? null
        : null;
    const selectedClientSubagentName = selectedClient?.subagentId
        ? subagents.find((s) => s.id === selectedClient.subagentId)?.name ?? null
        : null;

    const showClientBroker = !!(selectedClientBrokerName);
    const showClientSubagent = !!(selectedClientSubagentName);

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
                                        label={t('policy.category')}
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
                                            label="UUID"
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
                                            label={t('policy.processType')}
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
                                            label={t('policy.updateDate')}
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
                                            label={t('policy.quotationNumber')}
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
                                            label={t('policy.policyNumber')}
                                            fullWidth
                                            error={!!fieldState.error}
                                            helperText={fieldState.error?.message}
                                        />
                                    )}
                                />
                            </Box>
                        </Box>

                        {/* Client Information */}
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                            <Box sx={{ flex: 1 }}>
                                <Controller
                                    name="clientId"
                                    control={control}
                                    rules={{
                                        validate: (value) => {
                                            if (!value) {
                                                return "Client is required";
                                            }
                                            return true;
                                        }
                                    }}
                                    render={({ field, fieldState }) => {
                                        const selectedClient = clients.find((client) => client.id === field.value) ?? null;

                                        return (
                                            <Autocomplete
                                                options={clients}
                                                value={selectedClient}
                                                isOptionEqualToValue={(option, value) => option.id === value.id}
                                                getOptionLabel={(option) => option?.name ?? ''}
                                                onChange={(_, newValue) => field.onChange(newValue?.id ?? null)}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        label={t('policy.client')}
                                                        error={!!fieldState.error}
                                                        helperText={fieldState.error?.message}
                                                        fullWidth
                                                        onBlur={field.onBlur}
                                                    />
                                                )}
                                            />
                                        );
                                    }}
                                />
                            </Box>
                            {onAddClient ? (
                                <IconButton
                                    color="primary"
                                    sx={{ mt: 1, border: 1, borderColor: 'divider' }}
                                    onClick={(event) => {
                                        event.stopPropagation();
                                        onAddClient();
                                    }}
                                                    aria-label={t('policy.addClient')}
                                >
                                    <AddIcon />
                                </IconButton>
                            ) : null}
                        </Box>

                        {/* Client's Broker (read-only, hidden by default) */}
                        {showClientBroker && (
                            <Box sx={{ display: 'flex', gap: 2 }}>
                                <Box sx={{ width: '50%' }}>
                                    <TextField
                                        disabled
                                        label={t('policy.clientBroker')}
                                        value={selectedClientBrokerName || ''}
                                        fullWidth
                                    />
                                </Box>
                                {showClientSubagent && (
                                    <Box sx={{ width: '50%' }}>
                                        <TextField
                                            disabled
                                            label={t('policy.clientSubagent')}
                                            value={selectedClientSubagentName || ''}
                                            fullWidth
                                        />
                                    </Box>
                                )}
                            </Box>
                        )}

                        {/* Insurance Company */}
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                            <Box sx={{ flex: 1 }}>
                                <Controller
                                    name="insuranceCompanyId"
                                    control={control}
                                    render={({ field, fieldState }) => {
                                        const selectedInsuranceCompany = insuranceCompanies.find((insuranceCompany) => insuranceCompany.id === field.value) ?? null;

                                        return (
                                            <Autocomplete
                                                options={insuranceCompanies}
                                                value={selectedInsuranceCompany}
                                                isOptionEqualToValue={(option, value) => option.id === value.id}
                                                getOptionLabel={(option) => option?.name ?? ''}
                                                onChange={(_, newValue) => field.onChange(newValue?.id ?? null)}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        label={t('policy.insuranceCompany')}
                                                        error={!!fieldState.error}
                                                        helperText={fieldState.error?.message}
                                                        fullWidth
                                                        onBlur={field.onBlur}
                                                    />
                                                )}
                                            />
                                        );
                                    }}
                                />
                            </Box>
                            {onAddInsuranceCompany ? (
                                <IconButton
                                    color="primary"
                                    sx={{ mt: 1, border: 1, borderColor: 'divider' }}
                                    onClick={(event) => {
                                        event.stopPropagation();
                                        onAddInsuranceCompany();
                                    }}
                                                    aria-label={t('policy.addInsuranceCompany')}
                                >
                                    <AddIcon />
                                </IconButton>
                            ) : null}
                        </Box>

                        {/* Broker Information */}
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                            <Box sx={{ flex: 1 }}>
                                <Controller
                                    name="brokerId"
                                    control={control}
                                    render={({ field, fieldState }) => {
                                        const selectedBroker = brokers.find((broker) => broker.id === field.value) ?? null;

                                        return (
                                            <Autocomplete
                                                options={brokers}
                                                value={selectedBroker}
                                                isOptionEqualToValue={(option, value) => option.id === value.id}
                                                getOptionLabel={(option) => option?.name ?? ''}
                                                onChange={(_, newValue) => field.onChange(newValue?.id ?? null)}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        label={t('policy.broker')}
                                                        error={!!fieldState.error}
                                                        helperText={fieldState.error?.message}
                                                        fullWidth
                                                        onBlur={field.onBlur}
                                                    />
                                                )}
                                            />
                                        );
                                    }}
                                />
                            </Box>
                            {onAddBroker ? (
                                <IconButton
                                    color="primary"
                                    sx={{ mt: 1, border: 1, borderColor: 'divider' }}
                                    onClick={(event) => {
                                        event.stopPropagation();
                                        onAddBroker();
                                    }}
                                                    aria-label={t('policy.addBroker')}
                                >
                                    <AddIcon />
                                </IconButton>
                            ) : null}
                        </Box>

                        <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ mt: 3 }}>
                            <Box sx={{ width: '50%', minWidth: '120px' }} >
                                <Controller
                                    name="effectiveDate"
                                    control={control}
                                    render={({ field: { onChange, value, ...fieldProps }, fieldState: { error } }) => (
                                        <DatePicker
                                            {...fieldProps}
                                            label={t('policy.effectiveDate')}
                                            value={value == null ? DateTime.now() : DateTime.fromJSDate(new Date(value))}
                                            onChange={(newValue) => onChange(newValue?.toJSDate())}
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
                                            label={t('policy.expiryDate')}
                                            value={value == null ? DateTime.now().endOf('year') : DateTime.fromJSDate(new Date(value))}
                                            onChange={(newValue) => onChange(newValue?.toJSDate())}
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
                            name="premiumAmount"
                            control={control}
                            render={({ field, fieldState }) => (
                                <NumericFormat
                                    value={field.value ?? 0}
                                    onValueChange={(values) => field.onChange(values.floatValue ?? 0)}
                                    customInput={TextField}
                                    label={t('policy.premiumAmount') || 'Premium Amount'}
                                    fullWidth
                                    thousandSeparator=","
                                    decimalScale={2}
                                    fixedDecimalScale
                                    allowNegative={false}
                                    prefix="HKD "
                                    error={!!fieldState.error}
                                    helperText={fieldState.error?.message}
                                    inputProps={{ inputMode: 'decimal' }}
                                />
                            )}
                        />

                        <Controller
                            name="remark"
                            control={control}
                            render={({ field, fieldState }) => (
                                <TextField
                                    {...field}
                                    label={t('client.remark')}
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