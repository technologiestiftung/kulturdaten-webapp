import { colors, mediaQueries, spacings } from "@common/styleVariables";
import styled from "@emotion/styled";
import ToggleButton from "./ToggleButton";

const Container = styled.div({
	display: "block",
	padding: spacings.get(0.5),
	backgroundColor: colors.grayLight,
	[mediaQueries.m]: {
		display: "none",
	},
});

interface Props {
	onExpand(): void;
}

export default function NavigationMobile({ onExpand }: Props) {
	return (
		<Container>
			<ToggleButton onClick={onExpand} />
		</Container>
	);
}
