import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  TextField,
  MenuItem,
  Stack,
  Box,
  Typography,
  IconButton
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import SaveIcon from '@mui/icons-material/Save';
import { ClientInfoSchema, type ClientInfo } from '~/.frontend/models/ClientInfo';
import { DateTime } from 'luxon';

interface ClientInformationFormProps {
  client?: ClientInfo,
  onSave: (client: ClientInfo) => void
}

const ClientInformationForm: React.FC<ClientInformationFormProps> = ({ client, onSave }) => {
 
  const { control, handleSubmit, watch, formState: { errors } } = useForm<ClientInfo>({
    resolver: zodResolver(ClientInfoSchema),
    defaultValues: {
      type: 'Individual',
      gender: 'Not Applicable',
      abbr: 'MR',
      chineseName: null,
      date: null,
    }
  });

  const clientType = watch('type');

  return (
    <Box sx={{ overflow: 'hidden' }}>
      <form onSubmit={handleSubmit(onSave)}>

        <Stack >
          <Stack
            direction='row'
            alignItems="center" // Keeps the text and icon vertically centered
            justifyContent="space-between"
            sx={{ bgcolor: "layer.level2", py: 2, px: 3 }}
          >
            <Typography variant="h5" sx={{ fontWeight: '700' }}>
              Client Entry
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
                      label="Client Type"
                      fullWidth
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                    >
                      <MenuItem value="Individual">Individual</MenuItem>
                      <MenuItem value="Company">Company</MenuItem>
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
                          label="Title"
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
                      label={clientType === 'Company' ? "Company Name" : "Full Name"}
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
                          label="Gender"
                          fullWidth
                          error={!!fieldState.error}
                          helperText={fieldState.error?.message}
                        >
                          <MenuItem value="Male">Male</MenuItem>
                          <MenuItem value="Female">Female</MenuItem>
                          <MenuItem value="Not Applicable">N/A</MenuItem>
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
                      label="Chinese Name (Optional)"
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
                      label={clientType === 'Company' ? "BR Number" : "HKID"}
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
                      label="Date"
                      value={value ? DateTime.fromJSDate(new Date(value)) : null}
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

              <Controller
                name="address1"
                control={control}
                render={({ field, fieldState }) => <TextField
                  {...field}
                  label="Address Line 1"
                  fullWidth required
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />}
              />

              <Controller
                name="address2"
                control={control}
                render={({ field, fieldState }) => <TextField
                  {...field}
                  label="Address Line 2 (Optional)"
                  fullWidth
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />}
              />

              {/* Conditional Fields */}
              {clientType === 'Company' && (
                <Stack direction="row" spacing={2}>
                  <Controller
                    name="businessRegistrationNumber"
                    control={control}
                    render={({ field }) => <TextField
                      {...field}
                      label="BR No."
                      fullWidth
                    />}
                  />
                  <Controller
                    name="industry"
                    control={control}
                    render={({ field, fieldState }) => <TextField
                      {...field}
                      label="Industry"
                      fullWidth
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                    />}
                  />
                </Stack>
              )}

              <Box sx={{ display: 'flex', gap: 2 }}>
                <Box sx={{ width: '35%' }}>
                  <Controller
                    name="phoneNumber"
                    control={control}
                    render={({ field, fieldState }) =>
                      <TextField {...field}
                        label="Phone Number"
                        fullWidth
                        required
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
                      label="E-Mail"
                      {...field}
                      fullWidth
                      required
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                    />
                  }
                />
              </Box>

              <Box sx={{ display: 'flex', gap: 2 }}>
                <Box sx={{ width: '40%' }}>
                  <Controller
                    name="industry"
                    control={control}
                    render={({ field, fieldState }) =>
                      <TextField
                        label="Industry"
                        {...field}
                        fullWidth
                        required
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                      />
                    }
                  />
                </Box>
                <Controller
                  name="natureOfWork"
                  control={control}
                  render={({ field, fieldState }) => <TextField
                    {...field}
                    label="Nature Of Work"
                    fullWidth
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />}
                />
              </Box>

              <Controller
                name="workDescription"
                control={control}
                render={({ field, fieldState }) => <TextField
                  {...field}
                  label="Work Description"
                  fullWidth
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />}
              />

              <Controller
                name="remark"
                control={control}
                render={({ field, fieldState }) => <TextField
                  {...field}
                  label="Remark"
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