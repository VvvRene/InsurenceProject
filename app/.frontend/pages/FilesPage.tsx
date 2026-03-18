"use client";

import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
    Box, Typography, TextField, Button, Paper, Table, TableBody,
    TableCell, TableContainer, TableHead, TableRow, IconButton,
    InputAdornment, Stack
} from '@mui/material';
import {
    Search as SearchIcon,
    FileUpload as FileUploadIcon,
    Delete as DeleteIcon,
    Download as DownloadIcon,
    InsertDriveFile as FileIcon
} from '@mui/icons-material'; 
import type { Client } from '~/generated/prisma/browser';
import type { ClientFileInformation } from '../models/ClientFileInformation';
import FileUploadDialog from '../components/dialogs/FileUploadDialog';
 
// Define the shape of our form data
export interface FilesPageProps {
    clients: Client[];
    onFileUpload: (data: ClientFileInformation) => void; // Optional callback for file upload
}

interface FileFormInputs {
    search: string;
    fileUpload: FileList | null;
}

interface FileData {
    id: string;
    name: string;
    size: string;
    belongedTo: string;
    uploadDate: string;
}

const FilesPage: React.FC<FilesPageProps> = ({ clients, onFileUpload }) => {

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

    // Mock data
    const files: FileData[] = [
        { id: '1', name: 'Project_Proposal.pdf', belongedTo: "John Doe", size: '2.4 MB', uploadDate: '2026-03-10' },
        { id: '2', name: 'Budget_2026.xlsx', belongedTo: "Jane Smith", size: '1.1 MB', uploadDate: '2026-03-15' },
    ];

    const filteredFiles = files.filter(file =>
        file.name.toLowerCase().includes(searchTerm.toLowerCase())
        || file.belongedTo.toLowerCase().includes(searchTerm.toLowerCase())
    );
 
    return (
        <Box sx={{ p: 4, maxWidth: 1000, margin: '0 auto' }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
                File Management
            </Typography>

            <Paper sx={{ p: 2, mb: 3 }}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    {/* Search Field controlled by RHF */}
                    <Controller
                        name="search"
                        control={control}
                        render={({ field }) => (
                            <>  </>
                            // <TextField
                            //     id="file-search-input"
                            //     {...field}
                            //     placeholder="Search files..."
                            //     variant="outlined"
                            //     size="small"
                            //     sx={{ flexGrow: 1 }}
                            //     InputProps={{
                            //         startAdornment: (
                            //             <InputAdornment position="start">
                            //                 <SearchIcon />
                            //             </InputAdornment>
                            //         ),
                            //     }}
                            // />
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
                            <TableCell sx={{ color: "primary.contrastText" }}>File Name</TableCell>
                            <TableCell sx={{ color: "primary.contrastText" }}>User</TableCell>
                            <TableCell sx={{ color: "primary.contrastText" }}>Size</TableCell>
                            <TableCell sx={{ color: "primary.contrastText", pr: 4 }} align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredFiles.map((file) => (
                            <TableRow key={file.id} hover>
                                <TableCell sx={{ width: '40%' }}>
                                    <Stack direction="row" alignItems="center" spacing={1}>
                                        <FileIcon color="primary" fontSize="small" />
                                        {file.name}
                                    </Stack>
                                </TableCell>
                                <TableCell sx={{ width: '30%' }}>{file.belongedTo}</TableCell>
                                <TableCell sx={{ width: '10%' }}>{file.size}</TableCell>
                                <TableCell sx={{ width: 'auto' }} align="right">
                                    <IconButton color="primary"><DownloadIcon /></IconButton>
                                    <IconButton color="error"><DeleteIcon /></IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default FilesPage;