import { useState } from "preact/hooks/dist/hooks.mjs";
import { html } from "htm/preact/index.mjs";

export const Counter = ({ title }) => {
	
	const [value, setValue] = useState(0);
	
	function increment(){
		setValue(value + 1);
	}

	function decrement(){
		setValue(value - 1);
	}

	return html`
		<div id="foo">
			<h2>${title}</h2>
			<div>${value}</div>
			<button onClick=${increment}>+</button>
			<button onClick=${decrement}>-</button>
		</div>
	`;
};