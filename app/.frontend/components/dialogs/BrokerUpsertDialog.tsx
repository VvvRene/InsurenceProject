"use client";

import React from 'react';
import { Dialog } from '@mui/material';
import type { BrokerInfo } from '~/.frontend/models/BrokerInfo';
import BrokerInformationForm from '../forms/BrokerInformationForm';

interface BrokerUpsertDialogProps {
  open: boolean;
  broker?: BrokerInfo;
  onClose: () => void;
  onSave: (broker: BrokerInfo) => void;
}

const BrokerUpsertDialog: React.FC<BrokerUpsertDialogProps> = ({ open, broker, onClose, onSave }) => {
  const handleInternalClose = () => {
    onClose();
  };

  return (
    <Dialog
      fullWidth
      open={open}
      onClose={handleInternalClose}
      slotProps={{
        paper: {
          sx: {
            maxWidth: '60%',
            borderRadius: 4,
          },
        },
      }}
    >
      <BrokerInformationForm broker={broker} onSave={onSave} />
    </Dialog>
  );
};

export default BrokerUpsertDialog;
