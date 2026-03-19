// app/routes/download.$fileId.ts
import { readFile } from "node:fs/promises";
import path from "node:path";
import { prisma } from "~/.server/db/prisma";
import type { Route } from "./+types/clientFileDownload.$fileId";

export async function loader({ params }: Route.LoaderArgs) {
    const fileId = Number(params.fileId);
    
    // 1. Find the file in the DB
    const fileRecord = await prisma.clientFile.findUnique({ 
        where: { id: fileId } 
    });

    if (!fileRecord) {
        throw new Response("File Not Found", { status: 404 });
    }

    // 2. Resolve the absolute path
    // Ensure this matches where you saved it in your upload action
    const absolutePath = path.resolve(process.cwd(), "public", fileRecord.path.replace(/^\//, ""));

    try {
        const fileBuffer = await readFile(absolutePath);

        // 3. Return the file with headers that force a download
        return new Response(fileBuffer, {
            headers: {
                "Content-Type": fileRecord.mimeType || "application/octet-stream",
                "Content-Disposition": `attachment; filename="${fileRecord.name}"`,
                "Content-Length": fileRecord.size.toString(),
            },
        });
    } catch (error) {
        throw new Response("Could not read file from disk", { status: 500 });
    }
}