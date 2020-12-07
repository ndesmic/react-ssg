import { join } from "path";
import { promises as fs } from "fs";

export function getRootUrl(){
	return new URL("../", import.meta.url);
}

export const exists = path =>
	fs.access(path).then(() => true).catch(() => false);

export async function ensure(path) {
	const pathSplit = path.split(/[/\\]/);
	let currentPath = pathSplit[0];
	for await (let part of pathSplit.slice(1, pathSplit.length - 1)) {
		if(!part.trim()) continue;
		currentPath = join(currentPath, part);
		if (!await exists(currentPath)) {
			await fs.mkdir(currentPath);
		}
	}
}

export async function readJson(path) {
	const content = await fs.readFile(path, "utf-8");
	return JSON.parse(content);
}