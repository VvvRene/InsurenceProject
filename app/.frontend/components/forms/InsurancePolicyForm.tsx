import React from 'react';
import {
    Box, Grid, TextField, MenuItem, Typography, Button,
    Paper, Divider, InputAdornment,
    IconButton
} from '@mui/material';
 
import { DateTime } from 'luxon';
import type { Broker, Client, InsuranceCompany } from '~/generated/prisma/browser';
import { TabsLayout, type TabItem } from '../TabsLayout';
import InsurancePolicyGeneralInformationForm from './insurance_policy/GeneranlInforamtionForm';
import { OmissionPage } from '~/.frontend/pages/OmissionPage';
import VehicleDetailForm from './insurance_policy/VehicleDetailForm';
import { insuranceGeneralInformationSchema, type InsuranceGeneralInformation } from '~/.frontend/models/InsuranceGenernalInformation';
import type { VehiclePolicyDetailInformation } from '~/.frontend/models/VehiclePolicyDetailInformation';
import { v4 as uuidv4 } from 'uuid';


interface InsurancePolicyFormProps {
    clients: Client[]; // Assuming you have a list of clients to select from
    insuranceCompanies: InsuranceCompany[]; // Assuming insurance companies are also clients, adjust as needed
    brokers: Broker[]; // Add broker type if needed
}

const InsurancePolicyForm: React.FC<InsurancePolicyFormProps> = ({ clients, insuranceCompanies, brokers }) => {

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

    function onValueChange(data: InsuranceGeneralInformation) {
        console.log("Form data changed:", data);
        setInsuranceGeneralInformation(data); // Update default values with the latest form data
    }

    const myTabs: TabItem[] = [
        {
            label: 'General',
            content: <InsurancePolicyGeneralInformationForm
                defaultValues={insuranceGeneralInformation}
                clients={clients}
                insuranceCompanies={insuranceCompanies}
                brokers={brokers}
                onChange={onValueChange} />
        },
        {
            label: 'Detail',
            content: <VehicleDetailForm
                defaultValues={vehiclePolicyDetailInformation}
                onChange={setVehiclePolicyDetailInformation} />
        },
        { label: 'Omission', content: <OmissionPage /> },
        { label: 'Accounting Info', content: <OmissionPage /> },
    ];


    return <>
        <Paper>
            <TabsLayout tabs={myTabs} />
        </Paper>
    </>;
};

export default InsurancePolicyForm;