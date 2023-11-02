import { borderRadiuses, boxShadows, colors, fontSizes, fontWeights, spacings } from "@common/styleVariables";
import styled from "@emotion/styled";
import { ReactNode } from "react";
import ReactModal from "react-modal";
import CloseButton from "./CloseButton";

const contentPadding = spacings.get(4);

const Header = styled.div({
	display: "flex",
	justifyContent: "space-between",
	alignItems: "center",
	gap: spacings.get(1),
	padding: `${spacings.get(1)} ${spacings.get(1)} ${spacings.get(1)} ${contentPadding}`,
});

const ModalTitle = styled.h2({
	fontSize: fontSizes.default,
	fontWeight: fontWeights.medium,
});

const Content = styled.div({
	padding: `0 ${contentPadding} ${contentPadding} ${contentPadding}`,
});

interface Props {
	isOpen: boolean;
	onClose(): void;
	onAfterOpen?(): void;
	modalTitle?: ReactNode;
	children: ReactNode;
	minWidth?: string;
}

export default function Modal(props: Props) {
	const { isOpen, onAfterOpen, onClose, modalTitle, children, minWidth = "200px" } = props;
	return (
		<ReactModal
			isOpen={isOpen}
			onAfterOpen={onAfterOpen}
			onRequestClose={onClose}
			style={{
				overlay: {
					backgroundColor: colors.modalOverlay,
					padding: spacings.get(4),
					display: "flex",
					justifyContent: "center",
					alignItems: "flex-start",
				},
				content: {
					position: "relative",
					border: `1px solid ${colors.neutral300}`,
					borderRadius: borderRadiuses.medium,
					boxShadow: boxShadows.elevation100,
					padding: 0,
					inset: 0,
					minWidth: `min(${minWidth}, 100vw - ${spacings.get(4)})`,
				},
			}}
		>
			<Header style={{ justifyContent: modalTitle ? "space-between" : "flex-end" }}>
				{modalTitle && <ModalTitle>{modalTitle}</ModalTitle>}
				<CloseButton onClick={onClose} />
			</Header>
			<Content>{children}</Content>
		</ReactModal>
	);
}
