import { colors, fontFamilies, fontSizes, fontWeights, lineHeights } from "@common/styleVariables";
import { CSSObject, Global } from "@emotion/react";

const styles: CSSObject = {
	"*, *::before, *::after": {
		boxSizing: "border-box",
	},
	"*": {
		margin: 0,
	},
	"img, picture, video, canvas, svg": {
		display: "block",
		maxWidth: "100%",
	},
	"input, button, textarea, select": {
		font: "inherit",
	},
	p: {
		overflowWrap: "break-word",
		whiteSpace: "pre-line",
	},
	"strong, b": {
		fontWeight: fontWeights.medium,
	},
	a: {
		color: colors.blueDark,
		textDecoration: "underline",
		"&:hover": {
			textDecoration: "none",
		},
	},
	html: {
		fontSize: fontSizes.default,
		fontFamily: fontFamilies.default,
		lineHeight: lineHeights.default,
		color: colors.black,
		backgroundColor: colors.grayLight,
		scrollBehavior: "smooth",
	},
};

export default function GlobalStyles() {
	return <Global styles={styles} />;
}
