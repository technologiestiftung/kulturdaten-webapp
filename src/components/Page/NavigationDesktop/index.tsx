import { mediaQueries } from "@common/styleVariables";
import styled from "@emotion/styled";
import Navigation from "../Navigation";

const DesktopContainer = styled.div({
	display: "none",
	position: "fixed",
	top: 0,
	left: 0,
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
