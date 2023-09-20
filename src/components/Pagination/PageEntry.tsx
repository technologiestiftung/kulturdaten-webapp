import { borderRadiuses, colors, spacings } from "@/src/common/styleVariables";
import styled, { CSSObject } from "@emotion/styled";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { ReactNode } from "react";

const sharedStyles: CSSObject = {
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	minWidth: "2rem",
	width: "100%",
	height: "100%",
	color: colors.black,
	padding: spacings.get(2),
	borderRadius: borderRadiuses.medium,
};

const Static = styled.div({
	...sharedStyles,
	backgroundColor: colors.white,
	opacity: 0.5,
});

const StyledLink = styled(Link, {
	shouldForwardProp: (prop) => !["active"].includes(prop),
})<{ active: boolean }>(({ active }) => ({
	...sharedStyles,
	backgroundColor: active ? colors.neutral300 : colors.white,
	textDecoration: "none",
	"&:hover": {
		backgroundColor: active ? colors.neutral300 : colors.neutral200,
	},
}));

interface Props {
	targetPage: number;
	interactive: boolean;
	active: boolean;
	children: ReactNode;
}

export default function PageEntry({ targetPage, interactive, active, children }: Props) {
	const t = useTranslations("Pagination");
	if (interactive) {
		return (
			<StyledLink
				href={`/?page=${targetPage}`}
				active={active}
				aria-label={t("go-to-page", { pageNumber: targetPage })}
			>
				{children}
			</StyledLink>
		);
	}
	return <Static>{children}</Static>;
}
