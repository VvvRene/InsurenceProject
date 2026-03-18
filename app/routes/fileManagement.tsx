import FilesPage from "~/.frontend/pages/FilesPage";
import type { Route } from "./+types/fileManagement"; 
 

import { useLoaderData, useActionData } from "react-router";
import { prisma } from '~/.server/db/prisma';
import { useState } from "react"; 
import type { ClientFileInformation } from "~/.frontend/models/ClientFileInformation";

export async function loader() {
    const clients = await prisma.client.findMany();
    return { clients };
} 

export default function fileManagement({ }: Route.ComponentProps) { 
    const { clients } = useLoaderData<typeof loader>(); 
    const handleFileUploadData = ( data: ClientFileInformation) => { 
        // Here you would typically send the file data to your server or API
        console.log('File uploaded:', data);
    }
    return (
        <>
           <FilesPage clients={clients} onFileUpload={handleFileUploadData} />
        </>
    );
}