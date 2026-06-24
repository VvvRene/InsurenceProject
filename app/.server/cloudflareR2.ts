import { Readable } from "node:stream";
import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";

const {
  CLOUDFLARE_R2_ENDPOINT,
  CLOUDFLARE_R2_ACCESS_KEY_ID,
  CLOUDFLARE_R2_SECRET_ACCESS_KEY,
  CLOUDFLARE_R2_BUCKET,
} = process.env;

if (!CLOUDFLARE_R2_ENDPOINT || !CLOUDFLARE_R2_ACCESS_KEY_ID || !CLOUDFLARE_R2_SECRET_ACCESS_KEY || !CLOUDFLARE_R2_BUCKET) {
  throw new Error("Missing Cloudflare R2 environment variables. Please set CLOUDFLARE_R2_ENDPOINT, CLOUDFLARE_R2_BUCKET, CLOUDFLARE_R2_ACCESS_KEY_ID, and CLOUDFLARE_R2_SECRET_ACCESS_KEY.");
}

const s3 = new S3Client({
  endpoint: CLOUDFLARE_R2_ENDPOINT,
  region: "auto",
  credentials: {
    accessKeyId: CLOUDFLARE_R2_ACCESS_KEY_ID,
    secretAccessKey: CLOUDFLARE_R2_SECRET_ACCESS_KEY,
  },
});

export async function uploadFileToR2(file: File, key: string) {
  const body = Buffer.from(await file.arrayBuffer());

  await s3.send(
    new PutObjectCommand({
      Bucket: CLOUDFLARE_R2_BUCKET,
      Key: key,
      Body: body,
      ContentType: file.type || "application/octet-stream",
      ContentLength: file.size,
    }),
  );
}

const streamToArrayBuffer = async (body: unknown): Promise<ArrayBuffer> => {
  if (body instanceof Uint8Array) {
    return Buffer.from(body).buffer;
  }

  if (typeof (body as any)?.arrayBuffer === "function") {
    return await (body as any).arrayBuffer();
  }

  if (body instanceof Readable) {
    const chunks: Buffer[] = [];
    for await (const chunk of body) {
      chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
    }
    const result = Buffer.concat(chunks);
    return result.buffer.slice(result.byteOffset, result.byteOffset + result.byteLength);
  }

  if (typeof (body as any)?.getReader === "function") {
    const reader = (body as any).getReader();
    const chunks: Uint8Array[] = [];
    let done = false;
    while (!done) {
      const { value, done: finished } = await reader.read();
      if (value) chunks.push(value);
      done = finished;
    }
    const result = Buffer.concat(chunks as Buffer[]);
    return result.buffer.slice(result.byteOffset, result.byteOffset + result.byteLength);
  }

  throw new Error("Unsupported R2 response body type");
};

export async function getFileFromR2(key: string) {
  const result = await s3.send(
    new GetObjectCommand({
      Bucket: CLOUDFLARE_R2_BUCKET,
      Key: key,
    }),
  );

  if (!result.Body) {
    throw new Error("R2 file object missing body");
  }

  return streamToArrayBuffer(result.Body);
}

export async function deleteFileFromR2(key: string) {
  await s3.send(
    new DeleteObjectCommand({
      Bucket: CLOUDFLARE_R2_BUCKET,
      Key: key,
    }),
  );
}
