import { borderRadiuses, colors, fontSizes } from "@common/styleVariables";
import styled from "@emotion/styled";

const Container = styled.div({
	display: "flex",
	flexFlow: "row wrap",
	justifyContent: "space-between",
	alignItems: "center",
	fontSize: fontSizes.small,
	border: `1px solid ${colors.neutral200}`,
	borderRadius: borderRadiuses.big,
});

export default Container;
