import { html } from "htm/react/index.mjs";

export const title = "Home React";
export const layout = "_layout.react.js"

const Header = ({ text }) => html`<h1>${text}</h1>`

export const body = html`
	<div>
		<${Header} text="Hello World!"><//>
		<p>A simple SSG Site with React</p>
	</div>
`;