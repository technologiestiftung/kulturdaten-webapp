import { Location } from "@api/client/models/Location";
import ROUTES from "@common/routes";
import Page from "@components/Page";
import PageTitle from "@components/PageTitle";
import { getLocalizedLabel } from "@utils/content";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { useTranslations } from "use-intl";
import LocationEditor from "../LocationEditor";
import Spacer from "../Spacer";
import LocationStatus from "../LocationStatus";

interface Props {
	location: Location | null;
}

export default function LocationDetailsPage(props: Props) {
	const { location } = props;
	const router = useRouter();
	const t = useTranslations("Location-Details");
	const isNew = location === null;
	const pageTitle = isNew
		? t("page-title-add")
		: t("page-title-edit", { locationTitle: getLocalizedLabel(location?.title) });
	const handleAfterSubmit = useCallback(() => {
		router.push(ROUTES.admin.locations());
	}, [router]);
	return (
		<Page metadata={{ title: pageTitle }}>
			<PageTitle>{pageTitle}</PageTitle>
			{location && <LocationStatus status={location.status} />}
			<Spacer size={20} />
			<LocationEditor location={location} onAfterSubmit={handleAfterSubmit} />
		</Page>
	);
}
