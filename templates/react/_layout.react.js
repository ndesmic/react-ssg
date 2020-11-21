import { html } from "htm/react/index.mjs";

export const layout = data => html`
<html>
	<head>
		<title>${data.title}</title>
	</head>
	<body>
		${data.body}
	</body>
</html>
`;