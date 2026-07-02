import React from 'react';
import { Box, Button, Card, CardContent, Stack, TextField, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { BrokerInfoSchema, type BrokerInfo } from '~/.frontend/models/BrokerInfo';

interface BrokerInformationFormProps {
  broker?: BrokerInfo;
  onSave: (broker: BrokerInfo) => void;
}

const BrokerInformationForm: React.FC<BrokerInformationFormProps> = ({ broker, onSave }) => {
  const { t } = useTranslation();
  const { control, handleSubmit, reset } = useForm<BrokerInfo>({
    resolver: zodResolver(BrokerInfoSchema),
    defaultValues: broker ?? { name: '' },
  });

  const onSubmit = (data: BrokerInfo) => {
    onSave({ ...data, id: broker?.id });
    reset();
  };

  return (
    <Card elevation={0} sx={{ borderRadius: 3 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {broker?.id ? t('broker.editBroker') : t('broker.createBroker')}
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <Controller
              name="name"
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label={t('broker.brokerName')}
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

export default BrokerInformationForm;
