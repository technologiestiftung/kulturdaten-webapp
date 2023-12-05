import { colors, mediaQueries, zIndexes } from "@common/styleVariables";
import styled from "@emotion/styled";
import { useTranslations } from "next-intl";

const Overlay = styled.div({
	position: "fixed",
	top: 0,
	left: 0,
	right: 0,
	bottom: 0,
	backgroundColor: colors.modalOverlay,
	zIndex: zIndexes.navigationOverlay,
	[mediaQueries.m]: {
		display: "none",
	},
});

interface Props {
	onCollapse(): void;
}

export default function NavigationOverlay({ onCollapse }: Props) {
	const t = useTranslations("Navigation");
	return <Overlay onClick={onCollapse} aria-label={t("menu-collapse")} />;
}
