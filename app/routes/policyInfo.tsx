import type { Route } from "./+types/playground";

import ClientsInfoPage from "~/.frontend/pages/ClientsInfoPage";
import { prisma } from "~/.server/db/prisma";
import { useFetcher, useLoaderData } from "react-router";
import { ClientInfoSchema, type ClientInfo } from "~/.frontend/models/ClientInfo";
import { toFormData } from "~/utils/toFormData";
import { fromFormData } from "~/utils/fromFormData";
import PolicyInfoPage from "~/.frontend/pages/PolicyInfoPage";
import { insuranceGeneralInformationSchema, type InsuranceGeneralInformation } from "~/.frontend/models/InsuranceGenernalInformation";
import { vehiclePolicyDetailInformationSchema, type VehiclePolicyDetailInformation } from "~/.frontend/models/VehiclePolicyDetailInformation";
import { InsuranceGeneralInformationForm } from "~/.frontend/components/forms/InsuranceGenernalInformationForm";

export async function loader() {
    const clients = await prisma.client.findMany();
    const insuranceCompanies = await prisma.insuranceCompany.findMany();
    const brokers = await prisma.broker.findMany();
    const insurancePolicies = await prisma.insurancePolicy.findMany();
    return { clients, insuranceCompanies, brokers, insurancePolicies };
}

export async function action({ request }: Route.ActionArgs) {
    // Handle form submissions or other actions here
    const formData = await request.formData();
    const intent = formData.get("intent");
    switch (intent) {
        case "policy_upsert":
            return policyCreateAction(formData);
        default:
            throw new Response("Invalid Intent", { status: 400 });
    }
}

async function policyCreateAction(formData: FormData) {

    const rawData = fromFormData(formData);
    console.log("Parsed Client Info:", rawData.insuranceGeneralInformation);
    console.log("Parsed Vehicle Info:", rawData.vehiclePolicyDetailInformation);
    console.log(typeof rawData.insuranceGeneralInformation);
    const insuranceGeneralInformationRaw = JSON.parse(rawData.insuranceGeneralInformation);
    const insuranceGeneralInformation = insuranceGeneralInformationSchema.safeParse({
        ...insuranceGeneralInformationRaw,
        effectiveDate: new Date(insuranceGeneralInformationRaw.effectiveDate),
        expiryDate: new Date(insuranceGeneralInformationRaw.expiryDate),
        updateDate: new Date(insuranceGeneralInformationRaw.updateDate),
    });
    // Validate insurance general information
    const vehiclePolicyDetailInformationRaw = JSON.parse(rawData.vehiclePolicyDetailInformation);
    const vehiclePolicyDetailInformation = vehiclePolicyDetailInformationSchema.safeParse({
        ...vehiclePolicyDetailInformationRaw,
        yearOfManufacture: new Date(vehiclePolicyDetailInformationRaw.yearOfManufacture).getFullYear(), // Assuming yearOfManufacture is a date string, convert it to a year
    }); // Validate vehicle policy detail information   
   
    if (insuranceGeneralInformation.success && vehiclePolicyDetailInformation.success) {

        await prisma.insurancePolicy.create({
            data: {
                uuid: insuranceGeneralInformation.data.uuid,
                processType: insuranceGeneralInformation.data.processType,
                category: insuranceGeneralInformation.data.category,
                policyNumber: insuranceGeneralInformation.data.policyNumber,
                quotationNumber: insuranceGeneralInformation.data.quotationNumber,

                remark: insuranceGeneralInformation.data.remark || '',

                clientId: insuranceGeneralInformation.data.clientId,
                insuranceCompanyId: insuranceGeneralInformation.data.insuranceCompanyId,
                brokerId: insuranceGeneralInformation.data.brokerId,


                effectiveDate: new Date(insuranceGeneralInformation.data.effectiveDate),
                expiryDate: new Date(insuranceGeneralInformation.data.expiryDate),

                premiumAmount: insuranceGeneralInformation.data.premiumAmount,
                currency: insuranceGeneralInformation.data.currency,

                previousPolicyId: insuranceGeneralInformation.data.previousPolicyId,

                vehicleDetail: {
                    create: { 
                        coverageType: vehiclePolicyDetailInformation.data.coverageType,
                        registrationNumber: vehiclePolicyDetailInformation.data.registrationNumber,
                        vehicleType: vehiclePolicyDetailInformation.data.vehicleType,
                        engineNumber: vehiclePolicyDetailInformation.data.engineNumber,
                        chassisNumber: vehiclePolicyDetailInformation.data.chassisNumber,
                        vehicleBodyType: vehiclePolicyDetailInformation.data.vehicleBodyType,
                        manufacturer: vehiclePolicyDetailInformation.data.manufacturer,
                        modelName: vehiclePolicyDetailInformation.data.modelName,
                        enginDisplacement: vehiclePolicyDetailInformation.data.enginDisplacement,
                        totalWeight: vehiclePolicyDetailInformation.data.totalWeight,
                        yearOfManufacture: new Date(vehiclePolicyDetailInformation.data.yearOfManufacture).getFullYear(), // Assuming yearOfManufacture is a date string, convert it to a year
                        seatNumber: vehiclePolicyDetailInformation.data.seatNumber,
                        region: vehiclePolicyDetailInformation.data.region,
                    }
                },

                homeDetail: {},

                lifeDetail: {},

            }
        });

    } else {
        insuranceGeneralInformation.error?.issues.forEach((issue) => {
            console.log(`Data: Insurance General Information Validation Error`);
            console.log(`Field: ${JSON.stringify(issue)}`);
            console.log(`Field: ${issue.path.join(".")}`);
            console.log(`Error: ${issue.message}`);
            console.log(`Code:  ${issue.code}`);
            console.log("------");
        }); 
        vehiclePolicyDetailInformation.error?.issues.forEach((issue) => {
            console.log(`Data: Vehicle Policy Detail Information Validation Error`);
            console.log(`Field: ${JSON.stringify(issue)}`);
            console.log(`Field: ${issue.path.join(".")}`);
            console.log(`Error: ${issue.message}`);
            console.log(`Code:  ${issue.code}`);
            console.log("------");
        });
    } 
}

export default function PolicyInfo({ }: Route.ComponentProps) {
    const fetcher = useFetcher();
    const { clients, insuranceCompanies, brokers, insurancePolicies } = useLoaderData<typeof loader>();
    const handlePolicyUpsert = async (data: { insuranceGeneralInformation: InsuranceGeneralInformation; vehiclePolicyDetailInformation: VehiclePolicyDetailInformation }) => {
        const formData = toFormData(data);
        formData.append("intent", "policy_upsert");
        fetcher.submit(formData, { method: "post", encType: "multipart/form-data" });
    }
    return (
        <>
            <PolicyInfoPage
                clients={clients}
                insuranceCompanies={insuranceCompanies}
                brokers={brokers}
                insurancePolicies={insurancePolicies}
                onSave={handlePolicyUpsert} />
        </>
    );
}