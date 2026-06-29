import type { Route } from "./+types/brokers";
import { useFetcher, useLoaderData } from "react-router";
import BrokersPage from "~/.frontend/pages/BrokersPage";
import { prisma } from "~/.server/db/prisma";
import { toFormData } from "~/utils/toFormData";
import { BrokerInfoSchema, type BrokerInfo } from "~/.frontend/models/BrokerInfo";
import { fromFormData } from "~/utils/fromFormData";

export async function loader() {
  const brokers = await prisma.broker.findMany({ orderBy: { name: 'asc' } });
  return { brokers };
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const intent = formData.get("intent");

  switch (intent) {
    case "broker_upsert":
      return brokerUpsertAction(formData);
    default:
      throw new Response("Invalid Intent", { status: 400 });
  }
}

async function brokerUpsertAction(formData: FormData) {
  const rawData = fromFormData(formData);
  const parsedId = rawData.id ? Number(rawData.id) : undefined;
  const result = BrokerInfoSchema.safeParse({ ...rawData, id: parsedId });

  if (result.success) {
    const brokerData = { name: result.data.name };

    if (result.data.id) {
      await prisma.broker.update({ where: { id: result.data.id }, data: brokerData });
    } else {
      await prisma.broker.create({ data: brokerData });
    }
  } else {
    result.error.issues.forEach((issue) => {
      console.log(`Field: ${issue.path.join(".")}`);
      console.log(`Error: ${issue.message}`);
    });
  }
}

export default function brokers({}: Route.ComponentProps) {
  const fetcher = useFetcher();
  const { brokers } = useLoaderData<typeof loader>();

  const handleBrokerUpsert = async (brokerInfo: BrokerInfo) => {
    const formData = toFormData(brokerInfo);
    formData.append("intent", "broker_upsert");
    fetcher.submit(formData, { method: "post", encType: "multipart/form-data" });
  };

  return <BrokersPage brokers={brokers} onSave={handleBrokerUpsert} />;
}
