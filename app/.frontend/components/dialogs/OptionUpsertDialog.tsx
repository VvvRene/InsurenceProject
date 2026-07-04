"use client";

import React from 'react';
import { Dialog } from '@mui/material';
import type { VehicleOptionInfo } from '~/.frontend/models/VehicleOptionInfo';
import OptionInformationForm from '../forms/OptionInformationForm';

interface OptionUpsertDialogProps {
  open: boolean;
  option?: VehicleOptionInfo;
  labelKey: string;
  onClose: () => void;
  onSave: (option: VehicleOptionInfo) => void;
}

const OptionUpsertDialog: React.FC<OptionUpsertDialogProps> = ({ open, option, labelKey, onClose, onSave }) => {
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
      <OptionInformationForm option={option} labelKey={labelKey} onSave={onSave} />
    </Dialog>
  );
};

export default OptionUpsertDialog;