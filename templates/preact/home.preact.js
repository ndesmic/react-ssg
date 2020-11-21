import { html } from "htm/preact/index.mjs";

export const title = "Home Preact";
export const layout = "_layout.preact.js"

const Header = ({ text }) => html`<h1>${text}</h1>`

export const body = html`
	<div>
		<${Header} text="Hello World!"><//>
		<p>A simple SSG Site with Preact</p>
	</div>
`;