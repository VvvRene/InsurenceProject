import { create } from 'zustand';

interface DrawerState {
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;
}

const useLeftDrawerStore = create<DrawerState>()((set) => ({
  isDrawerOpen: false,
  openDrawer: () => set({ isDrawerOpen: true }),
  closeDrawer: () => set({ isDrawerOpen: false }),
  toggleDrawer: () => set((state: { isDrawerOpen: boolean }) => ({ isDrawerOpen: !state.isDrawerOpen })),
}));

export default useLeftDrawerStore;