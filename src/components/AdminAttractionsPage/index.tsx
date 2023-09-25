import { AdminAttraction } from "@api/client/models/AdminAttraction";
import ROUTES from "@common/routes";
import Page from "@components/Page";
import { getLocalizedLabel } from "@utils/content";
import { useRouter } from "next/router";
import { useTranslations } from "use-intl";
import Button from "../Button";
import ContentTable from "../ContentTable";
import PageTitleHeader from "../PageTitleHeader";
import Pagination, { PaginationType } from "../Pagination";
import Spacer from "../Spacer";

interface Props {
	attractions: AdminAttraction[];
	pagination: PaginationType;
}

export default function AdminAttractionsPage(props: Props) {
	const router = useRouter();
	const { attractions, pagination } = props;
	const t = useTranslations("Attractions");
	return (
		<Page metadata={{ title: t("page-title") }}>
			<PageTitleHeader
				title={t("page-title")}
				side={
					<Button as="a" useNextLink={true} href={ROUTES.admin.attractionCreate()}>
						{t("create-attraction")}
					</Button>
				}
			/>
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
				onClickItem={(attraction) => router.push(ROUTES.admin.attractionDetails(attraction.identifier))}
			/>
			<Spacer size={20} />
			<Pagination pagination={pagination} info={t("number-attractions", { count: pagination.totalCount })} />
		</Page>
	);
}
