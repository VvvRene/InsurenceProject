import { Paper } from "@mui/material"; 
 
interface DetailPageProps {  
}

export const DetailPage: React.FC<DetailPageProps> = ({ }) => { 
  return (
     <Paper sx={{ minHeight: '100vh', borderRadius: 0, p: 0 }}>
        Details
     </Paper>
  );
};