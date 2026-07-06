"use client";

import React from 'react';
import { Dialog } from '@mui/material';
import type { SubagentInfo } from '~/.frontend/models/SubagentInfo';
import SubagentInformationForm from '../../forms/subagent/SubagentInformationForm';

interface SubagentUpsertDialogProps {
  open: boolean;
  subagent?: SubagentInfo;
  brokerId: number;
  onClose: () => void;
  onSave: (subagent: SubagentInfo) => void;
}

const SubagentUpsertDialog: React.FC<SubagentUpsertDialogProps> = ({ open, subagent, brokerId, onClose, onSave }) => {
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
      <SubagentInformationForm subagent={subagent} brokerId={brokerId} onSave={onSave} />
    </Dialog>
  );
};

export default SubagentUpsertDialog;