import React, { useState } from 'react';
import {
  Box,
  Button,
  Collapse,
  IconButton,
  List,
  ListItem,
  ListItemText,
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
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTranslation } from 'react-i18next';
import type { Broker, Subagent } from '~/generated/prisma/browser';
import type { BrokerInfo } from '../models/BrokerInfo';
import type { SubagentInfo } from '../models/SubagentInfo';
import BrokerUpsertDialog from '../components/dialogs/BrokerUpsertDialog';
import SubagentUpsertDialog from '../components/dialogs/subagent/SubagentUpsertDialog';

interface BrokerWithSubagents extends Broker {
  subagents: Subagent[];
}

interface BrokersPageProps {
  brokers: BrokerWithSubagents[];
  onSave: (broker: BrokerInfo) => void;
  onSubagentSave: (subagent: SubagentInfo) => void;
  onSubagentDelete: (subagentId: number) => void;
}

interface SubagentRowProps {
  subagent: Subagent;
  onEdit: (subagent: Subagent) => void;
  onDelete: (subagentId: number) => void;
}

const SubagentRow: React.FC<SubagentRowProps> = ({ subagent, onEdit, onDelete }) => (
  <ListItem
    secondaryAction={
      <Stack direction="row" spacing={1}>
        <IconButton edge="end" size="small" onClick={() => onEdit(subagent)}>
          <Typography variant="body2" color="primary" sx={{ cursor: 'pointer' }}>
            Edit
          </Typography>
        </IconButton>
        <IconButton edge="end" size="small" onClick={() => onDelete(subagent.id)}>
          <DeleteIcon fontSize="small" color="error" />
        </IconButton>
      </Stack>
    }
  >
    <ListItemText primary={subagent.name} />
  </ListItem>
);

interface BrokerRowProps {
  broker: BrokerWithSubagents;
  onEditBroker: (broker: Broker) => void;
  onAddSubagent: (brokerId: number) => void;
  onEditSubagent: (subagent: Subagent) => void;
  onDeleteSubagent: (subagentId: number) => void;
}

const BrokerRow: React.FC<BrokerRowProps> = ({ broker, onEditBroker, onAddSubagent, onEditSubagent, onDeleteSubagent }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow hover onClick={() => onEditBroker(broker)} sx={{ cursor: 'pointer' }}>
        <TableCell sx={{ width: 40, padding: 0 }}>
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              setOpen(!open);
            }}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{broker.name}</TableCell>
        <TableCell align="right">{broker.subagents.length}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell sx={{ paddingBottom: 0, paddingTop: 0 }} colSpan={3}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 2 }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Subagents
                </Typography>
                <Button
                  size="small"
                  variant="outlined"
                  startIcon={<AddIcon />}
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddSubagent(broker.id);
                  }}
                >
                  Add Subagent
                </Button>
              </Stack>
              {broker.subagents.length === 0 ? (
                <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                  No subagents for this broker.
                </Typography>
              ) : (
                <List dense disablePadding>
                  {broker.subagents.map((subagent) => (
                    <SubagentRow
                      key={subagent.id}
                      subagent={subagent}
                      onEdit={onEditSubagent}
                      onDelete={onDeleteSubagent}
                    />
                  ))}
                </List>
              )}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

const BrokersPage: React.FC<BrokersPageProps> = ({ brokers, onSave, onSubagentSave, onSubagentDelete }) => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [isBrokerDialogOpen, setIsBrokerDialogOpen] = useState(false);
  const [selectedBroker, setSelectedBroker] = useState<BrokerInfo | undefined>(undefined);
  const [isSubagentDialogOpen, setIsSubagentDialogOpen] = useState(false);
  const [selectedSubagent, setSelectedSubagent] = useState<SubagentInfo | undefined>(undefined);
  const [subagentBrokerId, setSubagentBrokerId] = useState<number>(0);

  const filteredBrokers = brokers.filter((broker) => {
    return broker.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const handleAddBroker = () => {
    setSelectedBroker(undefined);
    setIsBrokerDialogOpen(true);
  };

  const handleEditBroker = (broker: Broker) => {
    setSelectedBroker({ id: broker.id, name: broker.name });
    setIsBrokerDialogOpen(true);
  };

  const handleBrokerDialogClose = () => {
    setIsBrokerDialogOpen(false);
    setSelectedBroker(undefined);
  };

  const handleBrokerDialogSave = (data: BrokerInfo) => {
    onSave(data);
    handleBrokerDialogClose();
  };

  const handleAddSubagent = (brokerId: number) => {
    setSelectedSubagent(undefined);
    setSubagentBrokerId(brokerId);
    setIsSubagentDialogOpen(true);
  };

  const handleEditSubagent = (subagent: Subagent) => {
    setSelectedSubagent({ id: subagent.id, name: subagent.name, brokerId: subagent.brokerId });
    setSubagentBrokerId(subagent.brokerId);
    setIsSubagentDialogOpen(true);
  };

  const handleSubagentDialogClose = () => {
    setIsSubagentDialogOpen(false);
    setSelectedSubagent(undefined);
    setSubagentBrokerId(0);
  };

  const handleSubagentDialogSave = (data: SubagentInfo) => {
    onSubagentSave(data);
    handleSubagentDialogClose();
  };

  const handleSubagentDelete = (subagentId: number) => {
    onSubagentDelete(subagentId);
  };

  return (
    <Box sx={{ margin: '0 auto' }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
        {t('broker.title')}
      </Typography>

      <Paper sx={{ p: 2, mb: 3 }}>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems="center" justifyContent="space-between">
          <TextField
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            label={t('broker.searchByName')}
            placeholder={t('broker.searchPlaceholder')}
            slotProps={{ input: { startAdornment: <SearchIcon color="action" sx={{ mr: 1 }} /> } }}
            fullWidth
          />
          <Button variant="contained" startIcon={<AddIcon />} onClick={handleAddBroker}>
            {t('broker.addBroker')}
          </Button>
        </Stack>
      </Paper>

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: 'primary.main' }}>
            <TableRow>
              <TableCell sx={{ width: 40, padding: 0 }} />
              <TableCell sx={{ color: 'primary.contrastText', fontWeight: 800 }}>{t('broker.name')}</TableCell>
              <TableCell sx={{ color: 'primary.contrastText', fontWeight: 800 }} align="right">
                {t('subagent.subagents')}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredBrokers.map((broker) => (
              <BrokerRow
                key={broker.id}
                broker={broker}
                onEditBroker={handleEditBroker}
                onAddSubagent={handleAddSubagent}
                onEditSubagent={handleEditSubagent}
                onDeleteSubagent={handleSubagentDelete}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <BrokerUpsertDialog
        open={isBrokerDialogOpen}
        broker={selectedBroker}
        onClose={handleBrokerDialogClose}
        onSave={handleBrokerDialogSave}
      />

      <SubagentUpsertDialog
        open={isSubagentDialogOpen}
        subagent={selectedSubagent}
        brokerId={subagentBrokerId}
        onClose={handleSubagentDialogClose}
        onSave={handleSubagentDialogSave}
      />
    </Box>
  );
};

export default BrokersPage;