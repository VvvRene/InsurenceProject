import type { Route } from "./+types/playground"; 

import { TabsLayout, type TabItem } from "~/.frontend/components/TabsLayout";
import { GeneralPage } from "~/.frontend/pages/GeneralPage";
import { DetailPage } from "~/.frontend/pages/DetailPage";
import { OmissionPage } from "~/.frontend/pages/OmissionPage";
import ClientsInfoPage from "~/.frontend/pages/ClientsInfoPage";
import { prisma } from "~/.server/db/prisma";
import { useLoaderData } from "react-router";

export async function loader() { 
    const clients = await prisma.client.findMany();
    return { clients };
}

export async function action({ request }: Route.ActionArgs) { 
    // Handle form submissions or other actions here
    return { success: true };
}

export default function clientsInfo({}: Route.ComponentProps) {  
    const { clients } = useLoaderData<typeof loader>();
    return (
        <>
            <ClientsInfoPage clients={clients} />
        </>
    );
}