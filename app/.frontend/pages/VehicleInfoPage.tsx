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
import { useTranslation } from 'react-i18next';
import type { VehicleType, VehicleBodyType } from '~/generated/prisma/browser';
import type { VehicleOptionInfo } from '../models/VehicleOptionInfo';
import OptionUpsertDialog from '../components/dialogs/OptionUpsertDialog';

interface VehicleInfoPageProps {
  vehicleTypes: VehicleType[];
  vehicleBodyTypes: VehicleBodyType[];
  onVehicleTypeSave: (data: VehicleOptionInfo) => void;
  onVehicleBodyTypeSave: (data: VehicleOptionInfo) => void;
}

const VehicleInfoPage: React.FC<VehicleInfoPageProps> = ({ vehicleTypes, vehicleBodyTypes, onVehicleTypeSave, onVehicleBodyTypeSave }) => {
  const { t } = useTranslation();
  const [typeSearchQuery, setTypeSearchQuery] = useState('');
  const [bodyTypeSearchQuery, setBodyTypeSearchQuery] = useState('');
  const [isTypeDialogOpen, setIsTypeDialogOpen] = useState(false);
  const [isBodyTypeDialogOpen, setIsBodyTypeDialogOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<VehicleOptionInfo | undefined>(undefined);
  const [selectedBodyType, setSelectedBodyType] = useState<VehicleOptionInfo | undefined>(undefined);

  const filteredVehicleTypes = vehicleTypes.filter((vt) =>
    vt.name.toLowerCase().includes(typeSearchQuery.toLowerCase())
  );

  const filteredVehicleBodyTypes = vehicleBodyTypes.filter((vbt) =>
    vbt.name.toLowerCase().includes(bodyTypeSearchQuery.toLowerCase())
  );

  const handleAddType = () => {
    setSelectedType(undefined);
    setIsTypeDialogOpen(true);
  };

  const handleEditType = (vt: VehicleType) => {
    setSelectedType({ id: vt.id, name: vt.name });
    setIsTypeDialogOpen(true);
  };

  const handleTypeDialogClose = () => {
    setIsTypeDialogOpen(false);
    setSelectedType(undefined);
  };

  const handleTypeDialogSave = (data: VehicleOptionInfo) => {
    onVehicleTypeSave(data);
    handleTypeDialogClose();
  };

  const handleAddBodyType = () => {
    setSelectedBodyType(undefined);
    setIsBodyTypeDialogOpen(true);
  };

  const handleEditBodyType = (vbt: VehicleBodyType) => {
    setSelectedBodyType({ id: vbt.id, name: vbt.name });
    setIsBodyTypeDialogOpen(true);
  };

  const handleBodyTypeDialogClose = () => {
    setIsBodyTypeDialogOpen(false);
    setSelectedBodyType(undefined);
  };

  const handleBodyTypeDialogSave = (data: VehicleOptionInfo) => {
    onVehicleBodyTypeSave(data);
    handleBodyTypeDialogClose();
  };

  return (
    <Box sx={{ margin: '0 auto' }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
        {t('vehicleInfo.title')}
      </Typography>

      {/* Vehicle Types Section */}
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mt: 2 }}>
        {t('vehicleInfo.vehicleTypes')}
      </Typography>
      <Paper sx={{ p: 2, mb: 3 }}>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems="center" justifyContent="space-between">
          <TextField
            value={typeSearchQuery}
            onChange={(event) => setTypeSearchQuery(event.target.value)}
            label={t('vehicleInfo.searchType')}
            placeholder={t('vehicleInfo.searchTypePlaceholder')}
            slotProps={{ input: { startAdornment: <SearchIcon color="action" sx={{ mr: 1 }} /> } }}
            fullWidth
          />
          <Button variant="contained" startIcon={<AddIcon />} onClick={handleAddType}>
            {t('vehicleInfo.addVehicleType')}
          </Button>
        </Stack>
      </Paper>

      <TableContainer component={Paper} sx={{ mb: 4 }}>
        <Table>
          <TableHead sx={{ backgroundColor: 'primary.main' }}>
            <TableRow>
              <TableCell sx={{ color: 'primary.contrastText', fontWeight: 800 }}>{t('vehicleInfo.name')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredVehicleTypes.map((vt) => (
              <TableRow key={vt.id} hover onClick={() => handleEditType(vt)} sx={{ cursor: 'pointer' }}>
                <TableCell>{vt.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Vehicle Body Types Section */}
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mt: 2 }}>
        {t('vehicleInfo.vehicleBodyTypes')}
      </Typography>
      <Paper sx={{ p: 2, mb: 3 }}>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems="center" justifyContent="space-between">
          <TextField
            value={bodyTypeSearchQuery}
            onChange={(event) => setBodyTypeSearchQuery(event.target.value)}
            label={t('vehicleInfo.searchBodyType')}
            placeholder={t('vehicleInfo.searchBodyTypePlaceholder')}
            slotProps={{ input: { startAdornment: <SearchIcon color="action" sx={{ mr: 1 }} /> } }}
            fullWidth
          />
          <Button variant="contained" startIcon={<AddIcon />} onClick={handleAddBodyType}>
            {t('vehicleInfo.addVehicleBodyType')}
          </Button>
        </Stack>
      </Paper>

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: 'primary.main' }}>
            <TableRow>
              <TableCell sx={{ color: 'primary.contrastText', fontWeight: 800 }}>{t('vehicleInfo.name')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredVehicleBodyTypes.map((vbt) => (
              <TableRow key={vbt.id} hover onClick={() => handleEditBodyType(vbt)} sx={{ cursor: 'pointer' }}>
                <TableCell>{vbt.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <OptionUpsertDialog
        open={isTypeDialogOpen}
        option={selectedType}
        labelKey="vehicleInfo.addVehicleType"
        onClose={handleTypeDialogClose}
        onSave={handleTypeDialogSave}
      />

      <OptionUpsertDialog
        open={isBodyTypeDialogOpen}
        option={selectedBodyType}
        labelKey="vehicleInfo.addVehicleBodyType"
        onClose={handleBodyTypeDialogClose}
        onSave={handleBodyTypeDialogSave}
      />
    </Box>
  );
};

export default VehicleInfoPage;