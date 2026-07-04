import type { Route } from "./+types/vehicleInfo";
import { useFetcher, useLoaderData } from "react-router";
import VehicleInfoPage from "~/.frontend/pages/VehicleInfoPage";
import { prisma } from "~/.server/db/prisma";
import { toFormData } from "~/utils/toFormData";
import { fromFormData } from "~/utils/fromFormData";
import type { VehicleOptionInfo } from "~/.frontend/models/VehicleOptionInfo";

export async function loader() {
  const vehicleTypes = await prisma.vehicleType.findMany({ orderBy: { name: 'asc' } });
  const vehicleBodyTypes = await prisma.vehicleBodyType.findMany({ orderBy: { name: 'asc' } });
  return { vehicleTypes, vehicleBodyTypes };
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const intent = formData.get("intent");

  switch (intent) {
    case "vehicle_type_upsert":
      return vehicleTypeUpsertAction(formData);
    case "vehicle_body_type_upsert":
      return vehicleBodyTypeUpsertAction(formData);
    default:
      throw new Response("Invalid Intent", { status: 400 });
  }
}

async function vehicleTypeUpsertAction(formData: FormData) {
  const rawData = fromFormData(formData);
  const parsedId = rawData.id !== undefined && rawData.id !== '' ? Number(rawData.id) : undefined;
  const name = rawData.name as string;

  if (name && name.trim()) {
    if (parsedId) {
      const existing = await prisma.vehicleType.findUnique({ where: { id: parsedId } });
      if (existing) {
        await prisma.vehicleType.update({ where: { id: parsedId }, data: { name: name.trim() } });
      } else {
        await prisma.vehicleType.create({ data: { name: name.trim() } });
      }
    } else {
      const existing = await prisma.vehicleType.findUnique({ where: { name: name.trim() } });
      if (!existing) {
        await prisma.vehicleType.create({ data: { name: name.trim() } });
      }
    }
  }
}

async function vehicleBodyTypeUpsertAction(formData: FormData) {
  const rawData = fromFormData(formData);
  const parsedId = rawData.id !== undefined && rawData.id !== '' ? Number(rawData.id) : undefined;
  const name = rawData.name as string;

  if (name && name.trim()) {
    if (parsedId) {
      const existing = await prisma.vehicleBodyType.findUnique({ where: { id: parsedId } });
      if (existing) {
        await prisma.vehicleBodyType.update({ where: { id: parsedId }, data: { name: name.trim() } });
      } else {
        await prisma.vehicleBodyType.create({ data: { name: name.trim() } });
      }
    } else {
      const existing = await prisma.vehicleBodyType.findUnique({ where: { name: name.trim() } });
      if (!existing) {
        await prisma.vehicleBodyType.create({ data: { name: name.trim() } });
      }
    }
  }
}

export default function VehicleInfo({}: Route.ComponentProps) {
  const fetcher = useFetcher();
  const { vehicleTypes, vehicleBodyTypes } = useLoaderData<typeof loader>();

  const handleVehicleTypeSave = async (data: VehicleOptionInfo) => {
    const formData = toFormData(data);
    formData.append("intent", "vehicle_type_upsert");
    fetcher.submit(formData, { method: "post", encType: "multipart/form-data" });
  };

  const handleVehicleBodyTypeSave = async (data: VehicleOptionInfo) => {
    const formData = toFormData(data);
    formData.append("intent", "vehicle_body_type_upsert");
    fetcher.submit(formData, { method: "post", encType: "multipart/form-data" });
  };

  return (
    <VehicleInfoPage
      vehicleTypes={vehicleTypes}
      vehicleBodyTypes={vehicleBodyTypes}
      onVehicleTypeSave={handleVehicleTypeSave}
      onVehicleBodyTypeSave={handleVehicleBodyTypeSave}
    />
  );
}