import { html } from "htm/preact/index.mjs";
import { HydrationData } from "./components/_hydrator.js";
import { Script } from "./components/_script.js";

export const layout = data => html`
<html>
	<head>
		<title>${data.title}</title>
	</head>
	<body>
		${data.body}
		<${HydrationData} />
		<${Script} src="./components/_init-hydrate.js" />
	</body>
</html>
`;