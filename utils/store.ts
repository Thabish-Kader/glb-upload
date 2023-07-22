import { create } from "zustand";

interface StoreState {
	fileName: string;
	buffer: ArrayBuffer | null | string;
	textOriginalFile: string;
}
const useStore = create<StoreState>()((set) => ({
	fileName: "",
	buffer: null,
	textOriginalFile: "",
}));

export default useStore;
