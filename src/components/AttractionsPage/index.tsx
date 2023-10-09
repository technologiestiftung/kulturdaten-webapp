import { Attraction } from "@api/client/models/Attraction";
import Page from "@components/Page";
import { getLocalizedLabel } from "@utils/content";
import { useTranslations } from "use-intl";
import AttractionStatus from "../AttractionStatus";
import ContentTable from "../ContentTable";
import PageTitle from "../PageTitle";
import Pagination, { PaginationType } from "../Pagination";
import Spacer from "../Spacer";

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
