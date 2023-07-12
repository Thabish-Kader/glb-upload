"use client";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useState } from "react";

interface ModelProps {
	url: string;
}

function Model({ url }: ModelProps) {
	const model = useGLTF(url) as any;

	console.log(model.nodes);
	return (
		<>
			<primitive object={model.scene} />
		</>
	);
}

function ModelUploader() {
	const [url, seturl] = useState("./product.glb");

	const handleFileUpload = async (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const file = event.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = (e) => {
				const url = e.target?.result as string;
				seturl(url);
			};
			reader.readAsDataURL(file);
		}
	};

	return (
		<div className="h-screen">
			<input type="file" accept=".glb" onChange={handleFileUpload} />
			<Canvas>
				<ambientLight />
				<OrbitControls />
				<Model url={url} />
			</Canvas>
		</div>
	);
}

export default ModelUploader;
