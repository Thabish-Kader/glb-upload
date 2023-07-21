import { create } from "zustand";

const useStore = create((set) => ({
	fileName: "",
	buffer: null,
}));
