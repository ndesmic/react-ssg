import { promises as fs } from "fs";
import { fileURLToPath, pathToFileURL } from "url";
import yargs from "yargs";
import render from "preact-render-to-string";
import { getScripts } from "../templates/preact/components/_script-manager.js";

import { ensure, readJson } from "../utilities/utils.js";

const args = yargs(process.argv.slice(2)).argv;
const templatesUrl = pathToFileURL(`${process.cwd()}/${args.t ?? "./templates/"}`);
const outputUrl = pathToFileURL(`${process.cwd()}/${args.o ?? "./output/"}`);

const files = await fs.readdir(fileURLToPath(templatesUrl));
await ensure(fileURLToPath(outputUrl));

const importMap = await readJson("./importmap.json");
const patchScript = src => src.replace(/(?<=\s*import(.*?)from\s*\")[^\.\/](.*?)(?=\")/g, v => importMap.imports[v] ?? `Bare import ${v} not found`);
async function emitScript(path, base){
	const outputPath = fileURLToPath(new URL(path, outputUrl));
	await ensure(outputPath)
	const src = await patchScript(await fs.readFile(fileURLToPath(new URL(path, base)), "utf-8"));
	await fs.writeFile(fileURLToPath(new URL(path, outputUrl)), src);
} 

for (const file of files) {
	if (/^_/.test(file) || !/\.js$/.test(file)) continue;
	const outfile = new URL(file.replace(/\.js$/, ".html"), outputUrl);
	const path = new URL(file, templatesUrl);
	const { title: pageTitle, body: pageBody, layout: pageLayout } = await import(path);
	const body = typeof (pageBody) === "function" ? await pageBody() : pageBody;
	const { layout } = await import(new URL(pageLayout ?? "_layout.js", templatesUrl));
	const output = render(layout({ title: pageTitle, body }));
	await fs.writeFile(fileURLToPath(outfile), output);
}
//export scripts in use
const scripts = getScripts();
for(const script of scripts){
	await emitScript(script, templatesUrl);
}
const preactScripts = ["./node_modules/preact/dist/preact.mjs", "./node_modules/preact/hooks/dist/hooks.mjs", "./node_modules/htm/preact/index.mjs", "./node_modules/htm/dist/htm.mjs"];
for(const script of preactScripts){
	await emitScript(script, pathToFileURL(process.cwd() + "/"));
};