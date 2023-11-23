import { spacings } from "@common/styleVariables";
import Button from "@components/Button";
import styled from "@emotion/styled";
import { useTranslations } from "next-intl";

const Container = styled.div({
	display: "flex",
	gap: spacings.get(2),
});

interface Props {
	onClose(): void;
}

export default function Buttons(props: Props) {
	const { onClose } = props;
	const t = useTranslations("User-Details");
	return (
		<Container>
			<Button color="primary" type="submit">
				{t("invite-button")}
			</Button>
			<Button color="neutral" onClick={onClose}>
				{t("cancel-button")}
			</Button>
		</Container>
	);
}
