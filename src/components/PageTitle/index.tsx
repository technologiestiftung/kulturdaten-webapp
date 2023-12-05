import { colors, fontSizes, fontWeights, mediaQueries } from "@common/styleVariables";
import styled from "@emotion/styled";

const PageTitle = styled.h1({
	fontSize: fontSizes.large,
	fontWeight: fontWeights.default,
	color: colors.blueDark,
	[mediaQueries.m]: {
		fontSize: fontSizes.extraLarge,
	},
});

export default PageTitle;
