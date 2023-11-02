import { spacings } from "@common/styleVariables";
import styled from "@emotion/styled";
import { useTranslations } from "next-intl";
import Button from "../Button";
import Icon from "../Icon";

const StyledButton = styled(Button)({
	padding: spacings.get(2),
});

interface Props {
	onClick(): void;
}

export default function CloseButton({ onClick }: Props) {
	const t = useTranslations("Modal");
	return (
		<StyledButton onClick={onClick} color="neutral" aria-label={t("close-button")}>
			<Icon name="x" />
		</StyledButton>
	);
}
