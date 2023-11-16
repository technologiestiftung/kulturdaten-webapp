import { colors, fontSizes } from "@common/styleVariables";
import styled from "@emotion/styled";
import { ComponentProps, ComponentType, ReactNode } from "react";
import Input from "../Input";

const Label = styled.label({
	fontSize: fontSizes.small,
});

const Error = styled.span({
	color: colors.error,
});

type Props<Component extends ComponentType> = ComponentProps<Component> & {
	component?: Component;
	label: ReactNode;
	error?: string | null;
};

const DEFAULT_COMPONENT = Input;

export default function FormField<Component extends ComponentType = typeof DEFAULT_COMPONENT>(props: Props<Component>) {
	const { component: Component = DEFAULT_COMPONENT, label, error, ...otherProps } = props;
	return (
		<Label>
			{label}
			<Component error={error} {...otherProps} />
			{error && <Error aria-live="assertive">{error}</Error>}
		</Label>
	);
}
