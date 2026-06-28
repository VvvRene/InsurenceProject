import React, { useState } from 'react';
import {
  Box,
  Button,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import type { InsuranceCompany } from '~/generated/prisma/browser';
import type { InsuranceCompanyInfo } from '../models/InsuranceCompanyInfo';
import InsuranceCompanyUpsertDialog from '../components/dialogs/InsuranceCompanyUpsertDialog';

interface InsuranceCompaniesPageProps {
  insuranceCompanies: InsuranceCompany[];
  onSave: (insuranceCompany: InsuranceCompanyInfo) => void;
}

const InsuranceCompaniesPage: React.FC<InsuranceCompaniesPageProps> = ({ insuranceCompanies, onSave }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedInsuranceCompany, setSelectedInsuranceCompany] = useState<InsuranceCompanyInfo | undefined>(undefined);

  const filteredInsuranceCompanies = insuranceCompanies.filter((company) => {
    const query = searchQuery.toLowerCase();
    return company.name.toLowerCase().includes(query);
  });

  const handleAdd = () => {
    setSelectedInsuranceCompany(undefined);
    setIsDialogOpen(true);
  };

  const handleEdit = (company: InsuranceCompany) => {
    setSelectedInsuranceCompany({ id: company.id, name: company.name });
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setSelectedInsuranceCompany(undefined);
  };

  const handleDialogSave = (data: InsuranceCompanyInfo) => {
    onSave(data);
    handleDialogClose();
  };

  return (
    <Box sx={{ margin: '0 auto' }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
        Insurance Companies
      </Typography>

      <Paper sx={{ p: 2, mb: 3 }}>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems="center" justifyContent="space-between">
          <TextField
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            label="Search by name"
            placeholder="e.g. Allianz"
            slotProps={{ input: { startAdornment: <SearchIcon color="action" sx={{ mr: 1 }} /> } }}
            fullWidth
          />
          <Button variant="contained" startIcon={<AddIcon />} onClick={handleAdd}>
            Add Insurance Company
          </Button>
        </Stack>
      </Paper>

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: 'primary.main' }}>
            <TableRow>
              <TableCell sx={{ color: 'primary.contrastText', fontWeight: 800 }}>Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredInsuranceCompanies.map((company) => (
              <TableRow key={company.id} hover onClick={() => handleEdit(company)} sx={{ cursor: 'pointer' }}>
                <TableCell>{company.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <InsuranceCompanyUpsertDialog
        open={isDialogOpen}
        insuranceCompany={selectedInsuranceCompany}
        onClose={handleDialogClose}
        onSave={handleDialogSave}
      />
    </Box>
  );
};

export default InsuranceCompaniesPage;
