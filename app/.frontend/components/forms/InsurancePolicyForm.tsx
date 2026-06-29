import React, { useEffect, useState } from 'react';
import {
    Box, Grid, TextField, MenuItem, Typography, Button,
    Paper, Divider, InputAdornment,
    IconButton,
    Stack
} from '@mui/material';

import { DateTime } from 'luxon';
import type { Broker, Client, InsuranceCompany } from '~/generated/prisma/browser';
import { TabsLayout, type TabItem } from '../TabsLayout';
import InsurancePolicyGeneralInformationForm from './insurance_policy/GeneranlInforamtionForm';
import { OmissionPage } from '~/.frontend/pages/OmissionPage';
import VehicleDetailForm from './insurance_policy/VehicleDetailForm';
import { insuranceGeneralInformationSchema, type InsuranceGeneralInformation } from '~/.frontend/models/InsuranceGenernalInformation';
import { vehiclePolicyDetailInformationSchema, type VehiclePolicyDetailInformation } from '~/.frontend/models/VehiclePolicyDetailInformation';
import SaveIcon from '@mui/icons-material/Save';
import { v4 as uuidv4 } from 'uuid';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { is } from 'zod/v4/locales';
import { useFetcher } from 'react-router';
import InsuranceCompanyUpsertDialog from '../dialogs/InsuranceCompanyUpsertDialog';
import BrokerUpsertDialog from '../dialogs/BrokerUpsertDialog';
import type { InsuranceCompanyInfo } from '~/.frontend/models/InsuranceCompanyInfo';
import type { BrokerInfo } from '~/.frontend/models/BrokerInfo';
import { toFormData } from '~/utils/toFormData';


interface InsurancePolicyFormProps {
    clients: Client[]; // Assuming you have a list of clients to select from
    insuranceCompanies: InsuranceCompany[]; // Assuming insurance companies are also clients, adjust as needed
    brokers: Broker[]; // Add broker type if needed
    onSave?: (data: { insuranceGeneralInformation: InsuranceGeneralInformation; vehiclePolicyDetailInformation: VehiclePolicyDetailInformation }) => void; // Optional onSave callback
}

