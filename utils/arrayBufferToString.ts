const arrayBufferToString = (
	buffer: ArrayBuffer,
	callback: (result: string) => void
) => {
	const blob = new Blob([buffer], { type: "text/plain" });
	const reader = new FileReader();

	reader.onload = (evt: ProgressEvent<FileReader>) => {
		if (evt.target?.result && typeof evt.target.result === "string") {
			callback(evt.target.result);
		}
	};

	reader.readAsText(blob, "utf-8");
};

export default arrayBufferToString;
