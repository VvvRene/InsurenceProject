"use client";

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Stack,
  Box,
  MenuItem,
  Paper
} from '@mui/material';
import { FileUpload as FileUploadIcon } from '@mui/icons-material';
import type { Client } from '~/generated/prisma/client';
import type { ClientFileInformation } from '~/.frontend/models/ClientFileInformation';

// Define the shape of the form data
interface FileUploadFormInputs {
  description: string;
  file: FileList;
  clientId: number;
}

interface FileUploadDialogProps {
  open: boolean;
  clients: Client[];
  onClose: () => void;
  // Callback to pass the data back to the parent
  onUpload: (data: ClientFileInformation) => void;
}

const FileUploadDialog: React.FC<FileUploadDialogProps> = ({ open, clients, onClose, onUpload }) => {
  const { control, handleSubmit, watch, setValue, reset } = useForm<FileUploadFormInputs>({
    defaultValues: null as unknown as FileUploadFormInputs // Initialize with null and cast to the correct type
  });

  const selectedFile = watch('file');

  const handleFormSubmit = (data: FileUploadFormInputs) => {
    onUpload({
      client: clients.find(client => client.id === data.clientId) as Client, // Find the selected client
      description: data.description,
      file: data.file[0] // Get the first file from the FileList
    });
    handleInternalClose();
  };

  const handleInternalClose = () => {
    reset(); // Clear form on close
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleInternalClose} fullWidth maxWidth="xs">
      <Paper elevation={3} sx={{ color: 'contrastText' }}>
        <DialogTitle sx={{ fontWeight: 700, bgcolor: 'main', color: 'contrastText' }}>
          Upload Client's File
        </DialogTitle>
      </Paper>

      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <DialogContent sx={{ mt: 2 }}>
          <Stack spacing={2}>
            {/* Client Selection */}
            <Controller
              name="clientId"
              control={control}
              rules={{ required: "Please select a user" }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  select
                  fullWidth
                  label="Select Client"
                  variant="outlined"
                  error={!!error}
                  helperText={error?.message}
                >
                  {clients.map((client) => (
                    <MenuItem key={client.id} value={client.id}>
                      {client.chineseName}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
            {/* Description Field */}
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Description"
                  variant="outlined"
                  fullWidth
                  multiline
                />
              )}
            />
            {/* File Selection Area */}
            <Box>
              <Button
                variant="outlined"
                component="label"
                fullWidth
                startIcon={<FileUploadIcon />}
                sx={{
                  py: 10,
                  borderStyle: 'dashed',
                  borderWidth: 2,
                  borderColor: selectedFile ? 'success.main' : 'primary.main'
                }}
              >
                {selectedFile?.[0] ? selectedFile[0].name : "Select File"}
                <input
                  type="file"
                  hidden
                  onChange={(e) => setValue('file', e.target.files as FileList)} // Cast to FileList
                />
              </Button>
              {selectedFile && (
                <Typography variant="caption" color="success.main" sx={{ mt: 1, display: 'block' }}>
                  File ready for upload
                </Typography>
              )}
            </Box>
          </Stack>
        </DialogContent>

        <DialogActions sx={{ p: 3 }}>
          <Button onClick={handleInternalClose} color="inherit">
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            disabled={!selectedFile}
          >
            <Typography variant="button" sx={{ color: 'contrastText', fontWeight: 900 }}>
              Confirm Upload
            </Typography>
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default FileUploadDialog;