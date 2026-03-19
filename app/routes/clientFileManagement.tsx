import FilesPage from "~/.frontend/pages/FilesPage";
import type { Route } from "./+types/clientFileManagement";
import { writeFile, mkdir, unlink } from "node:fs/promises";
import path from "node:path";

import { useLoaderData, useFetcher } from "react-router";
import type { ClientFileInformation } from "~/.frontend/models/ClientFileInformation";
import type { Client } from "~/generated/prisma/client";
import { prisma } from '~/.server/db/prisma';

export async function loader() {
    const clients = await prisma.client.findMany();
    const clientFiles = await prisma.clientFile.findMany();
    return { clients, clientFiles };
}

export async function action({ request }: Route.ActionArgs) { 
    const formData = await request.formData();
    const intent = formData.get("intent");
    switch (intent) {
        case "upload":
            return fileUploadAction(formData);

        case "delete":
            return fileHandleDelete(formData);
 
        default:
            throw new Response("Invalid Intent", { status: 400 });
    }
    return { success: true };
}

async function fileUploadAction(formData: FormData) { 
    
    const file = formData.get("file") as File;
    const clientId = Number(formData.get("clientId"));

    if (!file || !clientId) return { error: "Missing data" };

    const client = await prisma.client.findUnique({ where: { id: clientId } });
    if (!client) return { error: "Client not found" };

    // Generate filename and path
    const fileName = `client_${client.id}_${client.lastName.replace(/\s+/g, '_')}_${client.firstName.replace(/\s+/g, '_')}_${Date.now()}${path.extname(file.name)}`; 
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    const filePath = path.join(uploadDir, fileName);

    // Ensure directory exists, then save
    await mkdir(uploadDir, { recursive: true });
    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(filePath, buffer);

    // Save to Database
    await prisma.clientFile.create({
        data: {
            name: file.name,
            path: `/uploads/${fileName}`, // Public URL path
            description: formData.get("description") as string || "",
            size: file.size,
            mimeType: file.type,
            clientId: client.id
        }
    });
}

async function fileHandleDelete(formData: FormData) {
    const fileId = Number(formData.get("fileId"));
    if (!fileId) return { error: "Missing file ID" };

    const fileRecord = await prisma.clientFile.findUnique({ where: { id: fileId } });
    if (!fileRecord) return { error: "File not found" };

    // Delete from filesystem
    const filePath = path.join(process.cwd(), "public", fileRecord.path); 
    await unlink(filePath);

    // Delete from database
    await prisma.clientFile.delete({ where: { id: fileId } });
}

export default function fileManagement({ }: Route.ComponentProps) {
    const fetcher = useFetcher();
    const { clients, clientFiles } = useLoaderData<typeof loader>();

    const handleFileUploadData = async (data: ClientFileInformation) => {
        const formData = new FormData();
        formData.append("intent", "upload");
        formData.append("file", data.file); // The actual file object
        formData.append("clientId", data.client.id.toString());
        formData.append("description", data.description || "");
        // This sends the data to the 'action' function above
        fetcher.submit(formData, { method: "post", encType: "multipart/form-data" });
    }
 
    const handleFileDelete = (fileId: number) => {
        console.log("Deleting file with ID:", fileId);
        const formData = new FormData();
        formData.append("intent", "delete");
        formData.append("fileId", fileId.toString());
        fetcher.submit(formData, { method: "post" });
    }

    return (
        <FilesPage
            clients={clients}
            clientFiles={clientFiles}
            onFileUpload={handleFileUploadData} 
            onFileDelete={handleFileDelete}
        />
    );
}