import styled, { CSSObject } from "@emotion/styled";
import NextLink from "next/link";
import { AnchorHTMLAttributes, ButtonHTMLAttributes, Ref, forwardRef } from "react";
import { borderRadiuses, colors, fontWeights, lineHeights, spacings, timings } from "../../common/styleVariables";

type ButtonColor = "primary" | "neutral" | "danger";

type StyleMapping = {
	default: CSSObject;
	hover: CSSObject;
};

const colorStyles: Record<ButtonColor, StyleMapping> = {
	primary: {
		default: {
			color: colors.white,
			background: colors.blueDark,
		},
		hover: {
			background: colors.blueDarkHover,
		},
	},
	neutral: {
		default: {
			color: colors.black,
			background: "transparent",
		},
		hover: {
			background: colors.neutral200,
		},
	},
	danger: {
		default: {
			color: colors.error,
			background: "transparent",
			border: `1px solid ${colors.error}`,
		},
		hover: {
			color: colors.white,
			background: colors.error,
			border: `1px solid ${colors.errorDark}`,
		},
	},
};

const UnstyledButton = styled.button({
	appearance: "none",
	border: "none",
	background: "none",
});

const StyledButton = styled("button", {
	shouldForwardProp: (prop) => !["as", "color", "unstyled", "useNextLink"].includes(prop.toString()),
})<{ color?: ButtonColor }>(({ color = "primary" }) => ({
	appearance: "none",
	display: "inline-block",
	lineHeight: lineHeights.buttons,
	padding: `${spacings.get(2)} ${spacings.get(3.5)}`,
	fontWeight: fontWeights.default,
	textDecoration: "none",
	border: "1px transparent",
	borderRadius: borderRadiuses.medium,
	transition: `all ${timings.short} ease-in-out`,
	...colorStyles[color].default,
	"&:hover": {
		...colorStyles[color].hover,
		cursor: "pointer",
	},
}));

interface CommonProps {
	color?: ButtonColor;
}

interface StyledButtonProps {
	as?: "button" | undefined;
	unstyled?: boolean;
}

const StyledButtonAsLink = StyledButton.withComponent("a");
const StyledButtonAsNextLink = StyledButton.withComponent(NextLink);

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & StyledButtonProps & CommonProps;

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> &
	CommonProps & {
		as: "a";
		href: string;
		rel?: string;
		target?: string;
		useNextLink?: boolean;
		ref?: Ref<HTMLAnchorElement>;
	};

type Props = ButtonProps | LinkProps;

const isLink = (props: Props): props is LinkProps => props.as === "a";

const Button = forwardRef<HTMLButtonElement, Props>(function Button(props, ref) {
	if (isLink(props)) {
		const LinkComponent = props.useNextLink ? StyledButtonAsNextLink : StyledButtonAsLink;
		return <LinkComponent {...props} ref={ref as Ref<HTMLAnchorElement>} />;
	}
	const { type = "button", ...otherProps } = props;
	const ButtonComponent = props.unstyled ? UnstyledButton : StyledButton;
	return <ButtonComponent type={type} {...otherProps} ref={ref} />;
});

export default Button;
