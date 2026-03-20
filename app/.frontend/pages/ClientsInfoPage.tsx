import React from 'react';
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
import type { Client } from '~/generated/prisma/browser'; 
import FloatingButton from '../components/FloatingButton';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

interface SearchFilters {
    searchQuery: string;
    gender: string;
    ageRange: string;
    status: string;
}

interface ClientsInfoPageProps {
    clients: Client[]; // Replace with actual client type
}

const ClientsInfoPage = ({ clients }: ClientsInfoPageProps) => {

    const { control, handleSubmit, reset, watch } = useForm<SearchFilters>({
        defaultValues: {
            searchQuery: '',
            gender: '',
            ageRange: '',
            status: ''
        }
    });

    const onSearch = (data: SearchFilters) => {
        console.log('Filtering clients with:', data);
        // Trigger your data fetching logic here
    };
 
    const clientSearch = watch("searchQuery");

    const filteredClient = clients?.filter(client => {
        const isClientNameMatched = client.chineseName.toLowerCase().includes(clientSearch.toLowerCase())
            || client.lastName.toLowerCase().includes(clientSearch.toLowerCase())
            || client.firstName.toLowerCase().includes(clientSearch.toLowerCase());
        return isClientNameMatched;
    }) || [];

    const handleAddButtonOnClicked = () => {
        console.log( "On Client Added");
    }

    return (
        <Box sx={{  margin: '0 auto' }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
                Client Directory
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
                                        label="Search by Name or Email"
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
                                name="gender"
                                control={control}
                                render={({ field }) => (
                                    <TextField {...field} select fullWidth label="Gender">
                                        <MenuItem value="">All</MenuItem>
                                        <MenuItem value="male">Male</MenuItem>
                                        <MenuItem value="female">Female</MenuItem>
                                        <MenuItem value="other">Other</MenuItem>
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
                                    <TextField {...field} select fullWidth label="Age Group">
                                        <MenuItem value="">All Ages</MenuItem>
                                        <MenuItem value="18-25">18 - 25</MenuItem>
                                        <MenuItem value="26-40">26 - 40</MenuItem>
                                        <MenuItem value="41-60">41 - 60</MenuItem>
                                        <MenuItem value="60+">60+</MenuItem>
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
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'action.hover', borderRadius: 2  }}>
                <TableContainer component={Paper} sx={{ width: "100%", bgcolor: "layer.level1" }}>
                    <Table>
                        <TableHead sx={{ backgroundColor: "primary.main" }}>
                            <TableRow>
                                <TableCell sx={{ color: "primary.contrastText", fontWeight: 800, fontSize: "large" }}>Name</TableCell>
                                <TableCell sx={{ color: "primary.contrastText", fontWeight: 800 }}>Email</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredClient.map(client => (
                                <TableRow key={client.id}>
                                    <TableCell>{client.chineseName}</TableCell>
                                    <TableCell>"TBC"</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
            <FloatingButton icon={PersonAddIcon} onClicked={handleAddButtonOnClicked}/>
        </Box>
    )
}

export default ClientsInfoPage;