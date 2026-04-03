import type { Route } from "./+types/playground";

import InsurancePolicyForm from "~/.frontend/components/forms/InsurancePolicyForm";


import { prisma } from '~/.server/db/prisma';
import { useLoaderData } from "react-router";
import PolicyInfoPage from "~/.frontend/pages/PolicyInfoPage";

export async function loader() {
    const clients = await prisma.client.findMany();
    const insuranceCompanies = await prisma.insuranceCompany.findMany();
    const brokers = await prisma.broker.findMany();

    return { clients, insuranceCompanies, brokers };
}


export default function playground({ }: Route.ComponentProps) {

    const { clients, insuranceCompanies, brokers } = useLoaderData<typeof loader>();

    return (
        <>
        <PolicyInfoPage 
        clients={clients} 
        insuranceCompanies={insuranceCompanies} 
        brokers={brokers}
        insurancePolicies={[]}
        onSave={(c)=>{}} /> 
        </>
    );
}