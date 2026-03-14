import type { Route } from "../+types/root";

import { TabsLayout, type TabItem } from "~/components/TabsLayout";
import { GeneralPage } from "~/pages/GeneralPage";
import { DetailPage } from "~/pages/DetailPage";
import { OmissionPage } from "~/pages/OmissionPage";

export default function playground({ }: Route.ComponentProps) {
    const myTabs: TabItem[] = [
        { label: 'General', content: <GeneralPage /> },
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
    return (
        <TabsLayout tabs={myTabs} />
    );
}