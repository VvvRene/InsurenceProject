import { TabsLayout, type TabItem } from "~/.frontend/components/TabsLayout"; 
import { DetailPage } from "~/.frontend/pages/DetailPage";
import { OmissionPage } from "~/.frontend/pages/OmissionPage";
import { Await, useLoaderData, type LoaderFunction, type LoaderFunctionArgs } from "react-router";
import type { SubmitHandler } from "react-hook-form"; 
import React from "react";
import { LoadingLayout } from "~/.frontend/components/LoadingLayout";
import { Paper } from "@mui/material";
import type { InsuranceGeneralInformation } from "~/.frontend/models/InsuranceGenernalInformation";
import { GeneralPage } from "~/.frontend/pages/GeneralPage";
import { prisma } from "~/.server/db/prisma";
import type { Client } from "~/generated/prisma/browser";
 
export async function loader() {
    const clients = new Promise<Client[]>((resolve) => {
        setTimeout(() => prisma.client.findMany().then((clientData) => resolve(clientData)), 5000);
    });

    // Return the promise inside an object
    return { clients };
}

export default function playground() {
    const { clients } = useLoaderData<typeof loader>();

    const handleInsuranceGeneralInformationSubmit: SubmitHandler<InsuranceGeneralInformation> = (data) => {
        console.log("Form Data:", data);
    };

    return <>
        <React.Suspense fallback={<LoadingLayout />}>
            <Await resolve={clients}>
                {(loadedData) => {
                    const myTabs: TabItem[] = [
                        {
                            label: 'General',
                            content: <GeneralPage 
                                handleDataSubmit={handleInsuranceGeneralInformationSubmit   }
                            />
                        },
                        { label: 'Detail', content: <DetailPage /> },
                        { label: 'Omission', content: <OmissionPage /> },
                        { label: 'Accounting Info', content: <OmissionPage /> },
                        { label: 'Accounting overview', content: <OmissionPage /> },
                        { label: 'Approval', content: <OmissionPage /> },
                        { label: 'Claims', content: <OmissionPage /> },
                        { label: 'Mailing records', content: <OmissionPage /> },
                        { label: 'Contract renewal', content: <OmissionPage /> },
                        { label: 'Client Remarks', content: <OmissionPage /> },
                    ];
                    return <>
                        <Paper>
                            <TabsLayout tabs={myTabs} />
                        </Paper>
                    </>;
                }}
            </Await>
        </React.Suspense>
    </>;
}