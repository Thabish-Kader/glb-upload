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
	console.log(nodes);
	return (
		<group {...props} dispose={null}>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.bookcover.geometry}
				material={materials.bookcover}
				position={[0.392, 0.001, -0.007]}
				rotation={[-1.573, 0, -1.574]}
				scale={[2.381, 2.604, 2.763]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.Cube.geometry}
				material={nodes.Cube.material}
				scale={[0.389, 1.38, 0.911]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.bookspine.geometry}
				material={materials.bookspine}
				position={[0, 0, 0.913]}
				rotation={[-1.57, -0.003, -Math.PI]}
				scale={[1.034, 1, 2.769]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.bookcover001.geometry}
				material={materials.bookcover}
				position={[-0.395, -0.002, -0.006]}
				rotation={[1.57, 0, 1.574]}
				scale={[2.369, 2.385, 2.765]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.bookspine001.geometry}
				material={materials.bookspine}
				position={[0.002, 0, -0.916]}
				rotation={[-1.572, 0, 3.133]}
				scale={[-1.016, -1, -2.763]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.booktop.geometry}
				material={materials.booktop}
				position={[0, 1.381, 0]}
				rotation={[0, 0, -0.002]}
				scale={[1.012, 1, 1.824]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.bookbottom.geometry}
				material={materials.booktop}
				position={[0, -1.388, 0]}
				rotation={[-0.001, -0.005, -3.138]}
				scale={[1.012, 1, 1.827]}
			/>
		</group>
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
