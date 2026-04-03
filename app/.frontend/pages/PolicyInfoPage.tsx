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
import type { Broker, Client, InsuranceCompany, InsurancePolicy } from '~/generated/prisma/browser';
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
    onSave?: (data: { 
        insuranceGeneralInformation: InsuranceGeneralInformation; 
        vehiclePolicyDetailInformation: VehiclePolicyDetailInformation 
    }) => void; // Optional onSave callback
}

const PolicyInfoPage: React.FC<PolicyInfoPageProps> = ({ clients, insuranceCompanies, brokers, insurancePolicies, onSave }) => {

    const { control, handleSubmit, reset, watch } = useForm<SearchFilters>({
        defaultValues: {
            searchQuery: '',
            categoryGroup: '',
            expiryDateRange: '',
            status: ''
        }
    });

    const [isDialogOpen, setIsDialogOpen] = useState(false);


    const onSearch = (data: SearchFilters) => {
        console.log('Filtering clients with:', data);
        // Trigger your data fetching logic here
    }; 

    const handleAddButtonOnClicked = () => {
        setIsDialogOpen(true);
    }

    return (
        <Box sx={{ margin: '0 auto' }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
                Policy Directory
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
                                        label="Client Name / Policy Number / Quotation Number"
                                        placeholder="e.g. John Doe"
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
                                    <TextField {...field} select fullWidth label="Category">
                                        <MenuItem value="">All</MenuItem>
                                        <MenuItem value="individual">Individual</MenuItem>
                                        <MenuItem value="company">Company</MenuItem>
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
                                    <TextField {...field} select fullWidth label="Status">
                                        <MenuItem value="">All</MenuItem>
                                        <MenuItem value="active">Active</MenuItem>
                                        <MenuItem value="inactive">Inactive</MenuItem>
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
                                    <TextField {...field} select fullWidth label="Expiry Date">
                                        <MenuItem value="">All Dates</MenuItem>
                                        <MenuItem value="within-30-days">Within 30 Days</MenuItem>
                                        <MenuItem value="within-90-days">Within 90 Days</MenuItem>
                                        <MenuItem value="past-expiry">Past Expiry</MenuItem>
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
                                    Apply Filters
                                </Button>
                                <Button
                                    variant="outlined"
                                    onClick={() => reset()}
                                    color="inherit"
                                >
                                    Reset
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
                                <TableCell sx={{ color: "primary.contrastText", fontWeight: 800, width: "10%" }}>Category</TableCell>
                                <TableCell sx={{ color: "primary.contrastText", fontWeight: 800, width: "10%" }}>Client Name</TableCell>
                                <TableCell sx={{ color: "primary.contrastText", fontWeight: 800, width: "10%" }}>Expiry Date</TableCell>
                                <TableCell sx={{ color: "primary.contrastText", fontWeight: 800, width: "20%" }}>Quotation Number</TableCell>
                                <TableCell sx={{ color: "primary.contrastText", fontWeight: 800 }}>Remark</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {insurancePolicies.map(policy => (
                                <TableRow key={policy.id}>
                                    <TableCell>{policy.category}</TableCell>
                                    <TableCell>{clients.find(client => client.id === policy.clientId)?.chineseName || "N/A"}</TableCell>
                                    <TableCell>{policy.expiryDate ? policy.expiryDate.toDateString() : "N/A"}</TableCell>
                                    <TableCell>{policy.quotationNumber || "TBC"}</TableCell>
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
                open={isDialogOpen} 
                onClose={() => setIsDialogOpen(false)} 
                onSave={onSave} />

        </Box>
    )
}

export default PolicyInfoPage;