// import { create } from 'zustand';
// import IProjectBlock from '@/interface/IProjectBlock.ts';
// import { ILogin } from '@/interface/ILogin.ts';
//
// interface StoreState {
//     projectBlockData: IProjectBlock[],
//     setProjectBlockData: (projectBlockData: IProjectBlock[]) => void,
//     loginInfo: ILogin & 'token' | null,
//     setLoginInfo: (loginInfo: ILogin & 'token') => void
// }
//
// const useStore = create<StoreState>((set) => ({
//     projectBlockData: [],
//     setProjectBlockData: (projectBlockData) => set((state) => ({
//         projectBlockData: [...state.projectBlockData, ...projectBlockData]
//     })),
//
//     loginInfo: null,
//     setLoginInfo: (loginInfo) => set()
// }));
//
// export default useStore;
import useProjectStore from '@/store/modules/project.ts';

export {
    useProjectStore
};
