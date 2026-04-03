"use client";

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Dialog, IconButton, Paper, Typography } from '@mui/material';
import type { Client } from '~/generated/prisma/client'; 
import InsurancePolicyForm from '../forms/InsurancePolicyForm';
import type { InsuranceGeneralInformation } from '~/.frontend/models/InsuranceGenernalInformation';
import type { VehiclePolicyDetailInformation } from '~/.frontend/models/VehiclePolicyDetailInformation';

// Define the shape of the form data
interface FileUploadFormInputs {
  description: string;
  file: FileList;
  clientId: number;
}

interface PolicyUpsertDialogProps {
  open: boolean;
  clients?: Client[]; // Assuming you have a list of clients to select from
  insuranceCompanies?: any[]; // Assuming insurance companies are also clients, adjust as needed
  brokers?: any[]; // Add broker type if needed
  onClose: () => void;
  onSave?: (data: { insuranceGeneralInformation: InsuranceGeneralInformation; vehiclePolicyDetailInformation: VehiclePolicyDetailInformation }) => void; // Optional onSave callback
}

const PolicyUpsertDialog: React.FC<PolicyUpsertDialogProps> = ({ open, clients, insuranceCompanies, brokers, onClose, onSave }) => {

  const { reset } = useForm<FileUploadFormInputs>({
    defaultValues: null as unknown as FileUploadFormInputs // Initialize with null and cast to the correct type
  });

  const handleInternalClose = () => {
    reset(); // Clear form on close
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
            maxWidth: '80%',
            maxHeight: '80vh',
            borderRadius: 4,
          },
        },
      }}
    > 
        <InsurancePolicyForm
          clients={clients || []} // Provide an empty array as a fallback
          insuranceCompanies={insuranceCompanies || []} // Provide an empty array as a fallback
          brokers={brokers || []} // Provide an empty array as a fallback 
          onSave={onSave}
        ></InsurancePolicyForm> 
    </Dialog>
  );
};

export default PolicyUpsertDialog;