import { create } from "zustand";

interface StoreState {
	fileName: string;
	buffer: ArrayBuffer | null | string;
	textOriginalFile: string;
	scene: any;
}
const useStore = create<StoreState>()((set) => ({
	fileName: "",
	buffer: null,
	textOriginalFile: "",
	scene: null,
}));

export default useStore;
