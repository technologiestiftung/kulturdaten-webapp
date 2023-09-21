import apiClient from "@api/client";
import { CreateLocationRequest } from "@api/client/models/CreateLocationRequest";
import { Location } from "@api/client/models/Location";
import FormWrapper from "@components/FormWrapper";
import LocationEditor from "@components/LocationEditor";
import Page from "@components/Page";
import { loadMessages } from "@utils/i18n";
import withAuth from "@utils/withAuth";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import { useTranslations } from "use-intl";

export const getStaticProps: GetStaticProps = async (context) => ({
	props: {
		messages: await loadMessages(context.locale!),
	},
});

const CreateNewLocation = () => {
	const t = useTranslations("Locations");
	const [errorMessage, errorMessageSet] = useState<string | undefined>(undefined);

	const router = useRouter();

	const createLocationHandler = (e: FormEvent<HTMLFormElement>, newLocation: Location) => {
		e.preventDefault();
		apiClient.maintainCulturalData
			.postLocations(newLocation as CreateLocationRequest)
			.then((res) => {
				const id = res.data!.locationReference!.referenceId!;
				router.push(`/admin/locations/${id}`);
			})
			.catch((error) => {
				errorMessageSet(`Verbindung fehlgeschlagen: ${error.status}`);
			});
	};

	return (
		<Page metadata={{ title: t("create-location") }}>
			<FormWrapper>
				<h1>Lege einen neue Location an</h1>
				<LocationEditor
					submitHandler={(e, locationObject) => createLocationHandler(e, locationObject as Location)}
					submitLabel="Organisation anlegen"
				/>
				{errorMessage && <span aria-live="assertive">{errorMessage}</span>}
			</FormWrapper>
		</Page>
	);
};

export default withAuth(CreateNewLocation);
