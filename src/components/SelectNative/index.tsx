import { borderRadiuses, colors, fontSizes, lineHeights, spacings } from "@common/styleVariables";
import styled, { CSSObject } from "@emotion/styled";
import { SelectHTMLAttributes } from "react";
import Icon from "../Icon";

const errorStyle: CSSObject = {
	borderColor: colors.error,
};

const Container = styled.div({
	position: "relative",
});

const IconWrapper = styled.div({
	position: "absolute",
	right: spacings.inputPadding,
	top: 0,
	bottom: 0,
	display: "flex",
	alignItems: "center",
	pointerEvents: "none",
});

const iconSize = 24;

const StyledSelect = styled.select<Props>(({ error }) => ({
	appearance: "none",
	padding: spacings.inputPadding,
	paddingRight: spacings.inputPadding + iconSize,
	margin: 0,
	fontSize: fontSizes.default,
	lineHeight: lineHeights.default,
	border: `1px solid ${colors.mediumContrast}`,
	borderRadius: borderRadiuses.medium,
	background: colors.white,
	color: colors.black,
	width: "100%",
	cursor: "pointer",
	"&:hover": {
		boxShadow: `0px 0px 0px 2px ${colors.neutral300}`,
	},
	"&:focus": {
		boxShadow: `0px 0px 0px 2px ${colors.blueDark}`,
	},
	"&:disabled": {
		background: colors.neutral200,
		cursor: "not-allowed",
	},
	"&::placeholder": {
		color: colors.mediumContrast,
	},
	...(error ? errorStyle : {}),
}));

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
	error?: string;
}

export default function SelectNative(props: Props) {
	return (
		<Container>
			<StyledSelect {...props} />
			<IconWrapper role="presentation">
				<Icon name="chevron-down" size={iconSize} />
			</IconWrapper>
		</Container>
	);
}
