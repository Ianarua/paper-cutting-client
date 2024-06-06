import { create } from 'zustand';
import { ILogin } from '@/interface/ILogin.ts';

interface userStore {
    loginInfo: ILogin & 'token' | null,
    setLoginInfo: (loginInfo: ILogin & 'token') => void
}

const useUserStore = create<userStore>((set) => ({
    loginInfo: null,
    setLoginInfo: (loginInfo) => set()
}));

export default useUserStore;
