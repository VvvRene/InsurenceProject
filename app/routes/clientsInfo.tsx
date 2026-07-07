import type { Route } from "./+types/playground";

import ClientsInfoPage from "~/.frontend/pages/ClientsInfoPage";
import { prisma } from "~/.server/db/prisma";
import { useFetcher, useLoaderData } from "react-router";
import { ClientInfoSchema, type ClientInfo } from "~/.frontend/models/ClientInfo";
import { toFormData } from "~/utils/toFormData";
import { fromFormData } from "~/utils/fromFormData";

export async function loader() {
    const clients = await prisma.client.findMany({
        include: { broker: true, subagent: true },
    });
    const brokers = await prisma.broker.findMany({ orderBy: { name: 'asc' } });
    const subagents = await prisma.subagent.findMany({ orderBy: { name: 'asc' } });
    return { clients, brokers, subagents };
}

export async function action({ request }: Route.ActionArgs) {
    const formData = await request.formData();
    const intent = formData.get("intent");
    switch (intent) {
        case "client_upsert":
            return clientCreateAction(formData);
        default:
            throw new Response("Invalid Intent", { status: 400 });
    }
}

async function clientCreateAction(formData: FormData) {
    const rawData = fromFormData(formData);
    const parsedId = rawData.id ? Number(rawData.id) : undefined;
    const result = ClientInfoSchema.safeParse({
        ...rawData,
        id: parsedId,
        date: rawData.date ? new Date(rawData.date) : null,
        brokerId: rawData.brokerId ? Number(rawData.brokerId) : null,
        subagentId: rawData.subagentId ? Number(rawData.subagentId) : null,
    });  
    if (result.success) {
        const clientData = {
            type: result.data.type,
            identity: result.data.identity,
            
            abbr: result.data.abbr,
            name: result.data.name,
            chineseName: result.data.chineseName,
            
            address1: result.data.address1,
            address2: result.data.address2,

            phoneNumber: result.data.phoneNumber,
            email: result.data.email,

            date: result.data.date ? new Date(result.data.date) : null,
            gender: result.data.gender,

            industry: result.data.industry,
            natureOfWork: result.data.natureOfWork,
            remark: result.data.remark, 
            brokerId: result.data.brokerId ?? null,
            subagentId: result.data.subagentId ?? null,
        };

        if (result.data.id) {
            await prisma.client.update({
                where: { id: result.data.id },
                data: {
                    ...clientData,
                    updatedAt: new Date(),
                },
            });
        } else {
            await prisma.client.create({
                data: {
                    ...clientData,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                }
            });
        }
    } else {
        result.error.issues.forEach((issue) => {
            console.log(`Field: ${issue.path.join(".")}`);
            console.log(`Error: ${issue.message}`);
            console.log(`Code:  ${issue.code}`);
            console.log("------");
        });
    }
}

export default function clientsInfo({ }: Route.ComponentProps) {
    const fetcher = useFetcher();
    const { clients, brokers, subagents } = useLoaderData<typeof loader>();
    const handleClientUpsert = async (clientInfo: ClientInfo) => {
        const formData = toFormData(clientInfo);
        formData.append("intent", "client_upsert");
        fetcher.submit(formData, { method: "post", encType: "multipart/form-data" });
    }
    return (
        <>
            <ClientsInfoPage clients={clients} brokers={brokers} subagents={subagents} onSave={handleClientUpsert} />
        </>
    );
}