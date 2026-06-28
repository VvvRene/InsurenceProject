import type { Route } from "./+types/insuranceCompanies";
import { useFetcher, useLoaderData } from "react-router";
import InsuranceCompaniesPage from "~/.frontend/pages/InsuranceCompaniesPage";
import { prisma } from "~/.server/db/prisma";
import { toFormData } from "~/utils/toFormData";
import { InsuranceCompanyInfoSchema, type InsuranceCompanyInfo } from "~/.frontend/models/InsuranceCompanyInfo";
import { fromFormData } from "~/utils/fromFormData";

export async function loader() {
  const insuranceCompanies = await prisma.insuranceCompany.findMany({ orderBy: { name: 'asc' } });
  return { insuranceCompanies };
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const intent = formData.get("intent");

  switch (intent) {
    case "insurance_company_upsert":
      return insuranceCompanyUpsertAction(formData);
    default:
      throw new Response("Invalid Intent", { status: 400 });
  }
}

async function insuranceCompanyUpsertAction(formData: FormData) {
  const rawData = fromFormData(formData);
  const parsedId = rawData.id ? Number(rawData.id) : undefined;
  const result = InsuranceCompanyInfoSchema.safeParse({ ...rawData, id: parsedId });

  if (result.success) {
    const insuranceCompanyData = {
      name: result.data.name,
    };

    if (result.data.id) {
      await prisma.insuranceCompany.update({
        where: { id: result.data.id },
        data: insuranceCompanyData,
      });
    } else {
      await prisma.insuranceCompany.create({ data: insuranceCompanyData });
    }
  } else {
    result.error.issues.forEach((issue) => {
      console.log(`Field: ${issue.path.join(".")}`);
      console.log(`Error: ${issue.message}`);
    });
  }
}

export default function insuranceCompanies({}: Route.ComponentProps) {
  const fetcher = useFetcher();
  const { insuranceCompanies } = useLoaderData<typeof loader>();

  const handleInsuranceCompanyUpsert = async (insuranceCompanyInfo: InsuranceCompanyInfo) => {
    const formData = toFormData(insuranceCompanyInfo);
    formData.append("intent", "insurance_company_upsert");
    fetcher.submit(formData, { method: "post", encType: "multipart/form-data" });
  };

  return <InsuranceCompaniesPage insuranceCompanies={insuranceCompanies} onSave={handleInsuranceCompanyUpsert} />;
}
