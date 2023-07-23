import useStore from "@/utils/store";
import { Viewer } from "./Viewer";
import { startTransition, useEffect } from "react";

export const Result = () => {
	const { scene, generateScene } = useStore();
	useEffect(() => {
		startTransition(() => {
			generateScene();
		});
	}, []);
	return <section className="h-screen">{scene && <Viewer />}</section>;
};
