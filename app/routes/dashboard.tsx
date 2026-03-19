import { TabsLayout, type TabItem } from "~/.frontend/components/TabsLayout";
import { GeneralPage } from "~/.frontend/pages/GeneralPage";
import { DetailPage } from "~/.frontend/pages/DetailPage";
import { OmissionPage } from "~/.frontend/pages/OmissionPage";
import { Await, useLoaderData, type LoaderFunction, type LoaderFunctionArgs } from "react-router";
import type { SubmitHandler } from "react-hook-form";
import type { InsuranceGenernalInformation } from "~/.frontend/models/InsuranceGenernalInformation";
import React from "react";
import { LoadingLayout } from "~/.frontend/components/LoadingLayout";
import { Paper } from "@mui/material";


const mockInsuranceGenernalInformationData: InsuranceGenernalInformation = {
    policyNumber: 'P178791',
    policySuffix: 'N',
    updateDate: '09/07/2025 11:29:33',
    quoteNumber: '沒有相關報價紀錄',
    policyStatus: '生效中',
    sharedNumber: 'Z2983005',
    policyCode: 'Z2983005',
    policyHolder: 'WONG CHUN HO',
    underwritingCompany: 'V2 - 安盛保險有限公司',
    agentName: 'AG1040 - LAM FUNG LIN (LILIAN)',
    insuredAmountCurrency: 'HKD',
    insuredAmount: '120,000.00',
    onlineNumber: '',
    premiumCurrency: 'HKD',
    policyPremium: '2,577.50',
    remarks: 'TANG WING HO 同事',
    updatedBy: 'jackie',
    nextStep: '已存檔',
    inputDate: '23/04/2025 14:53:0',
    hasCancellationDate: true,
    cancellationDate: '23/04/2025',
    hasSubmissionDate: false,
    submissionDate: '09/03/2026',
    notificationDate: '',
    noticeNumber: '未列印通知書',
    receiptDate: '24/04/2025 11:43:4',
    receiptNumber: 'R122726',
};

export async function loader({ params }: LoaderFunctionArgs) {
    const loadingData = new Promise<InsuranceGenernalInformation>((resolve) => {
        setTimeout(() => {
            resolve(mockInsuranceGenernalInformationData);
        }, 5000);
    });

    // Return the promise inside an object
    return { loadingData };
}

export default function playground() {
    const { loadingData } = useLoaderData<typeof loader>();

    const handleInsuranceGenernalInformationSubmit: SubmitHandler<InsuranceGenernalInformation> = (data) => {
        console.log("Form Data:", data);
    };

    return <>
        <React.Suspense fallback={<LoadingLayout />}>
            <Await resolve={loadingData}>
                {(loadedData) => {
                    const myTabs: TabItem[] = [
                        {
                            label: 'General',
                            content: <GeneralPage
                                data={loadedData}
                                handleDataSubmit={handleInsuranceGenernalInformationSubmit}
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