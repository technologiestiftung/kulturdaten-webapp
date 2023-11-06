import { Head, Html, Main, NextScript } from "next/document";

export const APP_ELEMENT_ID = "kulturdaten-app";

export default function Document() {
	return (
		<Html lang="de">
			<Head />
			<body id={APP_ELEMENT_ID}>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
