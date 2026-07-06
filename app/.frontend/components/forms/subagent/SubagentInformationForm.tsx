import React from 'react';
import { Box, Button, Card, CardContent, Stack, TextField, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { SubagentInfoSchema, type SubagentInfo } from '~/.frontend/models/SubagentInfo';

interface SubagentInformationFormProps {
  subagent?: SubagentInfo;
  brokerId: number;
  onSave: (subagent: SubagentInfo) => void;
}

const SubagentInformationForm: React.FC<SubagentInformationFormProps> = ({ subagent, brokerId, onSave }) => {
  const { t } = useTranslation();
  const { control, handleSubmit, reset } = useForm<SubagentInfo>({
    resolver: zodResolver(SubagentInfoSchema),
    defaultValues: subagent ?? { name: '', brokerId },
  });

  const onSubmit = (data: SubagentInfo) => {
    onSave({ ...data, id: subagent?.id, brokerId });
    reset();
  };

  return (
    <Card elevation={0} sx={{ borderRadius: 3 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {subagent?.id ? t('subagent.editSubagent') : t('subagent.createSubagent')}
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <Controller
              name="name"
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label={t('subagent.subagentName')}
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

export default SubagentInformationForm;