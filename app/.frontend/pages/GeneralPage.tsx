import { Paper } from "@mui/material";
import type { SubmitHandler } from "react-hook-form";
import { data, useLoaderData } from "react-router";
import { InsuranceGenernalInformationForm } from "~/.frontend/components/forms/InsuranceGenernalInformationForm";
import type { InsuranceGenernalInformation } from "~/.frontend/models/InsuranceGenernalInformation";
 
interface GeneralPageProps {
   data?: InsuranceGenernalInformation;
   handleDataSubmit?: SubmitHandler<InsuranceGenernalInformation>;
}

export const GeneralPage: React.FC<GeneralPageProps> = ({ 
   data, handleDataSubmit 
}) => { 
   return (
      <Paper sx={{ minHeight: '100vh', borderRadius: 0, p: 0 }}> 
         <InsuranceGenernalInformationForm
            onSubmit={handleDataSubmit}
            data={data}
         />
      </Paper>
   );
};