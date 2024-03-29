import { borderRadiuses, colors, fontSizes, lineHeights, spacings } from "@common/styleVariables";
import styled, { CSSObject } from "@emotion/styled";
import { DetailedHTMLProps, TextareaHTMLAttributes } from "react";

const errorStyle: CSSObject = {
	borderColor: colors.error,
};

const StyledTextarea = styled.textarea<Props>(({ error, disabled, readOnly }) => ({
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
	"&:hover": !disabled &&
		!readOnly && {
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

interface Props extends DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> {
	error?: string | null;
}

export default function Textarea(props: Props) {
	return <StyledTextarea {...props} />;
}
