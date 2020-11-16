import htm from "htm";
import React from "react";
const html = htm.bind(React.createElement);

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