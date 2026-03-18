import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// 1. Define the shape of your state and actions
interface ThemeModeState { 
  isNightMode: boolean;
  setNightMode: (isNight: boolean) => void;
}

// 2. Create the store with the interface
export const useThemeModeStore = create<ThemeModeState>()(
  persist(
    (set) => ({
        isNightMode: false, 
        setNightMode: (isNight) => set({ isNightMode: isNight }),
    }),
    {
      name: 'insurance_management_system_storage', // Key in localStorage
      storage: createJSONStorage(() => localStorage), // Explicitly use localStorage
    }
  )
);