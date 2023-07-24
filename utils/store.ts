import { create } from "zustand";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { KTX2Loader } from "three/examples/jsm/loaders/KTX2Loader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { WebGLRenderer } from "three";
import { REVISION } from "three";

interface StoreState {
	fileName: string;
	buffer: ArrayBuffer | null | string;
	textOriginalFile: string;
	scene: THREE.Scene | null;
}

let gltfLoader: GLTFLoader;
if (typeof window !== "undefined") {
	const THREE_PATH = `https://unpkg.com/three@0.${REVISION}.x`;
	// Use the same CDN as useGLTF for draco
	const dracoloader = new DRACOLoader().setDecoderPath(
		"https://www.gstatic.com/draco/versioned/decoders/1.5.5/"
	);
	const ktx2Loader = new KTX2Loader().setTranscoderPath(
		`${THREE_PATH}/examples/jsm/libs/basis/`
	);

	gltfLoader = new GLTFLoader()
		.setCrossOrigin("anonymous")
		.setDRACOLoader(dracoloader)
		.setKTX2Loader(ktx2Loader.detectSupport(new WebGLRenderer()));
}

const useStore = create<StoreState>()((set) => ({
	fileName: "",
	buffer: null,
	textOriginalFile: "",
	scene: null,
}));

export default useStore;
