// app/routes/download.$fileId.ts
import { prisma } from "~/.server/db/prisma";
import { getFileFromR2 } from "~/.server/cloudflareR2";
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

    try {
        const objectKey = fileRecord.path.replace(/^\//, "");
        const fileBuffer = await getFileFromR2(objectKey);
        const responseBody = Buffer.from(fileBuffer);

        return new Response(responseBody, {
            headers: {
                "Content-Type": fileRecord.mimeType || "application/octet-stream",
                "Content-Disposition": `attachment; filename="${fileRecord.name}"`,
                "Content-Length": fileRecord.size.toString(),
            },
        });
    } catch (error) {
        throw new Response("Could not read file from Cloudflare R2", { status: 500 });
    }
}