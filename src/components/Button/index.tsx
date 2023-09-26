import styled, { CSSObject } from "@emotion/styled";
import NextLink from "next/link";
import { AnchorHTMLAttributes, ButtonHTMLAttributes, Ref, forwardRef } from "react";
import { borderRadiuses, colors, fontWeights, lineHeights, spacings, timings } from "../../common/styleVariables";

type ButtonColor = "primary" | "neutral";

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
	...colorStyles[color].default,
	fontWeight: fontWeights.default,
	textDecoration: "none",
	border: "none",
	borderRadius: borderRadiuses.medium,
	transition: `all ${timings.short} ease-in-out`,
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
const isNextLink = (props: LinkProps) => !!props.useNextLink;

const Button = forwardRef<HTMLButtonElement, Props>(function Button(props, ref) {
	if (isLink(props) && isNextLink(props)) {
		return <StyledButtonAsNextLink {...props} ref={ref as Ref<HTMLAnchorElement>} />;
	}
	if (isLink(props)) {
		return <StyledButtonAsLink {...props} ref={ref as Ref<HTMLAnchorElement>} />;
	}
	const { type = "button", ...otherProps } = props;
	if (props.unstyled) {
		return <UnstyledButton type={type} {...otherProps} ref={ref} />;
	}
	return <StyledButton type={type} {...otherProps} ref={ref} />;
});

export default Button;
