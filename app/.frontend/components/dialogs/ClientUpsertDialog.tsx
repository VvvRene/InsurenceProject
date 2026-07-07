"use client";

import React from 'react';
import { useForm } from 'react-hook-form';
import { Dialog } from '@mui/material';
import type { ClientInfo } from '~/.frontend/models/ClientInfo';
import type { Broker, Subagent } from '~/generated/prisma/browser';
import ClientInformationForm from '../forms/ClientInformationForm';

interface FileUploadFormInputs {
  description: string;
  file: FileList;
  clientId: number;
}

interface ClientCreationDialogProps {
  open: boolean;
  client?: ClientInfo;
  brokers: Broker[];
  subagents: Subagent[];
  onClose: () => void;
  onSave: (client: ClientInfo) => void;
}

const ClientCreationDialog: React.FC<ClientCreationDialogProps> = ({ open, client, brokers, subagents, onClose, onSave }) => {

  const { reset } = useForm<FileUploadFormInputs>({
    defaultValues: null as unknown as FileUploadFormInputs
  });

  const handleInternalClose = () => {
    reset();
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
            borderRadius: 4,
          },
        },
      }}
    >
      <ClientInformationForm client={client} brokers={brokers} subagents={subagents} onSave={onSave} />
    </Dialog>
  );
};

export default ClientCreationDialog;