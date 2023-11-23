import { spacings } from "@common/styleVariables";
import Button from "@components/Button";
import Icon from "@components/Icon";
import styled from "@emotion/styled";
import { useTranslations } from "next-intl";

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
