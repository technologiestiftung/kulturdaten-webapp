import { AdminAttraction } from "@api/client/models/AdminAttraction";
import ROUTES from "@common/routes";
import AttractionStatus from "@components/AttractionStatus";
import Page from "@components/Page";
import PageTitle from "@components/PageTitle";
import Spacer from "@components/Spacer";
import { getLocalizedLabel } from "@services/content";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { useTranslations } from "use-intl";
import AttractionEditor from "./AttractionEditor";

interface Props {
	attraction: AdminAttraction | null;
}

export default function AttractionDetailsPage(props: Props) {
	const { attraction } = props;
	const router = useRouter();
	const t = useTranslations("Attraction-Details");
	const isNew = attraction === null;
	const pageTitle = isNew
		? t("page-title-add")
		: t("page-title-edit", { attractionTitle: getLocalizedLabel(attraction?.title) });
	const handleAfterSubmit = useCallback(() => {
		router.push(ROUTES.attractions());
	}, [router]);
	return (
		<Page metadata={{ title: pageTitle }}>
			<PageTitle>{pageTitle}</PageTitle>
			{attraction && <AttractionStatus status={attraction.status} />}
			<Spacer size={20} />
			<AttractionEditor attraction={attraction} onAfterSubmit={handleAfterSubmit} />
		</Page>
	);
}
