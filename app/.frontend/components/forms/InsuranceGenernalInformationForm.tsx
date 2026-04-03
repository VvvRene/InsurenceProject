import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Box,
  TextField,
  Typography,
  MenuItem,
  Checkbox,
  Button,
  Paper,
  Divider,
  IconButton,
  InputAdornment
} from '@mui/material';
import Grid from '@mui/material/Grid';
import SearchIcon from '@mui/icons-material/Search';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import type { InsuranceGeneralInformation } from '~/.frontend/models/InsuranceGenernalInformation';
import { HookFormTextField } from '../HookFormTextField';

export interface InsuranceGeneralInformationFormProps {
  data?: InsuranceGeneralInformation;
  onSubmit?: (data: InsuranceGeneralInformation) => void;
}

export const InsuranceGeneralInformationForm: React.FC<InsuranceGeneralInformationFormProps> = ({ data, onSubmit = () => { } }) => {
  const { register, handleSubmit, control } = useForm<InsuranceGeneralInformation>({
    defaultValues: data,
  });

  return (
    <Paper sx={{ p: 2 }} elevation={2}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          {/* Main Content (Left 75%) */}
          <Grid size={{ xs: 12, md: 9 }}>
            <Grid container spacing={1.5} alignItems="center">

              {/* Policy Number */}
              <Grid size={1}>
                <Typography variant="body2" align="right">保單編號</Typography>
              </Grid>
              <Grid size={5} sx={{ display: 'flex', gap: 0.5 }}>
                <HookFormTextField name="uuid" control={control} size="small" fullWidth />
                <HookFormTextField name="policyNumber" control={control} size="small" sx={{ width: 50 }} disabled />
              </Grid>

              {/* Update Date */}
              <Grid size={1}>
                <Typography variant="body2" align="right">更新日期</Typography>
              </Grid>
              <Grid size={5}>
                <HookFormTextField name="updateDate" control={control} size="small" fullWidth disabled />
              </Grid>

              {/* Quote */}
              <Grid size={1}>
                <Typography variant="body2" align="right">報價編號</Typography>
              </Grid>
              <Grid size={5}>
                <HookFormTextField name="quotationNumber" control={control} size="small" fullWidth disabled />
              </Grid>

              {/* Policy Status */}
              <Grid size={1}>
                <Typography variant="body2" align="right">保單狀態</Typography>
              </Grid>
              <Grid size={5}>
                <HookFormTextField select name="processType" control={control} size="small" fullWidth >
                  <MenuItem value="生效中">生效中</MenuItem>
                </HookFormTextField>
              </Grid>

              {/* Policy Code */}
              <Grid size={1}>
                <Typography variant="body2" align="right">保單號碼</Typography>
              </Grid>
              <Grid size={5}>
                <HookFormTextField name="policyNumber" control={control} size="small" fullWidth disabled />
              </Grid>

              {/* Company */}
              <Grid size={1}>
                <Typography variant="body2" align="right">承保公司</Typography>
              </Grid>
              <Grid size={11} sx={{ display: 'flex' }}>
                <HookFormTextField name="insuranceCompanyId" control={control} size="small" fullWidth />
                <IconButton size="small" sx={{ border: '1px solid #ccc', borderRadius: 0, ml: -0.1 }}><SearchIcon /></IconButton>
              </Grid>

              {/* Agent Name */}
              <Grid size={1}>
                <Typography variant="body2" align="right">代理名稱</Typography>
              </Grid>
              <Grid size={11} sx={{ display: 'flex' }}>
                <HookFormTextField name="brokerId" control={control} size="small" fullWidth disabled />
                <IconButton size="small" sx={{ border: '1px solid #ccc', borderRadius: 0, ml: -0.1 }}><SearchIcon /></IconButton>
              </Grid>

              {/* Amounts */}
              <Grid size={1}>
                <Typography variant="body2" align="right">投保金額</Typography>
              </Grid>
              <Grid size={5} sx={{ display: 'flex' }}>
                <HookFormTextField select name="currency" control={control} size="small" sx={{ minWidth: 80 }}>
                  <MenuItem value="HKD">HKD</MenuItem>
                </HookFormTextField>
                <HookFormTextField name="premiumAmount" control={control} size="small" fullWidth />
              </Grid>

            </Grid>
          </Grid>
        </Grid>

        <Divider sx={{ my: 2 }} />

        <Grid container spacing={3} >
          <Grid size={0.75} sx={{ alignSelf: 'start' }}>
            <Typography variant="body2" align="right" >備註</Typography>
          </Grid>
          <Grid size={11.25}>
            <HookFormTextField name="remark" control={control} multiline rows={6} fullWidth />
          </Grid>
        </Grid>

        <Divider sx={{ my: 2 }} />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="contained" type="submit">儲存 (Save)</Button>
        </Box>
      </form>
    </Paper>
  );
}