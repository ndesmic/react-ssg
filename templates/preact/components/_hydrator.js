import { html } from "htm/preact/index.mjs";
import { addScript } from "./_script-manager.js";

const hydrationData = {};
const componentPaths = {};

let id = 0;

export function WithHydration(Component, path){
	return props => html`
		<>
			<script type="application/hydration-marker" data-id="${storeHydrationData(Component, props, path)}" />
			<${Component} ...${props}>
		</>`;
}

export function storeHydrationData(component, props, path){
	const componentName = component.displayName ?? component.name;
	hydrationData[id] = {
		props,
		componentName 
	};
	componentPaths[componentName] = {
		path,
		exportName: component.name
	};
	addScript(path);
	return id++;
}

export function HydrationData(){
	return html`<script type="application/hydration-data" dangerouslySetInnerHTML=${{ __html: JSON.stringify({
		componentPaths,
		hydrationData
	})}} />`;
}