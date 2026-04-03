import { Paper } from "@mui/material";
import type { SubmitHandler } from "react-hook-form";
import { data, useLoaderData } from "react-router"; 
import type { InsuranceGeneralInformation } from "~/.frontend/models/InsuranceGenernalInformation";
import { InsuranceGeneralInformationForm } from "../components/forms/InsuranceGenernalInformationForm";
 
interface GeneralPageProps {
   data?: InsuranceGeneralInformation;
   handleDataSubmit?: SubmitHandler<InsuranceGeneralInformation>;
}

export const GeneralPage: React.FC<GeneralPageProps> = ({ 
   data, handleDataSubmit 
}) => { 
   return (
      <Paper sx={{ minHeight: '100vh', borderRadius: 0, p: 0 }}> 
         <InsuranceGeneralInformationForm
            onSubmit={handleDataSubmit}
            data={data}
         />
      </Paper>
   );
};