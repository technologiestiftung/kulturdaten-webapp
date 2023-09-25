import { borderRadiuses, colors, fontSizes, lineHeights, spacings } from "@/src/common/styleVariables";
import styled, { CSSObject } from "@emotion/styled";
import { DetailedHTMLProps, TextareaHTMLAttributes } from "react";

const errorStyle: CSSObject = {
	borderColor: colors.error,
};

const StyledTextarea = styled.textarea<Props>(({ error }) => ({
	appearance: "none",
	padding: spacings.inputPadding,
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

export interface Props extends DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> {
	error?: string;
}

export default function Textarea(props: Props) {
	return <StyledTextarea {...props} />;
}
