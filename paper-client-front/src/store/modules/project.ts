import { create } from 'zustand';
import IProjectBlock from '@/interface/IProjectBlock.ts';

interface ProjectStore {
    projectBlockData: IProjectBlock[],
    setProjectBlockData: (projectBlockData: IProjectBlock[]) => void,
}

const useProjectStore = create<ProjectStore>((set) => ({
    projectBlockData: [],
    setProjectBlockData: (projectBlockData) => set((state) => ({
        projectBlockData: [...state.projectBlockData, ...projectBlockData]
    })),
}));

export default useProjectStore;
