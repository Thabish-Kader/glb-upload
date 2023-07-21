"use client";
import {
	useDropzone,
	DropzoneRootProps,
	DropzoneInputProps,
	FileRejection,
	Accept,
} from "react-dropzone";

interface FileDropProps {
	onDrop: (acceptedFiles: File[], fileRejections: FileRejection[]) => void;
	useSuzanne: () => void;
}

const FileDrop: React.FC<FileDropProps> = ({ onDrop, useSuzanne }) => {
	const { getRootProps, getInputProps, isDragActive, fileRejections } =
		useDropzone({
			onDrop,
			maxFiles: 1,
			accept: {
				".gltf": ["model/gltf+json"],
				".glb": ["model/gltf-binary"],
			} as Accept,
		});

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
