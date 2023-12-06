import { mediaQueries, widths } from "@common/styleVariables";
import styled from "@emotion/styled";
import Navigation from "../Navigation";

const DesktopContainer = styled.div({
	display: "none",
	position: "fixed",
	top: 0,
	left: `max(0, calc(50% - ${widths.maxContentWidth} / 2))`,
	overflow: "auto",
	[mediaQueries.m]: {
		display: "block",
	},
});

export default function NavigationDesktop() {
	return (
		<DesktopContainer>
			<Navigation />
		</DesktopContainer>
	);
}
