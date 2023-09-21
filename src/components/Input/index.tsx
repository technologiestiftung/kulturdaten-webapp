import { borderRadiuses, colors, fontSizes, lineHeights, spacings } from "@/src/common/styleVariables";
import styled, { CSSObject } from "@emotion/styled";
import { DetailedHTMLProps, InputHTMLAttributes } from "react";

const errorStyle: CSSObject = {
	boxShadow: `inset 0px 0px 0px 1px ${colors.error}`,
};

const StyledInput = styled.input<Props>(({ error }) => ({
	appearance: "none",
	padding: `${spacings.get(1.5)} ${spacings.get(1.5)}`,
	margin: 0,
	fontSize: fontSizes.default,
	lineHeight: lineHeights.default,
	border: `1px solid ${colors.mediumContrast}`,
	borderRadius: borderRadiuses.medium,
	background: colors.white,
	color: colors.black,
	width: "100%",
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
		color: colors.neutral300,
	},
	...(error ? errorStyle : {}),
}));

export interface Props extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
	error?: string;
}

export default function Input(props: Props) {
	const { type = "text", ...otherProps } = props;
	return <StyledInput type={type} {...otherProps} />;
}
