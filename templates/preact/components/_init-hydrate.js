import { render, h } from "preact";

const componentData = JSON.parse(document.querySelector("script[type='application/hydration-data']").innerHTML);
document.querySelectorAll("script[type='application/hydration-marker']").forEach(async marker => {
	const id = marker.dataset.id;
	const { props, componentName } = componentData.hydrationData[id];
	const { path, exportName } = componentData.componentPaths[componentName];
	const { [exportName]: component } = await import(new URL(path, window.location.href));

	render(h(component, props), marker.parentElement, marker.nextElementSibling);
});