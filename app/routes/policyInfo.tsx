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
import { InsuranceCompanyInfoSchema, type InsuranceCompanyInfo } from "~/.frontend/models/InsuranceCompanyInfo";
import { BrokerInfoSchema, type BrokerInfo } from "~/.frontend/models/BrokerInfo";

export async function loader() {
    const clients = await prisma.client.findMany();
    const insuranceCompanies = await prisma.insuranceCompany.findMany();
    const brokers = await prisma.broker.findMany();
    const insurancePolicies = await prisma.insurancePolicy.findMany({
        include: {
            vehicleDetail: true,
            homeDetail: true,
            lifeDetail: true,
        },
        orderBy: { updatedAt: 'desc' },
    });
    const vehicleTypes = await prisma.vehicleType.findMany();
    const vehicleBodyTypes = await prisma.vehicleBodyType.findMany();
    return { clients, insuranceCompanies, brokers, insurancePolicies, vehicleTypes, vehicleBodyTypes };
}

export async function action({ request }: Route.ActionArgs) {
    // Handle form submissions or other actions here
    const formData = await request.formData();
    const intent = formData.get("intent");
    switch (intent) {
        case "policy_upsert":
            return policyUpsertAction(formData);
        case "insurance_company_upsert":
            return insuranceCompanyUpsertAction(formData);
        case "broker_upsert":
            return brokerUpsertAction(formData);
        case "vehicle_type_upsert":
            return vehicleTypeUpsertAction(formData);
        case "vehicle_body_type_upsert":
            return vehicleBodyTypeUpsertAction(formData);
        default:
            throw new Response("Invalid Intent", { status: 400 });
    }
}

async function insuranceCompanyUpsertAction(formData: FormData) {
    const rawData = fromFormData(formData);
    const parsedId = rawData.id !== undefined && rawData.id !== '' ? Number(rawData.id) : undefined;
    const result = InsuranceCompanyInfoSchema.safeParse({ ...rawData, id: parsedId });

    if (result.success) {
        const insuranceCompanyData = {
            name: result.data.name,
        };

        if (result.data.id) {
            const existingCompany = await prisma.insuranceCompany.findUnique({
                where: { id: result.data.id },
            });

            if (existingCompany) {
                await prisma.insuranceCompany.update({
                    where: { id: result.data.id },
                    data: insuranceCompanyData,
                });
            } else {
                await prisma.insuranceCompany.create({ data: insuranceCompanyData });
            }
        } else {
            await prisma.insuranceCompany.create({ data: insuranceCompanyData });
        }
    } else {
        result.error.issues.forEach((issue) => {
            console.log(`Field: ${issue.path.join(".")}`);
            console.log(`Error: ${issue.message}`);
        });
    }
}

async function brokerUpsertAction(formData: FormData) {
    const rawData = fromFormData(formData);
    const parsedId = rawData.id !== undefined && rawData.id !== '' ? Number(rawData.id) : undefined;
    const result = BrokerInfoSchema.safeParse({ ...rawData, id: parsedId });

    if (result.success) {
        const brokerData = { name: result.data.name };

        if (result.data.id) {
            const existingBroker = await prisma.broker.findUnique({
                where: { id: result.data.id },
            });

            if (existingBroker) {
                await prisma.broker.update({
                    where: { id: result.data.id },
                    data: brokerData,
                });
            } else {
                await prisma.broker.create({ data: brokerData });
            }
        } else {
            await prisma.broker.create({ data: brokerData });
        }
    } else {
        result.error.issues.forEach((issue) => {
            console.log(`Field: ${issue.path.join(".")}`);
            console.log(`Error: ${issue.message}`);
        });
    }
}

async function vehicleTypeUpsertAction(formData: FormData) {
    const rawData = fromFormData(formData);
    const name = rawData.name as string;
    if (name && name.trim()) {
        const existing = await prisma.vehicleType.findUnique({ where: { name: name.trim() } });
        if (!existing) {
            await prisma.vehicleType.create({ data: { name: name.trim() } });
        }
    }
}

async function vehicleBodyTypeUpsertAction(formData: FormData) {
    const rawData = fromFormData(formData);
    const name = rawData.name as string;
    if (name && name.trim()) {
        const existing = await prisma.vehicleBodyType.findUnique({ where: { name: name.trim() } });
        if (!existing) {
            await prisma.vehicleBodyType.create({ data: { name: name.trim() } });
        }
    }
}

async function policyUpsertAction(formData: FormData) {

    const rawData = fromFormData(formData);
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
        totalWeight: vehiclePolicyDetailInformationRaw.totalWeight ?? 0,
        yearOfManufacture: vehiclePolicyDetailInformationRaw.yearOfManufacture == null || vehiclePolicyDetailInformationRaw.yearOfManufacture === ''
            ? new Date().getFullYear()
            : Number(vehiclePolicyDetailInformationRaw.yearOfManufacture),
    }); // Validate vehicle policy detail information   
   
    if (insuranceGeneralInformation.success && vehiclePolicyDetailInformation.success) {
        const { uuid, processType, category, policyNumber, quotationNumber, remark, clientId, insuranceCompanyId, brokerId, effectiveDate, expiryDate, premiumAmount, currency, previousPolicyId } = insuranceGeneralInformation.data;
        const { coverageType, registrationNumber, vehicleType, engineNumber, chassisNumber, vehicleBodyType, manufacturer, modelName, enginDisplacement, totalWeight, yearOfManufacture, seatNumber, region, moneyLenderLicenceNumber } = vehiclePolicyDetailInformation.data;

        const insurancePolicyData = {
            processType,
            category,
            policyNumber,
            quotationNumber,
            remark: remark || '',
            clientId,
            insuranceCompanyId,
            brokerId,
            effectiveDate: new Date(effectiveDate),
            expiryDate: new Date(expiryDate),
            premiumAmount,
            currency,
            previousPolicyId,
        };

        const vehicleDetailData = {
            coverageType,
            registrationNumber,
            vehicleType,
            engineNumber,
            chassisNumber,
            vehicleBodyType,
            manufacturer,
            modelName,
            enginDisplacement,
            totalWeight,
            yearOfManufacture,
            seatNumber,
            region,
        };

        const existingPolicy = await prisma.insurancePolicy.findUnique({
            where: { uuid },
            include: { vehicleDetail: true },
        });

        if (existingPolicy) {
            // UPDATE existing policy
            await prisma.insurancePolicy.update({
                where: { uuid },
                data: insurancePolicyData,
            });
            if (existingPolicy.vehicleDetail) {
                await prisma.vehiclePolicyDetail.update({
                    where: { id: existingPolicy.vehicleDetail.id },
                    data: vehicleDetailData,
                });
            } else {
                await prisma.vehiclePolicyDetail.create({
                    data: { ...vehicleDetailData, policyId: existingPolicy.id },
                });
            }
        } else {
            // CREATE new policy
            await prisma.insurancePolicy.create({
                data: {
                    uuid,
                    ...insurancePolicyData,
                    vehicleDetail: {
                        create: vehicleDetailData,
                    },
                    homeDetail: {},
                    lifeDetail: {},
                },
            });
        }
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
    const { clients, insuranceCompanies, brokers, insurancePolicies, vehicleTypes, vehicleBodyTypes } = useLoaderData<typeof loader>();
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
                vehicleTypes={vehicleTypes}
                vehicleBodyTypes={vehicleBodyTypes}
                onSave={handlePolicyUpsert} />
        </>
    );
}
