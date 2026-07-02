import React from 'react';
import { Box, Button, Card, CardContent, Stack, TextField, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { InsuranceCompanyInfoSchema, type InsuranceCompanyInfo } from '~/.frontend/models/InsuranceCompanyInfo';

interface InsuranceCompanyInformationFormProps {
  insuranceCompany?: InsuranceCompanyInfo;
  onSave: (insuranceCompany: InsuranceCompanyInfo) => void;
}

const InsuranceCompanyInformationForm: React.FC<InsuranceCompanyInformationFormProps> = ({ insuranceCompany, onSave }) => {
  const { t } = useTranslation();
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
          {insuranceCompany?.id ? t('insuranceCompany.editCompany') : t('insuranceCompany.createCompany')}
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <Controller
              name="name"
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label={t('insuranceCompany.companyName')}
                  fullWidth
                  required
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
            <Stack direction="row" spacing={2} justifyContent="flex-end">
              <Button variant="outlined" type="button" onClick={() => reset()}>
                {t('client.reset')}
              </Button>
              <Button variant="contained" type="submit">
                {t('common.save')}
              </Button>
            </Stack>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
};

export default InsuranceCompanyInformationForm;
