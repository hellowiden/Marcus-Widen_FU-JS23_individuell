import { create } from 'zustand';

interface AppState {
    overlayVisible: boolean;
    hideOverlay: () => void;
    showOverlay: () => void;
    toggleOverlay: () => void;

}

export const  useAppStore = create<AppState>((set) => ({
    overlayVisible: false,

    toggleOverlay: () => set((state) => ({ overlayVisible: !state.overlayVisible })),
    showOverlay: () => set({ overlayVisible: true }),
    hideOverlay: () => set({ overlayVisible: false }),

}))