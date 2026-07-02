import React, { useState } from 'react';
import {
    Box,
    Card,
    CardContent,
    TextField,
    MenuItem,
    Button,
    Typography,
    Stack,
    Divider,
    Grid,
    List,
    Table,
    TableBody,
    TableHead,
    TableRow,
    TableCell,
    TableContainer,
    Paper
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import type { Client } from '~/generated/prisma/browser';
import FloatingButton from '../components/FloatingButton';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import BusinessIcon from '@mui/icons-material/Business';
import PersonIcon from '@mui/icons-material/Person';

import ClientCreationDialog from '../components/dialogs/ClientUpsertDialog';
import type { ClientInfo } from '../models/ClientInfo';

interface SearchFilters {
    searchQuery: string;
    gender: string;
    ageRange: string;
    status: string;
}

interface ClientsInfoPageProps {
    clients: Client[]; // Replace with actual client type
    onSave: (client: ClientInfo) => void
}

const toClientInfo = (client: Client): ClientInfo => ({
    id: client.id,
    type: client.type === 'Company' ? 'Company' : 'Individual',
    identity: client.identity ?? '',
    abbr: client.abbr ?? 'MR',
    name: client.name ?? '',
    chineseName: client.chineseName ?? null,
    address1: client.address1 ?? null,
    address2: client.address2 ?? null,
    phoneNumber: client.phoneNumber ?? null,
    email: client.email ?? null,
    industry: client.industry ?? null,
    gender: client.gender ?? 'Not Applicable',
    natureOfWork: client.natureOfWork ?? null,
    remark: client.remark ?? null,
    date: client.date ? new Date(client.date) : null,
});

const ClientsInfoPage : React.FC<ClientsInfoPageProps> = ({ clients, onSave } ) => {
    const { t } = useTranslation();
    const { control, handleSubmit, reset, watch } = useForm<SearchFilters>({
        defaultValues: {
            searchQuery: '',
            gender: '',
            ageRange: '',
            status: ''
        }
    });

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedClient, setSelectedClient] = useState<ClientInfo | undefined>(undefined);


    const onSearch = (data: SearchFilters) => {
        console.log('Filtering clients with:', data);
        // Trigger your data fetching logic here
    };

    const clientSearch = watch("searchQuery");

    const filteredClient = clients?.filter(client => {
        const isClientNameMatched = (client.chineseName || "").toLowerCase().includes(clientSearch.toLowerCase())
            || client.name.toLowerCase().includes(clientSearch.toLowerCase())
            || client.chineseName?.toLowerCase().includes(clientSearch.toLowerCase());
        return isClientNameMatched;
    }) || [];

    const handleAddButtonOnClicked = () => {
        setSelectedClient(undefined);
        setIsDialogOpen(true);
    }

    const handleEditClient = (client: Client) => {
        setSelectedClient(toClientInfo(client));
        setIsDialogOpen(true);
    }

    const handleDialogClose = () => {
        setIsDialogOpen(false);
        setSelectedClient(undefined);
    }

    const handleDialogSave = (client: ClientInfo) => {
        onSave(client);
        handleDialogClose();
    }
 
    return (
        <Box sx={{ margin: '0 auto' }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
                {t('client.directory')}
            </Typography>

            {/* Search Header Section */}
            <Paper sx={{ p: 2, mb: 3, bgcolor: 'layer.level1' }}>
                <form onSubmit={handleSubmit(onSearch)}>
                    <Grid container spacing={2} alignItems="center">
                        {/* Free Text Search */}
                        <Grid size={{ xs: 12, md: 4 }}>
                            <Controller
                                name="searchQuery"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        fullWidth
                                        label={t('client.searchByNameOrEmail')}
                                        placeholder={t('client.searchPlaceholder')}
                                        slotProps={{
                                            input: { startAdornment: <SearchIcon color="action" sx={{ mr: 1 }} /> }
                                        }}
                                    />
                                )}
                            />
                        </Grid>

                        {/* Gender Filter */}
                        <Grid size={{ xs: 6, md: 2 }}>
                            <Controller
                                name="gender"
                                control={control}
                                render={({ field }) => (
                                    <TextField {...field} select fullWidth label={t('client.gender')}>
                                        <MenuItem value="">{t('client.all')}</MenuItem>
                                        <MenuItem value="male">{t('client.male')}</MenuItem>
                                        <MenuItem value="female">{t('client.female')}</MenuItem>
                                        <MenuItem value="other">{t('client.other')}</MenuItem>
                                    </TextField>
                                )}
                            />
                        </Grid>

                        {/* Age Range Filter */}
                        <Grid size={{ xs: 6, md: 2 }}>
                            <Controller
                                name="ageRange"
                                control={control}
                                render={({ field }) => (
                                    <TextField {...field} select fullWidth label={t('client.ageGroup')}>
                                        <MenuItem value="">{t('client.allAges')}</MenuItem>
                                        <MenuItem value="18-25">{t('client.age18_25')}</MenuItem>
                                        <MenuItem value="26-40">{t('client.age26_40')}</MenuItem>
                                        <MenuItem value="41-60">{t('client.age41_60')}</MenuItem>
                                        <MenuItem value="60+">{t('client.age60plus')}</MenuItem>
                                    </TextField>
                                )}
                            />
                        </Grid>

                        {/* Action Buttons */}
                        <Grid size={{ xs: 12, md: 4 }} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Stack direction="row" spacing={1} >
                                <Button
                                    variant="contained"
                                    type="submit"
                                    disableElevation
                                    startIcon={<SearchIcon />}
                                >
                                    {t('client.applyFilters')}
                                </Button>
                                <Button
                                    variant="outlined"
                                    onClick={() => reset()}
                                    color="inherit"
                                >
                                    {t('client.reset')}
                                </Button>
                            </Stack>
                        </Grid>
                    </Grid>
                </form>
            </Paper>

            {/* Results Placeholder */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'action.hover', borderRadius: 2 }}>
                <TableContainer component={Paper} sx={{ width: "100%", bgcolor: "layer.level1" }}>
                    <Table>
                        <TableHead sx={{ backgroundColor: "primary.main" }}>
                            <TableRow>
                                <TableCell sx={{ color: "primary.contrastText", fontWeight: 800, width: "10%" }}>{t('client.type')}</TableCell>
                                <TableCell sx={{ color: "primary.contrastText", fontWeight: 800, width: "10%" }}>{t('client.name')}</TableCell>
                                <TableCell sx={{ color: "primary.contrastText", fontWeight: 800, width: "10%" }}>{t('client.phone')}</TableCell>
                                <TableCell sx={{ color: "primary.contrastText", fontWeight: 800, width: "20%" }}>{t('client.email')}</TableCell>
                                <TableCell sx={{ color: "primary.contrastText", fontWeight: 800 }}>{t('client.remark')}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredClient.map(client => (
                                <TableRow key={client.id} hover onClick={() => handleEditClient(client)} sx={{ cursor: 'pointer' }}>
                                    <TableCell>{client.type == "Individual" ? <PersonIcon /> : <BusinessIcon />}</TableCell>
                                    <TableCell>{client.name}</TableCell>
                                    <TableCell>{client.phoneNumber || ""}</TableCell>
                                    <TableCell>{client.email || t('client.nA')}</TableCell>
                                    <TableCell>{client.remark || t('client.nA')}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
            <FloatingButton icon={PersonAddIcon} onClicked={handleAddButtonOnClicked} />
            <ClientCreationDialog open={isDialogOpen} client={selectedClient} onClose={handleDialogClose} onSave={handleDialogSave}></ClientCreationDialog>
        </Box>
    )
}

export default ClientsInfoPage;