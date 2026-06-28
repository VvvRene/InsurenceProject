"use client";

import React from 'react';
import { Dialog } from '@mui/material';
import type { InsuranceCompanyInfo } from '~/.frontend/models/InsuranceCompanyInfo';
import InsuranceCompanyInformationForm from '../forms/InsuranceCompanyInformationForm';

interface InsuranceCompanyUpsertDialogProps {
  open: boolean;
  insuranceCompany?: InsuranceCompanyInfo;
  onClose: () => void;
  onSave: (insuranceCompany: InsuranceCompanyInfo) => void;
}

const InsuranceCompanyUpsertDialog: React.FC<InsuranceCompanyUpsertDialogProps> = ({ open, insuranceCompany, onClose, onSave }) => {
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
      <InsuranceCompanyInformationForm insuranceCompany={insuranceCompany} onSave={onSave} />
    </Dialog>
  );
};

export default InsuranceCompanyUpsertDialog;
