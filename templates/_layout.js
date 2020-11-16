import { html } from "htm/preact/index.js";

export const layout = data => html`
<html>
	<head>
		<title>${data.title}</title>
	</head>
	<body>
		${data.page}
	</body>
</html>
`;