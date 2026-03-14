"use client";

import { Button, IconButton } from "@mui/material";
import { useThemeToggle } from "~/contexts/ThemeContext";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { ThemeMode } from "~/constants/ThemeMode";

export default function ThemeToggle() {
  const { mode, toggleTheme } = useThemeToggle(); 
  return (
    <IconButton onClick={toggleTheme} sx={{border:1}}> 
       {mode === ThemeMode.Light ? <DarkModeIcon /> : <LightModeIcon />}
    </IconButton>
  );
}