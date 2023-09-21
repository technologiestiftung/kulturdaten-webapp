import { AdminAttraction } from "@api/client/models/AdminAttraction";
import Page from "@components/Page";
import { getLocalizedLabel } from "@utils/content";
import { useTranslations } from "use-intl";
import ContentTable from "../ContentTable";
import PageTitle from "../PageTitle";
import Pagination, { PaginationType } from "../Pagination";
import Spacer from "../Spacer";

interface Props {
	attractions: AdminAttraction[];
	pagination: PaginationType;
}

export default function AdminAttractionsPage(props: Props) {
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
						header: t("table-header-events"),
						getContent: (attraction) => attraction.events.length,
						canBeSorted: false,
					},
					{
						header: t("table-header-status"),
						getContent: (attraction) => attraction.status || "–",
						canBeSorted: false,
					},
				]}
			/>
			<Spacer size={20} />
			<Pagination pagination={pagination} info={t("number-attractions", { count: pagination.totalCount })} />
		</Page>
	);
}
