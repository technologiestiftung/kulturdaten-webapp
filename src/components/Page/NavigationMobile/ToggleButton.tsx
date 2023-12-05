import { iconSizes, spacings } from "@common/styleVariables";
import Button from "@components/Button";
import Icon from "@components/Icon";
import styled from "@emotion/styled";
import { useTranslations } from "next-intl";

const StyledButton = styled(Button)({
	display: "flex",
	gap: spacings.get(1),
	alignItems: "center",
	padding: spacings.get(2),
});

interface Props {
	onClick(): void;
}

export default function ToggleButton({ onClick }: Props) {
	const t = useTranslations("Navigation");
	return (
		<StyledButton onClick={onClick} color="neutral">
			<Icon name="menu" size={iconSizes[24]} /> {t("menu-button")}
		</StyledButton>
	);
}
