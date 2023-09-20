import { borderRadiuses, colors, spacings } from "@common/styleVariables";
import Icon, { IconName } from "@components/Icon";
import styled, { CSSObject } from "@emotion/styled";
import NextLink from "next/link";
import { ReactNode } from "react";

const getStyles = (isActive: boolean): CSSObject => ({
	display: "flex",
	alignItems: "center",
	gap: spacings.get(1),
	padding: `${spacings.get(1)} ${spacings.get(2)}`,
	color: colors.blueDark,
	backgroundColor: isActive ? colors.blueLight : "transparent",
	borderRadius: borderRadiuses.medium,
	textDecoration: "none",
	wordBreak: "break-word",
	"&:hover": {
		backgroundColor: isActive ? colors.blueLight : colors.white,
	},
});

const StyledLink = styled(NextLink, {
	shouldForwardProp: (prop) => prop !== "isActive",
})<{ isActive: boolean }>(({ isActive }) => getStyles(isActive));

const StyledButton = styled.button(() => ({
	...getStyles(false),
	width: "100%",
	border: "none",
	cursor: "pointer",
}));

const ICON_SIZE = "15px";

const IconContainer = styled.div({
	flex: `0 0 ${ICON_SIZE}`,
});

type CommonProps = {
	icon: IconName;
	children: ReactNode;
};

type LinkProps = CommonProps & {
	href: string;
	isActive: boolean;
};

type ButtonProps = CommonProps & {
	onClick(): void;
};

export default function NavigationLink(props: LinkProps) {
	const { href, icon, children, isActive } = props;
	return (
		<StyledLink href={href} isActive={isActive}>
			<IconContainer>
				<Icon name={icon} size={15} />
			</IconContainer>
			{children}
		</StyledLink>
	);
}

export function NavigationButton(props: ButtonProps) {
	const { onClick, icon, children } = props;
	return (
		<StyledButton onClick={onClick}>
			<IconContainer>
				<Icon name={icon} size={ICON_SIZE} />
			</IconContainer>
			{children}
		</StyledButton>
	);
}
