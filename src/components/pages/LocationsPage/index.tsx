import { Location } from "@api/client/models/Location";
import Page from "@components/Page";
import { useCallback } from "react";
import { useTranslations } from "use-intl";
import { PaginationType } from "@common/types";
import ROUTES from "@common/routes";
import Button from "@components/Button";
import PageTitleHeader from "@components/PageTitleHeader";
import { useRouter } from "next/router";
import Spacer from "@components/Spacer";
import ContentTable from "@components/ContentTable";
import { getLocalizedLabel } from "@services/content";

interface Props {
	locations: Location[];
	pagination: PaginationType;
}

export default function LocationsPage(props: Props) {
	const router = useRouter();
	const { locations, pagination } = props;
	const t = useTranslations("Locations");
	const handleUpdated = useCallback(() => {
		router.replace(router.asPath, undefined, { scroll: false });
		// TODO: Show success message.
	}, [router]);
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
						header: t("table-header-title"),
						getContent: (location) => getLocalizedLabel(location.title!),
						canBeSorted: false,
					},
				]}
				onClickItem={(location) => router.push(ROUTES.locationDetails(location.identifier))}
			/>
		</Page>
	);
}
