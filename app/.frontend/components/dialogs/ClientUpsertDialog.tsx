"use client";

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Dialog, Paper } from '@mui/material';
import type { Client } from '~/generated/prisma/client';
import ClientInformationForm from '../forms/ClientInformationForm';
import { Container } from '@mui/system';

// Define the shape of the form data
interface FileUploadFormInputs {
  description: string;
  file: FileList;
  clientId: number;
}

interface ClientCreationDialogProps {
  open: boolean;
  client?: Client;
  onClose: () => void;
  onSave: (clients: Client) => void;
}

const ClientCreationDialog: React.FC<ClientCreationDialogProps> = ({ open, client, onClose, onSave }) => {

  const { control, handleSubmit, watch, setValue, reset } = useForm<FileUploadFormInputs>({
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
            maxWidth:'80%',
            borderRadius: 4, 
          },
        },
      }}
    >
      <ClientInformationForm></ClientInformationForm>
    </Dialog>
  );
};

export default ClientCreationDialog;