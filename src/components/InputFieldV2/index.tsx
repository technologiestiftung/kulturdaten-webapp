import { colors, fontSizes } from "@/src/common/styleVariables";
import styled from "@emotion/styled";
import { ReactNode } from "react";
import Input, { Props as InputProps } from "../Input";

const Label = styled.label({
	fontSize: fontSizes.small,
});

const Error = styled.span({
	color: colors.error,
});

interface Props extends InputProps {
	label: ReactNode;
}

export default function InputField(props: Props) {
	const { label, error, ...otherProps } = props;
	return (
		<Label>
			{label}
			<Input error={error} {...otherProps} />
			{error && <Error aria-live="assertive">{error}</Error>}
		</Label>
	);
}
