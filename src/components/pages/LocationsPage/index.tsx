import { Location } from "@api/client/models/Location";
import Page from "@components/Page";
import { useTranslations } from "use-intl";
import { PaginationType } from "@common/types";
import ROUTES from "@common/routes";
import Button from "@components/Button";
import PageTitleHeader from "@components/PageTitleHeader";
import { useRouter } from "next/router";
import Spacer from "@components/Spacer";
import ContentTable from "@components/ContentTable";
import { getLocalizedLabel } from "@services/content";
import LocationStatus from "@components/LocationStatus";
import Pagination from "@components/Pagination";
import MapsLink from "@components/MapsLink";

interface Props {
	locations: Location[];
	pagination: PaginationType;
}

export default function LocationsPage(props: Props) {
	const router = useRouter();
	const { locations, pagination } = props;
	const t = useTranslations("Locations");
	return (
		<Page metadata={{ title: t("page-title") }}>
			<PageTitleHeader
				title={t("page-title")}
				side={
					<Button as="a" useNextLink={true} href={ROUTES.locationCreate()}>
						{t("create-location")}
					</Button>
				}
			/>
			<Spacer size={20} />
			<ContentTable
				items={locations}
				columns={[
					{
						header: t("table-header-identifier"),
						getContent: (location) => location.identifier,
						canBeSorted: false,
					},
					{
						header: t("table-header-title"),
						getContent: (location) => getLocalizedLabel(location.title!),
						canBeSorted: false,
					},
					{
						header: t("table-header-title"),
						getContent: (location) => <MapsLink location={location} />,
						canBeSorted: false,
					},
					{
						header: t("table-header-status"),
						getContent: (location) => <LocationStatus status={location.status} />,
						canBeSorted: false,
					},
				]}
				onClickItem={(location) => router.push(ROUTES.locationDetails(location.identifier))}
			/>
			<Spacer size={20} />
			<Pagination pagination={pagination} info={t("number-locations", { count: pagination.totalCount })} />
		</Page>
	);
}
