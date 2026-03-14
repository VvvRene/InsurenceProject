import { Paper } from "@mui/material";
import type { SubmitHandler } from "react-hook-form";
import { InsuranceGenernalInformationForm } from "~/components/forms/InsuranceGenernalInformationForm";
import type { InsuranceGenernalInformation } from "~/models/InsuranceGenernalInformation";

interface GeneralPageProps {
}

interface IUserForm {
   email: string;
   username: string;
}

export const GeneralPage: React.FC<GeneralPageProps> = ({ }) => {
   const handleUserSubmit: SubmitHandler<InsuranceGenernalInformation> = (data) => {
      console.log("Form Data:", data);
   };
   return (
      <Paper sx={{ minHeight: '100vh', borderRadius: 0, p: 0 }}>
         <InsuranceGenernalInformationForm  onSubmit={handleUserSubmit}/>
      </Paper>
   );
};