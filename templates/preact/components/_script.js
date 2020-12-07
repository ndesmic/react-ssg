import { html } from "htm/preact/index.mjs";
import { addScript } from "./_script-manager.js";

export function Script({ src }){
	addScript(src);
	return html`<script src=${src} type="module"></script>`
}