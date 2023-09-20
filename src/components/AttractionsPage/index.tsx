import { Attraction } from "@api/client/models/Attraction";
import Page from "@components/Page";
import { getLocalizedLabel } from "@utils/content";
import { useTranslations } from "use-intl";
import ContentTable from "../ContentTable";
import PageTitle from "../PageTitle";
import Spacer from "../Spacer";

interface Props {
	attractions: Attraction[];
}

export default function AttractionsPage(props: Props) {
	const t = useTranslations("Attractions");
	return (
		<Page metadata={{ title: t("page-title") }}>
			<PageTitle>{t("page-title")}</PageTitle>
			<Spacer size={20} />
			<ContentTable
				items={props.attractions}
				columns={[
					{
						header: t("table-header-title"),
						getContent: (attraction) => getLocalizedLabel(attraction.title!),
						canBeSorted: false,
					},
					{
						header: t("table-header-status"),
						getContent: (attraction) => attraction.status || "–",
						canBeSorted: false,
					},
				]}
			/>
		</Page>
	);
}
