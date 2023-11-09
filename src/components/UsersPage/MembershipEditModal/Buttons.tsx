import { spacings } from "@common/styleVariables";
import Button from "@components/Button";
import styled from "@emotion/styled";
import { useTranslations } from "next-intl";

const Container = styled.div({
	display: "flex",
	justifyContent: "space-between",
	flexWrap: "wrap",
	gap: spacings.get(2),
});

const LeftButtons = styled.div({
	display: "flex",
	flexWrap: "wrap",
	gap: spacings.get(2),
});

interface Props {
	onClose(): void;
	onDelete(): void;
}

export default function Buttons(props: Props) {
	const { onClose, onDelete } = props;
	const t = useTranslations("User-Details");
	return (
		<Container>
			<LeftButtons>
				<Button color="primary" type="submit">
					{t("update-button")}
				</Button>
				<Button color="neutral" onClick={onClose}>
					{t("cancel-button")}
				</Button>
			</LeftButtons>
			<Button color="danger" onClick={onDelete}>
				{t("delete-button")}
			</Button>
		</Container>
	);
}
