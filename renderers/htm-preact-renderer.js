import { promises as fs } from "fs";
import { fileURLToPath, pathToFileURL } from "url";
import yargs from "yargs";
import render from "preact-render-to-string";

import { ensure } from "../utilities/utils.js";

const args = yargs(process.argv.slice(2)).argv;
const templatesUrl = pathToFileURL(`${process.cwd()}/${args.t ?? "./templates/"}`);
const outputUrl = pathToFileURL(`${process.cwd()}/${args.o ?? "./output/"}`);

const files = await fs.readdir(fileURLToPath(templatesUrl));
await ensure(fileURLToPath(outputUrl));

for (const file of files) {
	if (/^_/.test(file)) continue;
	const outfile = new URL(file.replace(/\.js$/, ".html"), outputUrl);
	const path = new URL(file, templatesUrl);
	const { title: pageTitle, body: pageBody, layout: pageLayout } = await import(path);
	const body = typeof (pageBody) === "function" ? await pageBody() : pageBody;
	const { layout } = await import(new URL(pageLayout ?? "_layout.js", templatesUrl));
	const output = render(layout({ title: pageTitle, body }));
	await fs.writeFile(fileURLToPath(outfile), output);
}