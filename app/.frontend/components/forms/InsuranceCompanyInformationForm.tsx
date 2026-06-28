import React from 'react';
import { Box, Button, Card, CardContent, Stack, TextField, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { InsuranceCompanyInfoSchema, type InsuranceCompanyInfo } from '~/.frontend/models/InsuranceCompanyInfo';

interface InsuranceCompanyInformationFormProps {
  insuranceCompany?: InsuranceCompanyInfo;
  onSave: (insuranceCompany: InsuranceCompanyInfo) => void;
}

const InsuranceCompanyInformationForm: React.FC<InsuranceCompanyInformationFormProps> = ({ insuranceCompany, onSave }) => {
  const { control, handleSubmit, reset } = useForm<InsuranceCompanyInfo>({
    resolver: zodResolver(InsuranceCompanyInfoSchema),
    defaultValues: insuranceCompany ?? { name: '' },
  });

  const onSubmit = (data: InsuranceCompanyInfo) => {
    onSave({ ...data, id: insuranceCompany?.id });
    reset();
  };

  return (
    <Card elevation={0} sx={{ borderRadius: 3 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {insuranceCompany?.id ? 'Edit Insurance Company' : 'Create Insurance Company'}
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <Controller
              name="name"
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="Insurance Company Name"
                  fullWidth
                  required
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
            <Stack direction="row" spacing={2} justifyContent="flex-end">
              <Button variant="outlined" type="button" onClick={() => reset()}>
                Reset
              </Button>
              <Button variant="contained" type="submit">
                Save
              </Button>
            </Stack>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
};

export default InsuranceCompanyInformationForm;