const InsurancePolicyForm: React.FC<InsurancePolicyFormProps> = ({ clients, insuranceCompanies, brokers, onSave }) => {
    const fetcher = useFetcher();

    const [availableInsuranceCompanies, setAvailableInsuranceCompanies] = useState<InsuranceCompany[]>(insuranceCompanies);
    const [availableBrokers, setAvailableBrokers] = useState<Broker[]>(brokers);
    const [isInsuranceCompanyDialogOpen, setIsInsuranceCompanyDialogOpen] = useState(false);
    const [isBrokerDialogOpen, setIsBrokerDialogOpen] = useState(false);

    const [insuranceGeneralInformation, setInsuranceGeneralInformation] = React.useState<InsuranceGeneralInformation>({
        uuid: uuidv4(),
        processType: 'New',
        category: 'Vehicle',
        currency: 'HKD',
        premiumAmount: 0,
        policyNumber: '',
        clientId: 0,
        insuranceCompanyId: 0,
        brokerId: 0,
        quotationNumber: '',
        effectiveDate: DateTime.now().toJSDate(),
        expiryDate: DateTime.now().plus({ years: 1 }).toJSDate(),
        updateDate: DateTime.now().toJSDate(),
    });

    const [vehiclePolicyDetailInformation, setVehiclePolicyDetailInformation] = React.useState<VehiclePolicyDetailInformation>({
        coverageType: 'Comprehensive',
        registrationNumber: 'New',
        vehicleType: 'Sedan',
        engineNumber: '',
        chassisNumber: '',
        vehicleBodyType: 'Coupe',
        manufacturer: '',
        modelName: '',
        enginDisplacement: 0,
        totalWeight: 0,
        yearOfManufacture: 1900,
        seatNumber: 0,
        region: 'Hong Kong',
    });

    const {
        control: insuranceGeneralInformationControl,
        handleSubmit: insuranceGeneralInformationHandleSubmit,
        watch: insuranceGeneralInformationWatch,
        formState: { errors: insuranceGeneralInformationErrors },
        trigger: insuranceGeneralInformationTrigger,
        setValue: setInsuranceGeneralInformationValue
    } = useForm<InsuranceGeneralInformation>({
        resolver: zodResolver(insuranceGeneralInformationSchema),
        defaultValues: insuranceGeneralInformation
    });

    const {
        control: vehiclePolicyDetailInformationControl,
        handleSubmit: vehiclePolicyDetailInformationHandleSubmit,
        watch: vehiclePolicyDetailInformationWatch,
        formState: { errors: vehiclePolicyDetailInformationErrors },
        trigger: vehiclePolicyDetailInformationTrigger
    } = useForm<VehiclePolicyDetailInformation>({
        resolver: zodResolver(vehiclePolicyDetailInformationSchema),
        defaultValues: vehiclePolicyDetailInformation
    });

    useEffect(() => {
        setAvailableInsuranceCompanies(insuranceCompanies);
        setAvailableBrokers(brokers);
    }, [insuranceCompanies, brokers]);

    useEffect(() => {
        const subscription = insuranceGeneralInformationWatch((value, { name, type }) => {
            console.log("Insurance general information data changed:", value);
            setInsuranceGeneralInformation(value as InsuranceGeneralInformation); // Update default values with the latest form data
        });
        return () => subscription.unsubscribe();
    }, [insuranceGeneralInformationWatch]);

    useEffect(() => {
        const subscription = vehiclePolicyDetailInformationWatch((value, { name, type }) => {
            console.log("Vehicle policy detail information data changed:", value);
            setVehiclePolicyDetailInformation(value as VehiclePolicyDetailInformation); // Update default values with the latest form data
        });
        return () => subscription.unsubscribe();
    }, [vehiclePolicyDetailInformationWatch]);

    const myTabs: TabItem[] = [
        {
            label: 'General',
            content: <InsurancePolicyGeneralInformationForm
                control={insuranceGeneralInformationControl}
                clients={clients}
                insuranceCompanies={availableInsuranceCompanies}
                brokers={availableBrokers}
                onAddInsuranceCompany={() => setIsInsuranceCompanyDialogOpen(true)}
                onAddBroker={() => setIsBrokerDialogOpen(true)} />
        },
        {
            label: 'Detail',
            content: <VehicleDetailForm
                control={vehiclePolicyDetailInformationControl}
                defaultValues={vehiclePolicyDetailInformation}
                onChange={setVehiclePolicyDetailInformation} />
        },
        // { label: 'Omission', content: <OmissionPage /> },
        // { label: 'Accounting Info', content: <OmissionPage /> },
    ];


    const handleInsuranceCompanyDialogSave = (data: InsuranceCompanyInfo) => {
        const nextCompanyId = availableInsuranceCompanies.length > 0
            ? Math.max(...availableInsuranceCompanies.map((company) => company.id)) + 1
            : 1;

        const newInsuranceCompany: InsuranceCompany = {
            id: data.id ?? nextCompanyId,
            name: data.name,
        } as InsuranceCompany;

        setAvailableInsuranceCompanies((current) => {
            const alreadyExists = current.some((company) => company.id === newInsuranceCompany.id || company.name === newInsuranceCompany.name);
            return alreadyExists ? current : [...current, newInsuranceCompany];
        });
        setInsuranceGeneralInformation((current) => ({ ...current, insuranceCompanyId: newInsuranceCompany.id }));
        setInsuranceGeneralInformationValue('insuranceCompanyId', newInsuranceCompany.id);

        const formData = toFormData({ name: data.name });
        formData.append('intent', 'insurance_company_upsert');
        fetcher.submit(formData, { method: 'post', encType: 'multipart/form-data' });

        setIsInsuranceCompanyDialogOpen(false);
    };

    const handleBrokerDialogSave = (data: BrokerInfo) => {
        const nextBrokerId = availableBrokers.length > 0
            ? Math.max(...availableBrokers.map((broker) => broker.id)) + 1
            : 1;

        const newBroker: Broker = {
            id: data.id ?? nextBrokerId,
            name: data.name,
        } as Broker;

        setAvailableBrokers((current) => {
            const alreadyExists = current.some((broker) => broker.id === newBroker.id || broker.name === newBroker.name);
            return alreadyExists ? current : [...current, newBroker];
        });
        setInsuranceGeneralInformation((current) => ({ ...current, brokerId: newBroker.id }));
        setInsuranceGeneralInformationValue('brokerId', newBroker.id);

        const formData = toFormData({ name: data.name });
        formData.append('intent', 'broker_upsert');
        fetcher.submit(formData, { method: 'post', encType: 'multipart/form-data' });

        setIsBrokerDialogOpen(false);
    };

    return <>

        <Grid sx={{ overflow: "hidden" }}>

            <Stack
                direction='row'
                alignItems="center" // Keeps the text and icon vertically centered
                justifyContent="space-between"
                sx={{ bgcolor: "layer.level2", py: 2, px: 3 }}
            >
                <Typography variant="h5" sx={{ fontWeight: '700' }}>
                    Policy Entry
                </Typography>

                <IconButton sx={{ border: 1 }} onClick={() => {
                    insuranceGeneralInformationTrigger().then((isValid) => {
                        vehiclePolicyDetailInformationTrigger().then((isVehicleInfoValid) => {
                            if (isValid && isVehicleInfoValid) {
                                if (onSave) {
                                    onSave({
                                        insuranceGeneralInformation,
                                        vehiclePolicyDetailInformation
                                    });
                                }
                            } else {
                                console.log("Insurance general information validation failed");
                            }
                        });
                    });
                }}>
                    <SaveIcon />
                </IconButton>

            </Stack>

            <Paper>
                <TabsLayout tabs={myTabs} />
            </Paper>

            <InsuranceCompanyUpsertDialog
                open={isInsuranceCompanyDialogOpen}
                onClose={() => setIsInsuranceCompanyDialogOpen(false)}
                onSave={handleInsuranceCompanyDialogSave}
            />

            <BrokerUpsertDialog
                open={isBrokerDialogOpen}
                onClose={() => setIsBrokerDialogOpen(false)}
                onSave={handleBrokerDialogSave}
            />

        </Grid>
    </>;
};

export default InsurancePolicyForm;