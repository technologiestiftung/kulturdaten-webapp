import { boxShadows, colors, mediaQueries, spacings } from "@common/styleVariables";
import styled from "@emotion/styled";
import { useTranslations } from "next-intl";
import { useState } from "react";
import ReactModal from "react-modal";
import Navigation from "../Navigation";
import ToggleButton from "./ToggleButton";

const MobileContainer = styled.div({
	display: "block",
	padding: spacings.get(0.5),
	backgroundColor: colors.grayLight,
	[mediaQueries.m]: {
		display: "none",
	},
});

export default function NavigationMobile() {
	const [expanded, setExpanded] = useState(false);
	const t = useTranslations("Navigation");
	return (
		<>
			<MobileContainer>
				<ToggleButton onClick={() => setExpanded(true)} />
			</MobileContainer>
			<ReactModal
				isOpen={expanded}
				onRequestClose={() => setExpanded(false)}
				contentLabel={t("menu-modal-label")}
				style={{
					overlay: {
						backgroundColor: colors.modalOverlay,
						padding: 0,
						display: "flex",
						justifyContent: "flex-start",
						alignItems: "flex-start",
					},
					content: {
						position: "relative",
						border: "none",
						borderRadius: 0,
						boxShadow: boxShadows.elevation100,
						padding: 0,
						inset: 0,
					},
				}}
			>
				<Navigation onCollapse={() => setExpanded(false)} />
			</ReactModal>
		</>
	);
}
