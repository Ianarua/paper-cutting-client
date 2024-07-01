import { create } from 'zustand';
import IProjectBlock from '@/interface/IProjectBlock.ts';

interface ProjectStore {
    projectBlockData: IProjectBlock[],
    setProjectBlockData: (projectBlockData: IProjectBlock[]) => void,
    clearProjectBlockData: () => void,
    isFirstLogin: boolean
    setIsFirstLogin: (isFirstLogin: boolean) => void
}

const useProjectStore = create<ProjectStore>((set) => ({
    projectBlockData: [],
    setProjectBlockData: (projectBlockData) => set((state) => ({
        projectBlockData: [...state.projectBlockData, ...projectBlockData]
    })),
    clearProjectBlockData: () => set(() => ({
        projectBlockData: []
    })),
    isFirstLogin: true,
    setIsFirstLogin: () => set((state) => ({
        isFirstLogin: state.isFirstLogin
    }))
}));

export default useProjectStore;
