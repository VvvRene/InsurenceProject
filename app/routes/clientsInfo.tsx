import type { Route } from "./+types/playground";

import ClientsInfoPage from "~/.frontend/pages/ClientsInfoPage";
import { prisma } from "~/.server/db/prisma";
import { useFetcher, useLoaderData } from "react-router";
import { ClientInfoSchema, type ClientInfo } from "~/.frontend/models/ClientInfo";
import { toFormData } from "~/utils/toFormData";
import { fromFormData } from "~/utils/fromFormData";
import { ne } from "@faker-js/faker";

export async function loader() {
    const clients = await prisma.client.findMany();
    return { clients };
}

export async function action({ request }: Route.ActionArgs) {
    // Handle form submissions or other actions here
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
    const result = ClientInfoSchema.safeParse({
        ...rawData, date: rawData.date ? new Date(rawData.date) : null,
    });  
    if (result.success) {
        await prisma.client.create({
            data: {
                type: result.data.type,
                identity: result.data.identity,
                
                abbr: result.data.abbr,
                name: result.data.name,
                chineseName: result.data.chineseName,
                
                address1: result.data.address1,
                address2: result.data.address2,

                phoneNumber: result.data.phoneNumber,
                email: result.data.email,

                createdAt: new Date(),
                updatedAt: new Date(),

                date: result.data.date ? new Date(result.data.date) : null,
                gender: result.data.gender,

                industry: result.data.industry,
                natureOfWork: result.data.natureOfWork,

                workDescription: result.data.workDescription,
                remark: result.data.remark, 
            }
        });  
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
    const { clients } = useLoaderData<typeof loader>();
    const handleClientUpsert = async (clientInfo: ClientInfo) => {
        const formData = toFormData(clientInfo);
        formData.append("intent", "client_upsert");
        fetcher.submit(formData, { method: "post", encType: "multipart/form-data" });
    }
    return (
        <>
            <ClientsInfoPage clients={clients} onSave={handleClientUpsert} />
        </>
    );
}