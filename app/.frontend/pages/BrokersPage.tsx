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
import type { Broker } from '~/generated/prisma/browser';
import type { BrokerInfo } from '../models/BrokerInfo';
import BrokerUpsertDialog from '../components/dialogs/BrokerUpsertDialog';

interface BrokersPageProps {
  brokers: Broker[];
  onSave: (broker: BrokerInfo) => void;
}

const BrokersPage: React.FC<BrokersPageProps> = ({ brokers, onSave }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedBroker, setSelectedBroker] = useState<BrokerInfo | undefined>(undefined);

  const filteredBrokers = brokers.filter((broker) => {
    return broker.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const handleAdd = () => {
    setSelectedBroker(undefined);
    setIsDialogOpen(true);
  };

  const handleEdit = (broker: Broker) => {
    setSelectedBroker({ id: broker.id, name: broker.name });
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setSelectedBroker(undefined);
  };

  const handleDialogSave = (data: BrokerInfo) => {
    onSave(data);
    handleDialogClose();
  };

  return (
    <Box sx={{ margin: '0 auto' }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
        Brokers
      </Typography>

      <Paper sx={{ p: 2, mb: 3 }}>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems="center" justifyContent="space-between">
          <TextField
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            label="Search by name"
            placeholder="e.g. John Doe"
            slotProps={{ input: { startAdornment: <SearchIcon color="action" sx={{ mr: 1 }} /> } }}
            fullWidth
          />
          <Button variant="contained" startIcon={<AddIcon />} onClick={handleAdd}>
            Add Broker
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
            {filteredBrokers.map((broker) => (
              <TableRow key={broker.id} hover onClick={() => handleEdit(broker)} sx={{ cursor: 'pointer' }}>
                <TableCell>{broker.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <BrokerUpsertDialog
        open={isDialogOpen}
        broker={selectedBroker}
        onClose={handleDialogClose}
        onSave={handleDialogSave}
      />
    </Box>
  );
};

export default BrokersPage;
