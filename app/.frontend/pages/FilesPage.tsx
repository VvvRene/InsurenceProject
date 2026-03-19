"use client";

import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
    Box, Typography, TextField, Button, Paper, Table, TableBody,
    TableCell, TableContainer, TableHead, TableRow, IconButton,
    InputAdornment, Stack,
    Tooltip
} from '@mui/material';
import {
    Search as SearchIcon,
    FileUpload as FileUploadIcon,
    Delete as DeleteIcon,
    Download as DownloadIcon,
    InsertDriveFile as FileIcon
} from '@mui/icons-material';
import type { Client, ClientFile } from '~/generated/prisma/browser';
import type { ClientFileInformation } from '../models/ClientFileInformation';
import FileUploadDialog from '../components/dialogs/FileUploadDialog';

// Define the shape of our form data
export interface FilesPageProps {
    clients: Client[];
    clientFiles?: ClientFile[]; // You can replace 'any' with the actual type of your client files if you have it defined
    onFileUpload: (data: ClientFileInformation) => void; // Optional callback for file upload 
    onFileDelete: (fileId: number) => void; // Optional callback for file deletion
}

interface FileFormInputs {
    search: string;
    fileUpload: FileList | null;
}

const FilesPage: React.FC<FilesPageProps> = ({ clients, clientFiles, onFileUpload, onFileDelete }) => {

    const [isDialogOpen, setIsDialogOpen] = useState(false);

    // Initialize React Hook Form
    const { control, watch } = useForm<FileFormInputs>({
        defaultValues: {
            search: '',
            fileUpload: null,
        }
    });

    // Watch the search field for real-time filtering
    const searchTerm = watch('search');

    const filteredFiles = clientFiles?.filter(file => {
        const client = clients.find(c => c.id === file.clientId);
        const isFileNameMatch = file.name.toLowerCase().includes(searchTerm.toLowerCase());
        const isClientNameMatch = client ? `${client.firstName} ${client.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) : false;
        return isFileNameMatch || isClientNameMatch;
    }) || [];

    return (
        <Box sx={{ maxWidth: 1000, margin: '0 auto' }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
                Client File Management
            </Typography>

            <Paper sx={{ p: 2, mb: 3, bgcolor: 'layer.level1' }}>
                <Stack direction={{ xs: 'column', sm: 'row'}} spacing={2}>
                    {/* Search Field controlled by RHF */}
                    <Controller
                        name="search"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                id="file-search-input"
                                suppressHydrationWarning
                                placeholder="Search files..."
                                variant="outlined"
                                size="small"
                                sx={{ flexGrow: 1 }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        )}
                    />

                    {/* Upload Button + Hidden Input */}
                    <Button
                        variant="contained"
                        component="label"
                        startIcon={<FileUploadIcon />}
                        sx={{ textTransform: 'none' }}
                        onClick={() => setIsDialogOpen(true)}
                    >
                        Upload
                    </Button>
                    <FileUploadDialog
                        open={isDialogOpen}
                        clients={clients}
                        onClose={() => setIsDialogOpen(false)}
                        onUpload={onFileUpload}
                    />
                </Stack>

                {/* Helper text to show selected file name */}
                {watch('fileUpload') && (
                    <Typography variant="caption" sx={{ mt: 1, display: 'block', color: 'green' }}>
                        Selected: {watch('fileUpload')?.[0]?.name}
                    </Typography>
                )}
            </Paper>

            {/* Table remains largely the same but uses filteredFiles */}
            <TableContainer component={Paper}>
                <Table>
                    <TableHead sx={{ backgroundColor: "primary.main" }}>
                        <TableRow>
                            <TableCell sx={{ color: "primary.contrastText", width: '40%' }}>File Name</TableCell>
                            <TableCell sx={{ color: "primary.contrastText", width: 'auto' }}>User</TableCell>
                            <TableCell sx={{ color: "primary.contrastText", width: '10%' }}>Size</TableCell> 
                            <TableCell sx={{ color: "primary.contrastText", width: '10%' }}>Date</TableCell>
                            <TableCell sx={{ color: "primary.contrastText", pr: 4, width: '120px' }} align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredFiles.map((file) => (
                            <Tooltip key={file.id} title={file.description || "No description provided"} arrow
                                slotProps={{
                                    popper: {
                                        sx: {
                                            zIndex: 1500, // Ensure it's above everything
                                            pointerEvents: 'none', // Prevents mouse "stutter"
                                        },
                                    },
                                }} >
                                <TableRow key={file.id} hover>
                                    <TableCell>
                                        <Stack direction="row" alignItems="center" spacing={1}>
                                            <FileIcon color="primary" fontSize="small" />
                                            {file.name}
                                        </Stack>
                                    </TableCell>
                                    <TableCell>{clients.find(client => client.id === file.clientId)?.firstName} {clients.find(client => client.id === file.clientId)?.lastName}</TableCell>
                                    <TableCell>{file.size}</TableCell>
                                    <TableCell>{new Date(file.createdAt).toLocaleDateString('en-US')}</TableCell>
                                    <TableCell align="right">
                                        <IconButton color="primary" href={`/client/files/download/${file.id}`} download>
                                            <DownloadIcon />
                                        </IconButton>
                                        <IconButton color="error" onClick={() => onFileDelete(file.id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            </Tooltip>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default FilesPage;