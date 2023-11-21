import { lineHeights, spacings } from "@common/styleVariables";
import InputCheckbox from "@components/InputCheckbox";
import styled from "@emotion/styled";
import { DetailedHTMLProps, InputHTMLAttributes, ReactNode } from "react";

const Label = styled.label({
	display: "inline-flex",
	gap: spacings.get(1.5),
	alignItems: "flex-start",
	lineHeight: lineHeights.buttons,
	cursor: "pointer",
});

const InputContainer = styled.div({
	flex: "0 0 auto",
});

const LabelContainer = styled.span({
	flex: "1 1 auto",
});

interface Props extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
	label: ReactNode;
	checkboxSize?: string;
}

export default function Checkbox(props: Props) {
	const { label, ...otherProps } = props;
	return (
		<Label>
			<InputContainer>
				<InputCheckbox {...otherProps} />
			</InputContainer>
			<LabelContainer>{label}</LabelContainer>
		</Label>
	);
}
