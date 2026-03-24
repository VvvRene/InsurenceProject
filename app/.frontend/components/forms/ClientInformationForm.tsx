import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  TextField,
  Button,
  MenuItem,
  Stack,
  Box,
  Typography,
  Paper,
  Divider,
  IconButton
} from '@mui/material';
import { DateTime } from 'luxon';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import SaveIcon from '@mui/icons-material/Save';

// 1. Validation Schema (Matches your Prisma model)
const clientSchema = z.object({
  type: z.enum(['Company', 'Individual']),
  identity: z.string().min(1, 'Identity is required'),
  abbr: z.string().min(1, 'Title is required'),
  name: z.string().min(1, 'Name is required'),
  chineseName: z.string().optional(),
  address1: z.string().min(1, 'Address is required'),
  address2: z.string().optional(),
  phoneNumber: z.string().min(1, 'Phone is required'),
  email: z.string().email().optional().or(z.literal('')),
  date: z.custom<DateTime>((val) => val instanceof DateTime).nullish(),
  gender: z.string(),
  businessRegistrationNumber: z.string().optional(),
  industry: z.string().optional(),
  remark: z.string().optional(),
});

type ClientFormData = z.infer<typeof clientSchema>;

const ClientInformationForm = () => {

  const { control, handleSubmit, watch, formState: { errors } } = useForm<ClientFormData>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      type: 'Individual',
      gender: 'Not Applicable',
      abbr: 'MR',
      date: null,
    }
  });

  const clientType = watch('type');

  const onSubmit = (data: ClientFormData) => {
    console.log('Submitted Data:', data);
  };

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
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

        <Box sx={{ p: 4 }}>

          <Stack spacing={2.5}>
            {/* Row 1: Type and Identity */}
            <Box sx={{ width: '30%', minWidth: '180px' }}>
              <Controller
                name="type"
                control={control}
                render={({ field }) => (
                  <TextField {...field} select label="Client Type" fullWidth>
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
                    render={({ field }) => (
                      <TextField {...field} select label="Title" fullWidth>
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
                render={({ field }) => (
                  <TextField
                    {...field}
                    label={clientType === 'Company' ? "Company Name" : "Full Name"}
                    fullWidth
                    error={!!errors.name}
                    helperText={errors.name?.message}
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
                    render={({ field }) => (
                      <TextField {...field} select label="Gender" fullWidth>
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
                render={({ field }) => <TextField {...field} label="Chinese Name (Optional)" fullWidth />}
              />
            </Box>

 <Box sx={{ display: 'flex', gap: 2 }}>

              <Controller
                name="identity"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label={clientType === 'Company' ? "BR Number" : "HKID"}
                    fullWidth
                    error={!!errors.identity}
                    helperText={errors.identity?.message}
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
                    value={value}
                    onChange={(newValue) => onChange(newValue)} // Explicitly update form state
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
              render={({ field }) => <TextField {...field} label="Address Line 1" fullWidth required />}
            />

            <Controller
              name="address2"
              control={control}
              render={({ field }) => <TextField {...field} label="Address Line 2 (Optional)" fullWidth />}
            />

            {/* Conditional Fields */}
            {clientType === 'Company' && (
              <Stack direction="row" spacing={2}>
                <Controller
                  name="businessRegistrationNumber"
                  control={control}
                  render={({ field }) => <TextField {...field} label="BR No." fullWidth />}
                />
                <Controller
                  name="industry"
                  control={control}
                  render={({ field }) => <TextField {...field} label="Industry" fullWidth />}
                />
              </Stack>
            )}

            <Controller
              name="phoneNumber"
              control={control}
              render={({ field }) => <TextField {...field} label="Phone Number" fullWidth required />}
            />

            <Controller
              name="email"
              control={control}
              render={({ field }) => <TextField {...field} label="E-Mail" fullWidth required />}
            />

            <Controller
              name="remark"
              control={control}
              render={({ field }) => <TextField {...field} label="Remark" multiline rows={2} fullWidth />}
            />

          </Stack>
        </Box>
      </form>
    </Box>
  );
};

export default ClientInformationForm;