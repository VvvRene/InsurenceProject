import React, { useState } from 'react';
import {
    Box,
    TextField,
    MenuItem,
    Button,
    Typography,
    Stack,
    Grid,
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
import type { Broker, Client, InsuranceCompany, InsurancePolicy, VehicleType, VehicleBodyType, VehiclePolicyDetail } from '~/generated/prisma/browser';
import FloatingButton from '../components/FloatingButton';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

import ClientCreationDialog from '../components/dialogs/ClientUpsertDialog';
import type { ClientInfo } from '../models/ClientInfo';
import type InsurancePolicyForm from '../components/forms/InsurancePolicyForm';
import PolicyUpsertDialog from '../components/dialogs/PolicyUpsertDialog';
import type { VehiclePolicyDetailInformation } from '../models/VehiclePolicyDetailInformation';
import type { InsuranceGeneralInformation } from '../models/InsuranceGenernalInformation';

interface SearchFilters {
    searchQuery: string;
    categoryGroup: string;
    expiryDateRange: string;
    status: string;
}

interface PolicyInfoPageProps {
    clients: Client[]; // Replace with actual client type
    insuranceCompanies: InsuranceCompany[]; // Assuming insurance companies are also clients, adjust as needed
    brokers: Broker[]; // Add broker type if needed
    insurancePolicies: InsurancePolicy[];
    vehicleTypes?: VehicleType[];
    vehicleBodyTypes?: VehicleBodyType[];
    onSave?: (data: { 
        insuranceGeneralInformation: InsuranceGeneralInformation; 
        vehiclePolicyDetailInformation: VehiclePolicyDetailInformation 
    }) => void; // Optional onSave callback
}

const PolicyInfoPage: React.FC<PolicyInfoPageProps> = ({ clients, insuranceCompanies, brokers, insurancePolicies, vehicleTypes, vehicleBodyTypes, onSave }) => {
    const { t } = useTranslation();
    const { control, handleSubmit, reset, watch } = useForm<SearchFilters>({
        defaultValues: {
            searchQuery: '',
            categoryGroup: '',
            expiryDateRange: '',
            status: ''
        }
    });

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedPolicy, setSelectedPolicy] = useState<InsurancePolicy | null>(null);

    const onSearch = (data: SearchFilters) => {
        console.log('Filtering clients with:', data);
        // Trigger your data fetching logic here
    }; 

    const handleAddButtonOnClicked = () => {
        setSelectedPolicy(null);
        setIsDialogOpen(true);
    };

    const handleRowClick = (policy: InsurancePolicy) => {
        setSelectedPolicy(policy);
        setIsDialogOpen(true);
    };

    const handleDialogClose = () => {
        setIsDialogOpen(false);
        setSelectedPolicy(null);
    };

    return (
        <Box sx={{ margin: '0 auto' }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
                {t('policy.directory')}
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
                                        label={t('policy.searchHint')}
                                        placeholder={t('policy.searchPlaceholder')}
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
                                name="categoryGroup"
                                control={control}
                                render={({ field }) => (
                                    <TextField {...field} select fullWidth label={t('policy.category')}>
                                        <MenuItem value="">{t('client.all')}</MenuItem>
                                        <MenuItem value="individual">{t('client.individual')}</MenuItem>
                                        <MenuItem value="company">{t('client.company')}</MenuItem>
                                    </TextField>
                                )}
                            />
                        </Grid>

                        {/* Age Range Filter */}
                        <Grid size={{ xs: 6, md: 2 }}>
                            <Controller
                                name="status"
                                control={control}
                                render={({ field }) => (
                                    <TextField {...field} select fullWidth label={t('policy.status')}>
                                        <MenuItem value="">{t('client.all')}</MenuItem>
                                        <MenuItem value="active">{t('policy.active')}</MenuItem>
                                        <MenuItem value="inactive">{t('policy.inactive')}</MenuItem>
                                    </TextField>
                                )}
                            />
                        </Grid>

                        {/* Age Range Filter */}
                        <Grid size={{ xs: 6, md: 2 }}>
                            <Controller
                                name="expiryDateRange"
                                control={control}
                                render={({ field }) => (
                                    <TextField {...field} select fullWidth label={t('policy.expiryDate')}>
                                        <MenuItem value="">{t('policy.allDates')}</MenuItem>
                                        <MenuItem value="within-30-days">{t('policy.within30Days')}</MenuItem>
                                        <MenuItem value="within-90-days">{t('policy.within90Days')}</MenuItem>
                                        <MenuItem value="past-expiry">{t('policy.pastExpiry')}</MenuItem>
                                    </TextField>
                                )}
                            />
                        </Grid>

                        {/* Action Buttons */}
                        <Grid size={{ xs: 12, md: 12 }} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
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
                                <TableCell sx={{ color: "primary.contrastText", fontWeight: 800, width: "25%" }}>UUID</TableCell>
                                <TableCell sx={{ color: "primary.contrastText", fontWeight: 800, width: "10%" }}>{t('policy.category')}</TableCell>
                                <TableCell sx={{ color: "primary.contrastText", fontWeight: 800, width: "10%" }}>{t('policy.clientName')}</TableCell>
                                <TableCell sx={{ color: "primary.contrastText", fontWeight: 800, width: "10%" }}>{t('policy.expiryDate')}</TableCell>
                                <TableCell sx={{ color: "primary.contrastText", fontWeight: 800, width: "20%" }}>{t('policy.quotationNumber')}</TableCell>
                                <TableCell sx={{ color: "primary.contrastText", fontWeight: 800 }}>{t('client.remark')}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {insurancePolicies.map(policy => (
                                <TableRow key={policy.id} hover onClick={() => handleRowClick(policy)} sx={{ cursor: 'pointer' }}>
                                    <TableCell>{policy.uuid || "N/A"}</TableCell>
                                    <TableCell>{policy.category}</TableCell>
                                    <TableCell>{clients.find(client => client.id === policy.clientId)?.name || "N/A"}</TableCell>
                                    <TableCell>{policy.expiryDate ? policy.expiryDate.toDateString() : "N/A"}</TableCell>
                                    <TableCell>{policy.quotationNumber || "TBC"}</TableCell>
                                    <TableCell>{policy.remark || ""}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
            <FloatingButton icon={PersonAddIcon} onClicked={handleAddButtonOnClicked} />
            <PolicyUpsertDialog
                clients={clients}
                insuranceCompanies={insuranceCompanies}
                brokers={brokers}
                vehicleTypes={vehicleTypes}
                vehicleBodyTypes={vehicleBodyTypes}
                policy={selectedPolicy}
                open={isDialogOpen} 
                onClose={handleDialogClose} 
                onSave={onSave} />

        </Box>
    )
}

export default PolicyInfoPage;