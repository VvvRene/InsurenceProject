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
import type { InsuranceGenernalInformation } from '~/models/InsuranceGenernalInformation';
import { HookFormTextField } from '../HookFormTextField';
 
export interface InsuranceGenernalInformationFormProps {
  data?: InsuranceGenernalInformation;
  onSubmit?: (data: InsuranceGenernalInformation) => void;
}

export const InsuranceGenernalInformationForm: React.FC<InsuranceGenernalInformationFormProps> = ({ data, onSubmit = () => { } }) => {
  const { register, handleSubmit, control } = useForm<InsuranceGenernalInformation>({
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
                <HookFormTextField name="policyNumber" control={control} size="small" fullWidth />
                <HookFormTextField name="policySuffix" control={control} size="small" sx={{ width: 50 }} disabled />
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
                <HookFormTextField name="quoteNumber" control={control} size="small" fullWidth disabled />
              </Grid>

              {/* Policy Status */}
              <Grid size={1}>
                <Typography variant="body2" align="right">保單狀態</Typography>
              </Grid>
              <Grid size={5}>
                <HookFormTextField select name="policyStatus" control={control} size="small" fullWidth >
                  <MenuItem value="生效中">生效中</MenuItem>
                </HookFormTextField>
              </Grid>

              {/* Shared Number */}
              <Grid size={1}>
                <Typography variant="body2" align="right">共用編號</Typography>
              </Grid>
              <Grid size={5} sx={{ display: 'flex' }}>
                <HookFormTextField name="sharedNumber" control={control} size="small" fullWidth />
                <IconButton size="small" sx={{ border: '1px solid #ccc', borderRadius: 0, ml: -0.1 }}><ChevronRightIcon /></IconButton>
              </Grid>

              {/* Policy Code */}
              <Grid size={1}>
                <Typography variant="body2" align="right">保單號碼</Typography>
              </Grid>
              <Grid size={5}>
                <HookFormTextField name="policyCode" control={control} size="small" fullWidth disabled />
              </Grid>

              {/* Policy Holder */}
              <Grid size={1}>
                <Typography variant="body2" align="right">投保人</Typography>
              </Grid>
              <Grid size={11}>
                <HookFormTextField name="policyHolder" control={control} size="small" fullWidth />
              </Grid>

              {/* Company */}
              <Grid size={1}>
                <Typography variant="body2" align="right">承保公司</Typography>
              </Grid>
              <Grid size={11} sx={{ display: 'flex' }}>
                <HookFormTextField name="underwritingCompany" control={control} size="small" fullWidth />
                <IconButton size="small" sx={{ border: '1px solid #ccc', borderRadius: 0, ml: -0.1 }}><SearchIcon /></IconButton>
              </Grid>

              {/* Agent Name */}
              <Grid size={1}>
                <Typography variant="body2" align="right">代理名稱</Typography>
              </Grid>
              <Grid size={11} sx={{ display: 'flex' }}>
                <HookFormTextField name="agentName" control={control} size="small" fullWidth disabled />
                <IconButton size="small" sx={{ border: '1px solid #ccc', borderRadius: 0, ml: -0.1 }}><SearchIcon /></IconButton>
              </Grid>

              {/* Amounts */}
              <Grid size={1}>
                <Typography variant="body2" align="right">投保金額</Typography>
              </Grid>
              <Grid size={5} sx={{ display: 'flex' }}>
                <HookFormTextField select name="insuredAmountCurrency" control={control} size="small" sx={{ minWidth: 80 }}>
                  <MenuItem value="HKD">HKD</MenuItem>
                </HookFormTextField>
                <HookFormTextField name="insuredAmount" control={control} size="small" fullWidth />
              </Grid>

              {/* Online Number */}
              <Grid size={1}>
                <Typography variant="body2" align="right">網上編號</Typography>
              </Grid>
              <Grid size={5}>
                <HookFormTextField name="onlineNumber" control={control} size="small" fullWidth />
              </Grid>

              {/* Premium */}
              <Grid size={1}>
                <Typography variant="body2" align="right">保單費用</Typography>
              </Grid>
              <Grid size={5} sx={{ display: 'flex' }}>
                <HookFormTextField value="HKD" select name="premiumCurrency" control={control} size="small" sx={{ minWidth: 80 }} disabled>
                  <MenuItem value="HKD">HKD</MenuItem>
                </HookFormTextField>
                <HookFormTextField name="policyPremium" control={control} size="small" fullWidth disabled />
              </Grid>

            </Grid>
          </Grid>

          {/* Sidebar Content (Right 25%) */}
          <Grid size={{ xs: 12, md: 3 }} sx={{ borderLeft: '1px solid #ccc', pl: 2 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <TextField {...register('updatedBy')} label="更新用戶" size="small" fullWidth disabled />

              <TextField select {...register('nextStep')} label="下一步驟" size="small" fullWidth>
                <MenuItem value="已存檔">已存檔</MenuItem>
              </TextField>

              <TextField {...register('inputDate')} label="輸入日期" size="small" fullWidth />

              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Controller
                  name="hasCancellationDate"
                  control={control}
                  render={({ field }) => <Checkbox {...field} checked={field.value} size="small" />}
                />
                <TextField {...register('cancellationDate')} label="退單日期" size="small" fullWidth />
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Controller
                  name="hasSubmissionDate"
                  control={control}
                  render={({ field }) => <Checkbox {...field} checked={field.value} size="small" />}
                />
                <TextField {...register('submissionDate')} label="遞交日期" size="small" fullWidth />
              </Box>

              <TextField {...register('notificationDate')} label="通知日期" size="small" fullWidth />

              <TextField
                {...register('noticeNumber')}
                label="通知書編號"
                size="small"
                fullWidth
                slotProps={{ input: { endAdornment: <InputAdornment position="end">...</InputAdornment> } }}
              />

              <TextField {...register('receiptDate')} label="收據日期" size="small" fullWidth disabled />

              <TextField
                {...register('receiptNumber')}
                label="收據編號"
                size="small"
                fullWidth
                disabled
                slotProps={{ input: { endAdornment: <InputAdornment position="end">...</InputAdornment> } }}
              />
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 2 }} />

        <Grid container spacing={3} >
          <Grid size={0.75} sx={{ alignSelf: 'start' }}>
            <Typography variant="body2" align="right" >備註</Typography>
          </Grid>
          <Grid size={11.25}>
            <HookFormTextField name="remarks" control={control} multiline rows={6} fullWidth />
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