import React from 'react';
import { Box, Button, Card, CardContent, Stack, TextField, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { BrokerInfoSchema, type BrokerInfo } from '~/.frontend/models/BrokerInfo';

interface BrokerInformationFormProps {
  broker?: BrokerInfo;
  onSave: (broker: BrokerInfo) => void;
}

const BrokerInformationForm: React.FC<BrokerInformationFormProps> = ({ broker, onSave }) => {
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
          {broker?.id ? 'Edit Broker' : 'Create Broker'}
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <Controller
              name="name"
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="Broker Name"
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

export default BrokerInformationForm;
