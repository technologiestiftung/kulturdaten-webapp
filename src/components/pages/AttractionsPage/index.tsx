import { Attraction } from "@api/client/models/Attraction";
import AttractionStatus from "@components/AttractionStatus";
import ContentTable from "@components/ContentTable";
import Page from "@components/Page";
import PageTitle from "@components/PageTitle";
import Pagination, { PaginationType } from "@components/Pagination";
import Spacer from "@components/Spacer";
import { getLocalizedLabel } from "@services/content";
import { useTranslations } from "use-intl";

interface Props {
	attractions: Attraction[];
	pagination: PaginationType;
}

export default function AttractionsPage(props: Props) {
	const { attractions, pagination } = props;
	const t = useTranslations("Attractions");
	return (
		<Page metadata={{ title: t("page-title") }}>
			<PageTitle>{t("page-title")}</PageTitle>
			<Spacer size={20} />
			<ContentTable
				items={attractions}
				columns={[
					{
						header: t("table-header-title"),
						getContent: (attraction) => getLocalizedLabel(attraction.title!),
						canBeSorted: false,
					},
					{
						header: t("table-header-status"),
						getContent: (attraction) => <AttractionStatus status={attraction.status} />,
						canBeSorted: false,
					},
				]}
			/>
			<Spacer size={20} />
			<Pagination pagination={pagination} info={t("number-attractions", { count: pagination.totalCount })} />
		</Page>
	);
}
