"use client";
import { useState, useRef } from "react";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import * as THREE from "three";
interface ModelProps {
	url: string;
	props?: any;
}

function Model({ url, props }: ModelProps) {
	const { scene } = useGLTF(url) as any;
	const [texture, setTexture] = useState<THREE.Texture | null>(null);

	const meshRef = useRef<THREE.Mesh>(null);

	const handleClick = (event: THREE.Event) => {
		const mesh = meshRef.current;

		if (mesh) {
			const intersects = event.intersections;

			if (intersects.length > 0) {
				const faceIndex = intersects[0].faceIndex;
				const uv = intersects[0]?.uv;
				if (uv && texture) {
					// Clone the existing texture to avoid modifying the original one
					const newTexture = new THREE.Texture();
					const fileReader = new FileReader();

					const file = event.event?.target?.files?.[0];
					if (file) {
						// Load the selected image and set it as the new texture
						fileReader.onload = () => {
							if (fileReader.result) {
								newTexture.image = new Image();
								newTexture.image.src =
									fileReader.result as string;
								newTexture.needsUpdate = true;
							}
						};
						fileReader.readAsDataURL(file);
					}
					// Apply the new texture to the clicked face
					mesh.geometry.attributes.uv.set(
						new Float32Array(uv),
						faceIndex * 2
					);
					mesh.material = new THREE.MeshBasicMaterial({
						map: newTexture,
					});
				}
			}
		}
	};

	return (
		<>
			<mesh ref={meshRef} onClick={handleClick} {...props}>
				<primitive object={scene} />
			</mesh>
		</>
	);
}
function ModelUploader() {
	const [url, seturl] = useState("./product.glb");
	const inputRef = useRef<HTMLInputElement>(null);

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
				<Model url={url} ref={inputRef} />
			</Canvas>
		</div>
	);
}

export default ModelUploader;
