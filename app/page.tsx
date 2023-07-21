"use client";
import { SyntheticEvent, useCallback } from "react";
import useStore from "../utils/store";
import arrayBufferToString from "@/utils/arrayBufferToString";
import suzanne from "../public/product.glb";
import FileDrop from "./components/FileDrop";

export default function Home() {
	const onDrop = useCallback((acceptedFiles: File[]) => {
		acceptedFiles.forEach((file) => {
			const reader = new FileReader();
			reader.onabort = () => console.error("file reading was aborted");
			reader.onerror = () => console.error("file reading has failed");
			reader.onload = async () => {
				const data = reader.result;
				useStore.setState({ buffer: data, fileName: file.name });
				arrayBufferToString(data as ArrayBuffer, (a) =>
					useStore.setState({ textOriginalFile: a })
				);
			};
			reader.readAsArrayBuffer(file);
		});
	}, []);

	const useSuzanne = (e: SyntheticEvent) => {
		e.preventDefault();
		e.stopPropagation();
		useStore.setState({
			buffer: suzanne,
			fileName: "suzanne.gltf",
			textOriginalFile: suzanne,
		});
	};

	return (
		<main className="">
			{/* <ModelUploader /> */}
			<FileDrop onDrop={onDrop} useSuzanne={() => useSuzanne} />
		</main>
	);
}
