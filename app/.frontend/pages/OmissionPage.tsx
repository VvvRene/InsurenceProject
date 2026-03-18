import { Paper } from "@mui/material"; 
 
interface OmissionPageProps {  
}

export const OmissionPage: React.FC<OmissionPageProps> = ({ }) => { 
  return (
     <Paper sx={{ minHeight: '100vh', borderRadius: 0, p: 0 }}>
        Omission Page
     </Paper>
  );
};