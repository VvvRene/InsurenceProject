import React, { useState } from 'react';
import { 
  Box, 
  TextField, 
  Tabs, 
  Tab, 
  Paper, 
  Typography, 
  MenuItem,  
    Grid,
  Divider 
} from '@mui/material';


const InsuranceForm = () => {
  const [tabValue, setTabValue] = useState(0);

  return (
    <Paper elevation={3} sx={{ p: 2, backgroundColor: '#f5f5f5',   margin: 'auto' }}>
      {/* Header Info */}
      <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 'bold', color: '#1976d2' }}>
        Vehicle Insurance - P178791N - WONG CHUN HO
      </Typography> 
      <Grid container spacing={2}>
        {/* Left Column - Main Details */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Grid container spacing={1}>
            <Grid size={{ xs: 6 }}>
              <TextField label="Policy No." defaultValue="P178791" fullWidth size="small" />
            </Grid>
            <Grid size={{ xs: 6 }}>
              <TextField label="Update Date" defaultValue="09/07/2025" fullWidth size="small" disabled />
            </Grid>
            
            <Grid size={{ xs: 6 }}>
              <TextField label="Policy Holder" defaultValue="WONG CHUN HO" fullWidth size="small" />
            </Grid>

            <Grid size={{ xs: 6 }}>
              <TextField label="Insurance Company" defaultValue="V2 - Assurance Co. Ltd" fullWidth size="small" />
            </Grid>

            <Grid size={{ xs: 6 }}>
              <TextField label="Insured Amount (HKD)" defaultValue="120,000.00" fullWidth size="small" />
            </Grid>
            <Grid size={{ xs: 6 }}>
              <TextField label="Premium (HKD)" defaultValue="2,577.50" fullWidth size="small" />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField 
                label="Remarks" 
                multiline 
                rows={6} 
                defaultValue="TANG WING HO - Colleague" 
                fullWidth 
                size="small" 
              />
            </Grid>
          </Grid>
        </Grid>

        {/* Right Column - Status & Meta */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            <TextField select label="Status" defaultValue="Active" fullWidth size="small">
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Pending">Pending</MenuItem>
            </TextField>
            
            <TextField label="Update User" defaultValue="jackie" fullWidth size="small" />
            
            <TextField 
              label="Input Date" 
              type="date" 
              defaultValue="2025-04-23" 
              fullWidth 
              size="small" 
              InputLabelProps={{ shrink: true }} 
            />

            <TextField label="Receipt No." defaultValue="R122726" fullWidth size="small" />
            
            <Box sx={{ 
              mt: 2, 
              p: 2, 
              border: '1px dashed grey', 
              textAlign: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100px'
            }}>
              <Typography variant="h4" color="textSecondary">U</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default InsuranceForm;