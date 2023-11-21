import { borderRadiuses, colors } from "@common/styleVariables";
import Icon from "@components/Icon";
import styled from "@emotion/styled";
import { DetailedHTMLProps, InputHTMLAttributes } from "react";

const InputContainer = styled.div<{ checkboxSize: string }>(({ checkboxSize }) => ({
	position: "relative",
	width: checkboxSize,
	height: checkboxSize,
}));

const Input = styled.input(({ disabled, readOnly }) => ({
	display: "block",
	height: "100%",
	appearance: "none",
	margin: 0,
	border: `1px solid ${colors.mediumContrast}`,
	borderRadius: borderRadiuses.medium,
	backgroundColor: colors.white,
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
}));

const IconContainer = styled.div({
	position: "absolute",
	top: 0,
	left: 0,
	width: "100%",
	height: "100%",
});

interface Props extends Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, "type"> {
	checkboxSize?: string;
}

export default function InputCheckbox({ checkboxSize = "20px", ...otherProps }: Props) {
	return (
		<InputContainer checkboxSize={checkboxSize}>
			<Input {...otherProps} type="checkbox" />
			{otherProps.checked && (
				<IconContainer role="presentation">
					<Icon name="check" size={checkboxSize} color={colors.white} />
				</IconContainer>
			)}
		</InputContainer>
	);
}
