import React, { useEffect, useState } from 'react';
import {
    Grid, Typography,
    Paper, 
    IconButton,
    Stack
} from '@mui/material';

import { DateTime } from 'luxon';
import { useTranslation } from 'react-i18next';
import type { Broker, Client, InsuranceCompany } from '~/generated/prisma/browser';
import { TabsLayout, type TabItem } from '../TabsLayout';
import InsurancePolicyGeneralInformationForm from './insurance_policy/GeneranlInforamtionForm';
import VehicleDetailForm from './insurance_policy/VehicleDetailForm';
import { insuranceGeneralInformationSchema, type InsuranceGeneralInformation } from '~/.frontend/models/InsuranceGenernalInformation';
import { vehiclePolicyDetailInformationSchema, type VehiclePolicyDetailInformation } from '~/.frontend/models/VehiclePolicyDetailInformation';
import SaveIcon from '@mui/icons-material/Save';
import { v4 as uuidv4 } from 'uuid';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFetcher } from 'react-router';
import InsuranceCompanyUpsertDialog from '../dialogs/InsuranceCompanyUpsertDialog';
import BrokerUpsertDialog from '../dialogs/BrokerUpsertDialog';
import ClientUpsertDialog from '../dialogs/ClientUpsertDialog';
import OptionUpsertDialog from '../dialogs/OptionUpsertDialog';
import type { InsuranceCompanyInfo } from '~/.frontend/models/InsuranceCompanyInfo';
import type { BrokerInfo } from '~/.frontend/models/BrokerInfo';
import type { ClientInfo } from '~/.frontend/models/ClientInfo';
import type { VehicleOptionInfo } from '~/.frontend/models/VehicleOptionInfo';
import { toFormData } from '~/utils/toFormData';


interface InsurancePolicyFormProps {
    clients: Client[]; // Assuming you have a list of clients to select from
    insuranceCompanies: InsuranceCompany[]; // Assuming insurance companies are also clients, adjust as needed
    brokers: Broker[]; // Add broker type if needed
    vehicleTypes: VehicleOptionInfo[];
    vehicleBodyTypes: VehicleOptionInfo[];
    initialGeneralInfo?: InsuranceGeneralInformation;
    initialVehicleDetail?: VehiclePolicyDetailInformation;
    onSave?: (data: { insuranceGeneralInformation: InsuranceGeneralInformation; vehiclePolicyDetailInformation: VehiclePolicyDetailInformation }) => void; // Optional onSave callback
}

