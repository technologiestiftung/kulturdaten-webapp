import { colors, iconSizes } from "@common/styleVariables";
import Icon from "@components/Icon";
import styled from "@emotion/styled";

const Container = styled.div({
	color: colors.error,
});

const StyledIcon = styled(Icon)({
	display: "inline-block",
	verticalAlign: "-0.125em",
});

interface Props {
	error: string | null;
}

export default function ErrorMessage(props: Props) {
	const { error } = props;
	return (
		<Container aria-live="assertive">
			{error && (
				<>
					<StyledIcon name="alert-triangle" size={iconSizes[16]} /> {error}
				</>
			)}
		</Container>
	);
}
