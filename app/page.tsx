import { SyntheticEvent, useCallback } from "react";
import useStore from "../utils/store";
import arrayBufferToString from "@/utils/arrayBufferToString";

import FileDrop from "./components/FileDrop";

export default function Home() {
	return (
		<main className="">
			{/* <ModelUploader /> */}
			<FileDrop />
		</main>
	);
}
