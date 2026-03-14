import type { Route } from "./+types/InsuranceBasicInfo";
import InsuranceForm from "~/components/InsuranceFrom";

export default function InsuranceBasicInfo({ }: Route.ComponentProps ) {  
    return (
        <main>
            <InsuranceForm />
        </main>
    );
}