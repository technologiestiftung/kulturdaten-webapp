import Page from "@components/Page";
import { useTranslations } from "use-intl";

export default function AttractionsPage() {
	const t = useTranslations("Attractions");
	return <Page metadata={{ title: t("page-title") }}>Attractions coming soon…</Page>;
}
