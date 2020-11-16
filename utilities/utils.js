import { join } from "path";
import { promises as fs } from "fs";

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