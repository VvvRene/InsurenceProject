import type { Route } from "./+types/playground"; 

import { TabsLayout, type TabItem } from "~/.frontend/components/TabsLayout";
import { GeneralPage } from "~/.frontend/pages/GeneralPage";
import { DetailPage } from "~/.frontend/pages/DetailPage";
import { OmissionPage } from "~/.frontend/pages/OmissionPage"; 
import ClientInformationForm from "~/.frontend/components/forms/ClientInformationForm";

export default function playground({ }: Route.ComponentProps) { 
    return (
        <>
        <ClientInformationForm></ClientInformationForm>
        </>
    );
}