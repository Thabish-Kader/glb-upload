"use client";
import { SyntheticEvent, useCallback } from "react";
import suzanne from "../../public/product.glb";
import {
	useDropzone,
	DropzoneRootProps,
	DropzoneInputProps,
	FileRejection,
	Accept,
} from "react-dropzone";
import useStore from "../../utils/store";
import arrayBufferToString from "@/utils/arrayBufferToString";

const FileDrop = ({}) => {
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

	const { getRootProps, getInputProps, isDragActive, fileRejections } =
		useDropzone({
			onDrop,
			maxFiles: 1,
			accept: {
				".gltf": ["model/gltf+json"],
				".glb": ["model/gltf-binary"],
			} as Accept,
		});

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
		<div
			className="h-full w-screen flex flex-col items-center justify-center text-center"
			{...getRootProps()}
		>
			<input {...getInputProps()} />

			{isDragActive ? (
				<p className="text-4xl font-bold text-blue-600">
					Drop the files here...
				</p>
			) : (
				<p className="text-4xl font-bold">
					Drag {"'"}n{"'"} drop your GLTF file{" "}
					<button className="text-blue-600">here</button> or try it
					with{" "}
					<button className="text-blue-600" onClick={useSuzanne}>
						Suzanne
					</button>
				</p>
			)}
			{fileRejections.length ? (
				<p className="block text-center text-xl pt-4 text-red-300">
					Only .gltf or .glb files are accepted
				</p>
			) : null}
		</div>
	);
};

export default FileDrop;
