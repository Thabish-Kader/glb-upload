"use client";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useState } from "react";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";

interface ModelProps {
	url: string;
}

function Model({ url }: ModelProps) {
	const { nodes, material } = useGLTF(url) as any;
	return (
		<>
			{nodes &&
				Object.values(nodes).map((node, index) => (
					<mesh
						key={index}
						geometry={node.geometry}
						material={node.material}
					/>
				))}
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
