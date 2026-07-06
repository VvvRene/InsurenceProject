import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  TextField,
  MenuItem,
  Stack,
  Box,
  Typography,
  IconButton,
  Autocomplete,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import SaveIcon from '@mui/icons-material/Save';
import { useTranslation } from 'react-i18next';
import { ClientInfoSchema, type ClientInfo } from '~/.frontend/models/ClientInfo';
import { DateTime } from 'luxon';
import type { Broker, Subagent } from '~/generated/prisma/browser';

interface ClientInformationFormProps {
  client?: ClientInfo,
  brokers: Broker[],
  subagents: Subagent[],
  onSave: (client: ClientInfo) => void
}

const ClientInformationForm: React.FC<ClientInformationFormProps> = ({ client, brokers, subagents, onSave }) => {
  const { t } = useTranslation();
  const { control, handleSubmit, watch, reset, setValue } = useForm<ClientInfo>({
    resolver: zodResolver(ClientInfoSchema),
    defaultValues: {
      id: undefined,
      type: 'Individual',
      identity: '',
      name: '',
      gender: 'Not Applicable',
      abbr: 'MR',
      chineseName: null,
      address1: null,
      address2: null,
      phoneNumber: null,
      email: null,
      industry: null,
      natureOfWork: null,
      remark: null,
      date: null,
      brokerId: null,
      subagentId: null,
    }
  });

  useEffect(() => {
    reset({
      id: client?.id,
      type: client?.type ?? 'Individual',
      identity: client?.identity ?? '',
      abbr: client?.abbr ?? 'MR',
      name: client?.name ?? '',
      chineseName: client?.chineseName ?? null,
      address1: client?.address1 ?? null,
      address2: client?.address2 ?? null,
      phoneNumber: client?.phoneNumber ?? null,
      email: client?.email ?? null,
      industry: client?.industry ?? null,
      gender: client?.gender ?? 'Not Applicable',
      natureOfWork: client?.natureOfWork ?? null,
      remark: client?.remark ?? null,
      date: client?.date ?? null,
      brokerId: client?.brokerId ?? null,
      subagentId: client?.subagentId ?? null,
    });
  }, [client, reset]);

  const clientType = watch('type');
  const selectedBrokerId = watch('brokerId');

  // Filter subagents by selected broker
  const filteredSubagents = selectedBrokerId
    ? subagents.filter(s => s.brokerId === selectedBrokerId)
    : [];

  // When broker changes, clear subagent if it doesn't belong to the new broker
  const handleBrokerChange = (brokerId: number | null) => {
    setValue('brokerId', brokerId);
    if (brokerId) {
      const currentSubagentId = watch('subagentId');
      if (currentSubagentId) {
        const subagentBelongsToBroker = subagents.some(
          s => s.id === currentSubagentId && s.brokerId === brokerId
        );
        if (!subagentBelongsToBroker) {
          setValue('subagentId', null);
        }
      }
    } else {
      setValue('subagentId', null);
    }
  };

  return (
    <Box sx={{ overflow: 'hidden' }}>
      <form onSubmit={handleSubmit((data: ClientInfo) => onSave(data))}>

        <Stack >
          <Stack
            direction='row'
            alignItems="center"
            justifyContent="space-between"
            sx={{ bgcolor: "layer.level2", py: 2, px: 3 }}
          >
            <Typography variant="h5" sx={{ fontWeight: '700' }}>
              {client ? t('client.editClient') : t('client.createClient')}
            </Typography>

            <IconButton type="submit" sx={{ border: 1 }}>
              <SaveIcon />
            </IconButton>
          </Stack>

          <Box sx={{ p: 4, overflowY: 'auto', height: 'fit-contant', maxHeight: "70vh" }}>
            <Stack spacing={2.5}>
              {/* Row 1: Type and Identity */}
              <Box sx={{ width: '30%', minWidth: '180px' }}>
                <Controller
                  name="type"
                  control={control}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      select
                      label={t('client.clientType')}
                      fullWidth
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                    >
                      <MenuItem value="Individual">{t('client.individual')}</MenuItem>
                      <MenuItem value="Company">{t('client.company')}</MenuItem>
                    </TextField>
                  )}
                />
              </Box>

              {/* Row 2: Title and Name */}
              <Box sx={{ display: 'flex', gap: 2 }}>
                {
                  clientType === 'Individual' &&
                  <Box sx={{ width: '30%', minWidth: '120px' }} >
                    <Controller
                      name="abbr"
                      control={control}
                      render={({ field, fieldState }) => (
                        <TextField
                          {...field}
                          select
                          label={t('client.title')}
                          fullWidth
                          error={!!fieldState.error}
                          helperText={fieldState.error?.message}
                        >
                          <MenuItem value="MR">MR</MenuItem>
                          <MenuItem value="MS">MS</MenuItem>
                          <MenuItem value="MISS">MISS</MenuItem>
                        </TextField>
                      )}
                    />
                  </Box>
                }

                <Controller
                  name="name"
                  control={control}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      label={clientType === 'Company' ? t('client.companyName') : t('client.fullName')}
                      fullWidth
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                    />
                  )}
                />
              </Box>

              <Box sx={{ display: 'flex', gap: 2 }}>
                {
                  clientType === 'Individual' &&
                  <Box sx={{ width: '30%', minWidth: '120px' }} >
                    <Controller
                      name="gender"
                      control={control}
                      render={({ field, fieldState }) => (
                        <TextField
                          {...field}
                          select
                          label={t('client.gender')}
                          fullWidth
                          error={!!fieldState.error}
                          helperText={fieldState.error?.message}
                        >
                          <MenuItem value="Male">{t('client.male')}</MenuItem>
                          <MenuItem value="Female">{t('client.female')}</MenuItem>
                          <MenuItem value="Not Applicable">{t('client.nA')}</MenuItem>
                        </TextField>
                      )}
                    />
                  </Box>
                }
                <Controller
                  name="chineseName"
                  control={control}
                  render={({ field, fieldState }) =>
                    <TextField
                      {...field}
                      label={t('client.chineseName')}
                      fullWidth
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                    />}
                />
              </Box>

              <Box sx={{ display: 'flex', gap: 2 }}>

                <Controller
                  name="identity"
                  control={control}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      label={clientType === 'Company' ? t('client.brNumber') : t('client.hkid')}
                      fullWidth
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                    />
                  )}
                />

                <Controller
                  name="date"
                  control={control}
                  render={({ field: { onChange, value, ...fieldProps }, fieldState: { error } }) => (
                    <DatePicker
                      {...fieldProps}
                      label={t('client.date')}
                      value={value ? DateTime.fromJSDate(new Date(value)) : null}
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

              <Controller
                name="address1"
                control={control}
                render={({ field, fieldState }) => <TextField
                  {...field}
                  label={t('client.addressLine1')}
                  fullWidth
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />}
              />

              <Controller
                name="address2"
                control={control}
                render={({ field, fieldState }) => <TextField
                  {...field}
                  label={t('client.addressLine2')}
                  fullWidth
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />}
              />

              <Box sx={{ display: 'flex', gap: 2 }}>
                <Box sx={{ width: '35%' }}>
                  <Controller
                    name="phoneNumber"
                    control={control}
                    render={({ field, fieldState }) =>
                      <TextField {...field}
                        label={t('client.phoneNumber')}
                        fullWidth
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                      />}
                  />
                </Box>
                <Controller
                  name="email"
                  control={control}
                  render={({ field, fieldState }) =>
                    <TextField
                      label={t('client.eMail')}
                      {...field}
                      fullWidth
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                    />
                  }
                />
              </Box>

              <Box sx={{ display: 'flex', gap: 2 }}>
                <Controller
                  name="industry"
                  control={control}
                  render={({ field, fieldState }) => <TextField
                    {...field}
                    label={t('client.industry')}
                    fullWidth
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />}
                />
                <Controller
                  name="natureOfWork"
                  control={control}
                  render={({ field, fieldState }) => <TextField
                    {...field}
                    label={t('client.natureOfWork')}
                    fullWidth
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />}
                />
              </Box>

              {/* Broker / Subagent Assignment */}
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mt: 1 }}>
                {t('client.assignment')}
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Controller
                  name="brokerId"
                  control={control}
                  render={({ field }) => (
                    <Autocomplete
                      value={brokers.find(b => b.id === field.value) ?? null}
                      onChange={(_, newValue) => {
                        handleBrokerChange(newValue?.id ?? null);
                      }}
                      options={brokers}
                      getOptionLabel={(option) => option.name}
                      isOptionEqualToValue={(option, value) => option.id === value.id}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label={t('client.broker')}
                          fullWidth
                        />
                      )}
                      fullWidth
                    />
                  )}
                />
                <Controller
                  name="subagentId"
                  control={control}
                  render={({ field }) => (
                    <Autocomplete
                      value={subagents.find(s => s.id === field.value) ?? null}
                      onChange={(_, newValue) => {
                        setValue('subagentId', newValue?.id ?? null);
                      }}
                      options={filteredSubagents}
                      getOptionLabel={(option) => option.name}
                      isOptionEqualToValue={(option, value) => option.id === value.id}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label={t('client.subagent')}
                          fullWidth
                          disabled={!selectedBrokerId}
                        />
                      )}
                      fullWidth
                    />
                  )}
                />
              </Box>

              <Controller
                name="remark"
                control={control}
                render={({ field, fieldState }) => <TextField
                  {...field}
                  label={t('client.remark')}
                  multiline
                  rows={3}
                  fullWidth
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />}
              />  
            </Stack>
          </Box> 
        </Stack>
      </form>
    </Box>
  );
};

export default ClientInformationForm;