const InsurancePolicyForm: React.FC<InsurancePolicyFormProps> = ({ clients, insuranceCompanies, brokers, vehicleTypes, vehicleBodyTypes, initialGeneralInfo, initialVehicleDetail, onSave }) => {
    const { t } = useTranslation();
    const fetcher = useFetcher();

    const [availableInsuranceCompanies, setAvailableInsuranceCompanies] = useState<InsuranceCompany[]>(insuranceCompanies);
    const [availableBrokers, setAvailableBrokers] = useState<Broker[]>(brokers);
    const [availableClients, setAvailableClients] = useState<Client[]>(clients);
    const [isInsuranceCompanyDialogOpen, setIsInsuranceCompanyDialogOpen] = useState(false);
    const [isBrokerDialogOpen, setIsBrokerDialogOpen] = useState(false);
    const [isClientDialogOpen, setIsClientDialogOpen] = useState(false);
    const [isVehicleTypeDialogOpen, setIsVehicleTypeDialogOpen] = useState(false);
    const [isVehicleBodyTypeDialogOpen, setIsVehicleBodyTypeDialogOpen] = useState(false);
    const [availableVehicleTypes, setAvailableVehicleTypes] = useState<VehicleOptionInfo[]>(vehicleTypes);
    const [availableVehicleBodyTypes, setAvailableVehicleBodyTypes] = useState<VehicleOptionInfo[]>(vehicleBodyTypes);

    const [insuranceGeneralInformation, setInsuranceGeneralInformation] = React.useState<InsuranceGeneralInformation>(() => {
        if (initialGeneralInfo) return initialGeneralInfo;
        return {
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
            expiryDate: DateTime.now().plus({years:1}).minus({days:1}).toJSDate(),
            updateDate: DateTime.now().toJSDate(),
        };
    });

    const [vehiclePolicyDetailInformation, setVehiclePolicyDetailInformation] = React.useState<VehiclePolicyDetailInformation>(() => {
        if (initialVehicleDetail) return initialVehicleDetail;
        return {
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
            gp: 0,
            an: 0,
            san: 0,
        };
    });

    const {
        control: insuranceGeneralInformationControl,
        handleSubmit: insuranceGeneralInformationHandleSubmit,
        watch: insuranceGeneralInformationWatch,
        formState: { errors: insuranceGeneralInformationErrors },
        trigger: insuranceGeneralInformationTrigger,
        setValue: setInsuranceGeneralInformationValue,
        getValues: getInsuranceGeneralInformationValues
    } = useForm<InsuranceGeneralInformation>({
        resolver: zodResolver(insuranceGeneralInformationSchema),
        defaultValues: insuranceGeneralInformation
    });

    const {
        control: vehiclePolicyDetailInformationControl,
        handleSubmit: vehiclePolicyDetailInformationHandleSubmit,
        watch: vehiclePolicyDetailInformationWatch,
        formState: { errors: vehiclePolicyDetailInformationErrors },
        trigger: vehiclePolicyDetailInformationTrigger,
        getValues: getVehiclePolicyDetailInformationValues
    } = useForm<VehiclePolicyDetailInformation>({
        resolver: zodResolver(vehiclePolicyDetailInformationSchema),
        defaultValues: vehiclePolicyDetailInformation
    });

    useEffect(() => {
        setAvailableInsuranceCompanies(insuranceCompanies);
        setAvailableBrokers(brokers);
        setAvailableClients(clients);
    }, [insuranceCompanies, brokers, clients]);

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
            label: t('policy.general'),
            content: <InsurancePolicyGeneralInformationForm
                control={insuranceGeneralInformationControl}
                clients={availableClients}
                insuranceCompanies={availableInsuranceCompanies}
                brokers={availableBrokers}
                onAddInsuranceCompany={() => setIsInsuranceCompanyDialogOpen(true)}
                onAddBroker={() => setIsBrokerDialogOpen(true)}
                onAddClient={() => setIsClientDialogOpen(true)} />
        },
        {
            label: t('policy.detail'),
            content: <VehicleDetailForm
                control={vehiclePolicyDetailInformationControl}
                defaultValues={vehiclePolicyDetailInformation}
                onChange={setVehiclePolicyDetailInformation}
                vehicleTypes={availableVehicleTypes}
                vehicleBodyTypes={availableVehicleBodyTypes}
                onAddVehicleType={() => setIsVehicleTypeDialogOpen(true)}
                onAddVehicleBodyType={() => setIsVehicleBodyTypeDialogOpen(true)} />
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

    const handleVehicleTypeDialogSave = (data: VehicleOptionInfo) => {
        const newOption: VehicleOptionInfo = {
            id: data.id,
            name: data.name,
        };

        setAvailableVehicleTypes((current) => {
            const alreadyExists = current.some((vt) => vt.name === newOption.name);
            return alreadyExists ? current : [...current, newOption];
        });
        setVehiclePolicyDetailInformation((current) => ({ ...current, vehicleType: newOption.name }));

        const formData = toFormData({ name: data.name });
        formData.append('intent', 'vehicle_type_upsert');
        fetcher.submit(formData, { method: 'post', encType: 'multipart/form-data' });

        setIsVehicleTypeDialogOpen(false);
    };

    const handleVehicleBodyTypeDialogSave = (data: VehicleOptionInfo) => {
        const newOption: VehicleOptionInfo = {
            id: data.id,
            name: data.name,
        };

        setAvailableVehicleBodyTypes((current) => {
            const alreadyExists = current.some((vt) => vt.name === newOption.name);
            return alreadyExists ? current : [...current, newOption];
        });
        setVehiclePolicyDetailInformation((current) => ({ ...current, vehicleBodyType: newOption.name }));

        const formData = toFormData({ name: data.name });
        formData.append('intent', 'vehicle_body_type_upsert');
        fetcher.submit(formData, { method: 'post', encType: 'multipart/form-data' });

        setIsVehicleBodyTypeDialogOpen(false);
    };

    const handleClientDialogSave = (data: ClientInfo) => {
        const nextClientId = availableClients.length > 0
            ? Math.max(...availableClients.map((client) => client.id)) + 1
            : 1;

        const newClient: Client = {
            id: data.id ?? nextClientId,
            name: data.name,
            chineseName: data.chineseName,
        } as Client;

        setAvailableClients((current) => {
            const alreadyExists = current.some((client) => client.id === newClient.id || client.name === newClient.name);
            return alreadyExists ? current : [...current, newClient];
        });
        setInsuranceGeneralInformation((current) => ({ ...current, clientId: newClient.id }));
        setInsuranceGeneralInformationValue('clientId', newClient.id);

        const formData = toFormData({
            ...data,
            date: data.date ? new Date(data.date).toISOString() : null,
        });
        formData.append('intent', 'client_upsert');
        fetcher.submit(formData, { method: 'post', encType: 'multipart/form-data' });

        setIsClientDialogOpen(false);
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
                    {t('policy.policyEntry')}
                </Typography>

                <IconButton sx={{ border: 1 }} onClick={() => {
                    insuranceGeneralInformationTrigger().then((isValid) => {
                        vehiclePolicyDetailInformationTrigger().then((isVehicleInfoValid) => {
                            if (isValid && isVehicleInfoValid) {
                                if (onSave) {
                                    const latestInsuranceGeneralInformation = getInsuranceGeneralInformationValues() as InsuranceGeneralInformation;
                                    const latestVehiclePolicyDetailInformation = getVehiclePolicyDetailInformationValues() as VehiclePolicyDetailInformation;

                                    setInsuranceGeneralInformation(latestInsuranceGeneralInformation);
                                    setVehiclePolicyDetailInformation(latestVehiclePolicyDetailInformation);

                                    // When creating a new policy (no initialGeneralInfo), generate fresh UUID.
                                    // When editing, keep the existing UUID so the DB update matches.
                                    const effectiveUuid = initialGeneralInfo ? latestInsuranceGeneralInformation.uuid : uuidv4();
                                    onSave({
                                        insuranceGeneralInformation: { ...latestInsuranceGeneralInformation, uuid: effectiveUuid },
                                        vehiclePolicyDetailInformation: latestVehiclePolicyDetailInformation
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

            <ClientUpsertDialog
                open={isClientDialogOpen}
                onClose={() => setIsClientDialogOpen(false)}
                onSave={handleClientDialogSave}
            />

            <OptionUpsertDialog
                open={isVehicleTypeDialogOpen}
                labelKey="policy.addVehicleType"
                onClose={() => setIsVehicleTypeDialogOpen(false)}
                onSave={handleVehicleTypeDialogSave}
            />

            <OptionUpsertDialog
                open={isVehicleBodyTypeDialogOpen}
                labelKey="policy.addVehicleBodyType"
                onClose={() => setIsVehicleBodyTypeDialogOpen(false)}
                onSave={handleVehicleBodyTypeDialogSave}
            />

        </Grid>
    </>;
};

export default InsurancePolicyForm;