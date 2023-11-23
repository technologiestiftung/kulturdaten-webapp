import { borderRadiuses, colors, fontSizes, iconSizes, lineHeights, spacings, timings } from "@common/styleVariables";
import Icon from "@components/Icon";
import styled, { CSSObject } from "@emotion/styled";
import { SelectHTMLAttributes } from "react";

type Variation = "default" | "table";

type StyleMapping = {
	default: CSSObject;
	hover: CSSObject;
	focus: CSSObject;
	iconSize: number;
};

const variationStyles: Record<Variation, StyleMapping> = {
	default: {
		default: {
			fontSize: fontSizes.default,
			padding: spacings.inputPadding,
			paddingRight: spacings.inputPadding + iconSizes[24],
			border: `1px solid ${colors.mediumContrast}`,
		},
		hover: {},
		focus: {},
		iconSize: iconSizes[24],
	},
	table: {
		default: {
			fontSize: fontSizes.small,
			padding: `${spacings.get(1)} ${spacings.get(1.5)}`,
			paddingRight: spacings.getNumber(1.5) + iconSizes[16],
			border: `1px solid ${colors.neutral300}`,
		},
		hover: {
			border: `1px solid ${colors.mediumContrast}`,
		},
		focus: {
			border: `1px solid ${colors.mediumContrast}`,
		},
		iconSize: iconSizes[16],
	},
};

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

const StyledSelect = styled.select<{ variation: Variation; error?: string }>(({ variation, error, disabled }) => ({
	appearance: "none",
	margin: 0,
	lineHeight: lineHeights.buttons,
	borderRadius: borderRadiuses.medium,
	background: colors.white,
	color: colors.black,
	width: "100%",
	cursor: "pointer",
	overflow: "hidden",
	textOverflow: "ellipsis",
	transition: `all ${timings.short} ease-in-out`,
	...variationStyles[variation].default,
	"&:hover": !disabled && {
		boxShadow: `0px 0px 0px 2px ${colors.neutral300}`,
		...variationStyles[variation].hover,
	},
	"&:focus": {
		boxShadow: `0px 0px 0px 2px ${colors.blueDark}`,
		...variationStyles[variation].focus,
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
	variation?: Variation;
	error?: string;
}

export default function SelectNative(props: Props) {
	const { variation = "default", ...otherProps } = props;
	return (
		<Container>
			<StyledSelect variation={variation} {...otherProps} />
			<IconWrapper role="presentation">
				<Icon name="chevron-down" size={variationStyles[variation].iconSize} />
			</IconWrapper>
		</Container>
	);
}
