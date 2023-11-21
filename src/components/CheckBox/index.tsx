import { borderRadiuses, colors } from "@common/styleVariables";
import styled, { CSSObject } from "@emotion/styled";
import { DetailedHTMLProps, InputHTMLAttributes } from "react";

const errorStyle: CSSObject = {
	borderColor: colors.error,
};

const StyledCheckbox = styled.input<Props>(({ error, disabled, readOnly }) => ({
	appearance: "none",
	margin: "0 0.5em 0.2em 0",
	verticalAlign: "middle",
	width: "1.2em",
	height: "1.2em",
	border: `1px solid ${colors.mediumContrast}`,
	borderRadius: borderRadiuses.small,
	backgroundColor: colors.white,
	cursor: "pointer",
	"&:checked": {
		backgroundColor: colors.blueDark,
	},
	"&:hover": !disabled &&
		!readOnly && {
			boxShadow: `0px 0px 0px 2px ${colors.neutral300}`,
		},
	"&:disabled": {
		backgroundColor: colors.neutral200,
		cursor: "not-allowed",
	},
	...(error ? errorStyle : {}),
}));

export interface Props extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
	error?: string | null;
}

export default function Checkbox(props: Props) {
	return <StyledCheckbox type="checkbox" {...props} />;
}
