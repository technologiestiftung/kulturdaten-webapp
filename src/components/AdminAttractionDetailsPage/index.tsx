import { AdminAttraction } from "@api/client/models/AdminAttraction";
import Page from "@components/Page";
import PageTitle from "@components/PageTitle";
import { useTranslations } from "use-intl";
import AttractionEditor from "../AttractionEditor";
import Spacer from "../Spacer";

interface Props {
	attraction: AdminAttraction | null;
}

export default function AdminAttractionDetailsPage(props: Props) {
	const { attraction } = props;
	const isNew = attraction === null;
	const t = useTranslations("Attraction-Details");
	const pageTitle = isNew ? t("page-title-add") : t("page-title-edit", { attractionTitle: attraction?.title.de });
	return (
		<Page metadata={{ title: pageTitle }}>
			<PageTitle>{pageTitle}</PageTitle>
			<Spacer size={20} />
			<AttractionEditor attraction={attraction} />
		</Page>
	);
}
