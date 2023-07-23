"use client";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useState } from "react";

interface ModelProps {
	url: string;
	props?: any;
}

function Model({ url, props }: ModelProps) {
	const { nodes, materials } = useGLTF(url) as any;

	return <group {...props} dispose={null}></group>;
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
