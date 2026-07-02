import React from 'react';
import { Box, Button, Card, CardContent, Stack, TextField, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { VehicleOptionInfoSchema, type VehicleOptionInfo } from '~/.frontend/models/VehicleOptionInfo';

interface OptionInformationFormProps {
  option?: VehicleOptionInfo;
  labelKey: string;
  onSave: (option: VehicleOptionInfo) => void;
}

const OptionInformationForm: React.FC<OptionInformationFormProps> = ({ option, labelKey, onSave }) => {
  const { t } = useTranslation();
  const { control, handleSubmit, reset } = useForm<VehicleOptionInfo>({
    resolver: zodResolver(VehicleOptionInfoSchema),
    defaultValues: option ?? { name: '' },
  });

  const onSubmit = (data: VehicleOptionInfo) => {
    onSave({ ...data, id: option?.id });
    reset();
  };

  return (
    <Card elevation={0} sx={{ borderRadius: 3 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {t(labelKey)}
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <Controller
              name="name"
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label={t('common.name')}
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

export default OptionInformationForm;