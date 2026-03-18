import { createContext, useContext, useState, useMemo, useEffect, type ReactNode } from "react";
import { createTheme, ThemeProvider as MUIProvider, CssBaseline } from "@mui/material"; 
import { ThemeMode } from "~/.frontend/constants/ThemeMode";
 
interface ThemeContextType {
  mode: ThemeMode;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) { 
  const [mode, setMode] = useState<ThemeMode>(ThemeMode.Dark); // Default
  const [mounted, setMounted] = useState(false);

  // 1. Initialize state by checking localStorage 
  useEffect(() => {
    const savedMode = localStorage.getItem("theme-mode") as ThemeMode;
    if (savedMode) {
      setMode(savedMode);
    }
    setMounted(true);
  }, []);

  // 2. Keep localStorage in sync
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("theme-mode", mode);
    }
  }, [mode, mounted]);
  
  const toggleTheme = () => {
    setMode((prev) => (prev === ThemeMode.Light ? ThemeMode.Dark : ThemeMode.Light));
  };

  const theme = useMemo(() => createTheme({
    palette: {
      mode: mode === ThemeMode.Light ? 'light' : 'dark',
      primary: {
        main: mode === ThemeMode.Light ? '#1976d2' : '#90caf9' ,
      },
      background: {
        default:  mode === ThemeMode.Light  ? '#fff' : '#121212' ,
        paper:  mode === ThemeMode.Light  ? '#fff' : '#1e1e1e' ,
      },
      tabBar: { 
        backgroundColor: mode === ThemeMode.Light  ? '#e9f5ff' : '#1e1e1e' ,
      },
    },
  }), [mode]);

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <MUIProvider theme={theme}>
        <CssBaseline /> 
        {children}
      </MUIProvider>
    </ThemeContext.Provider>
  );
}

export const useThemeToggle = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useThemeToggle must be used within ThemeProvider");
  return context;
}; 

declare module '@mui/material/styles' {
  interface Palette {
    // This adds the key to the theme object
    tabBar: {
      backgroundColor: string;
    };
  }
  interface PaletteOptions {
    // This allows you to pass the key into createTheme()
     tabBar?: {
      backgroundColor?: string;
    };
  }
}
