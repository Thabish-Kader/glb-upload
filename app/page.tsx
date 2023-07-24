"use client";
import { SyntheticEvent, useCallback } from "react";
import useStore from "../utils/store";
import arrayBufferToString from "@/utils/arrayBufferToString";
import suzanne from "../public/product.glb";
import FileDrop from "./components/FileDrop";
import { Result } from "./components/Result";
import ModelUploader from "./components/ModelUploader";

export default async function Home() {
	const { buffer } = useStore((state) => ({
		buffer: state.buffer,
	}));

	const onDrop = useCallback((acceptedFiles: File[]) => {
		acceptedFiles.forEach(async (file) => {
			const reader = new FileReader();
			reader.onabort = () => console.error("file reading was aborted");
			reader.onerror = () => console.error("file reading has failed");
			reader.onload = async () => {
				const data = reader.result;
				useStore.setState({
					buffer: data as ArrayBuffer,
					fileName: file.name,
				});
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
			buffer: suzanne as string,
			fileName: "suzanne.gltf",
			textOriginalFile: suzanne,
		});
	};
	return (
		<main className="h-screen">
			{/* {buffer ? (
				<Result />
			) : (
				<FileDrop onDrop={onDrop} useSuzanne={useSuzanne} />
			)} */}
			<ModelUploader />
		</main>
	);
}
