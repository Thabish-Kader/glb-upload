import React, { Suspense, useLayoutEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage } from "@react-three/drei";
import useStore from "../../utils/store";

export const Viewer = ({}) => {
	const scene = useStore((store) => store.scene);
	const ref = useRef(null!);

	useLayoutEffect(() => {
		scene.traverse((obj: any) => {
			if (obj.isMesh) {
				// obj.castShadow = obj.receiveShadow = shadows;
				obj.material.envMapIntensity = 0.8;
			}
		});
	}, [scene]);

	return (
		<Canvas
			gl={{ preserveDrawingBuffer: true }}
			shadows
			dpr={[1, 1.5]}
			camera={{ position: [0, 0, 150], fov: 50 }}
		>
			<ambientLight intensity={0.25} />
			<Suspense fallback={null}>
				<Stage
				// controls={ref}
				// preset={preset}
				// intensity={intensity}
				// contactShadow={contactShadow}
				// shadows
				// adjustCamera
				// environment={environment}
				>
					<primitive object={scene} />
				</Stage>
			</Suspense>
			<OrbitControls ref={ref} />
		</Canvas>
	);
};
