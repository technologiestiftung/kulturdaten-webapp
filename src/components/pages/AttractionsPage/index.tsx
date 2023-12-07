import { AdminAttraction } from "@api/client/models/AdminAttraction";
import ROUTES from "@common/routes";
import { PaginationType } from "@common/types";
import AttractionStatus from "@components/AttractionStatus";
import Button from "@components/Button";
import ContentTable, { ACTIONS_CELL_STYLE } from "@components/ContentTable";
import Date from "@components/Date";
import Page from "@components/Page";
import PageTitleHeader from "@components/PageTitleHeader";
import Pagination from "@components/Pagination";
import Spacer from "@components/Spacer";
import { getLocalizedLabel } from "@services/content";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { useTranslations } from "use-intl";
import Actions from "./Actions";

interface Props {
	attractions: AdminAttraction[];
	pagination: PaginationType;
}

export default function AttractionsPage(props: Props) {
	const router = useRouter();
	const { attractions, pagination } = props;
	const t = useTranslations("Attractions");
	const handleUpdated = useCallback(() => {
		router.replace(router.asPath, undefined, { scroll: false });
		// TODO: Show success message.
	}, [router]);
	return (
		<Page metadata={{ title: t("page-title") }}>
			<PageTitleHeader
				title={t("page-title")}
				side={
					<Button as="a" useNextLink={true} href={ROUTES.attractionCreate()}>
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
						getContent: (attraction) => <AttractionStatus status={attraction.status} />,
						canBeSorted: false,
					},
					{
						header: t("table-header-created"),
						getContent: (attraction) => <Date date={attraction.metadata.created} />,
						canBeSorted: false,
					},
					{
						header: t("table-header-updated"),
						getContent: (attraction) => <Date date={attraction.metadata.updated} />,
						canBeSorted: false,
					},
					{
						header: "",
						getContent: (attraction) => <Actions attraction={attraction} onUpdated={handleUpdated} />,
						canBeSorted: false,
						headerStyle: ACTIONS_CELL_STYLE,
						cellStyle: ACTIONS_CELL_STYLE,
					},
				]}
				onClickItem={(attraction) => router.push(ROUTES.attractionDetails(attraction.identifier))}
			/>
			<Spacer size={20} />
			<Pagination pagination={pagination} info={t("number-attractions", { count: pagination.totalCount })} />
		</Page>
	);
}
