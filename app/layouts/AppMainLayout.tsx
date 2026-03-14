import { Paper } from "@mui/material";
import TopNavBar from "~/components/TopNavBar";
 
interface AppMainLayoutProps { 
    children: React.ReactNode 
}

export const AppMainLayout: React.FC<AppMainLayoutProps> = ({ children }) => { 
  return (
     <Paper sx={{ minHeight: '100vh', borderRadius: 0, p: 0 }}>
        <TopNavBar />
        {children}
     </Paper>
  );
};