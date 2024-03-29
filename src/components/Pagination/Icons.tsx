import Icon from "@components/Icon";
import styled from "@emotion/styled";

const IconContainer = styled.div({});

const ICON_SIZE = 15;

export function IconPrevious() {
	return (
		<IconContainer style={{ width: ICON_SIZE }}>
			<Icon name="chevron-left" size={ICON_SIZE} />
		</IconContainer>
	);
}

export function IconNext() {
	return (
		<IconContainer style={{ width: ICON_SIZE }}>
			<Icon name="chevron-right" size={ICON_SIZE} />
		</IconContainer>
	);
}
