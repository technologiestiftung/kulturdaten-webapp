import apiClient from "@api/client";
import { CreateOrganizationRequest } from "@api/client/models/CreateOrganizationRequest";
import FormWrapper from "@components/FormWrapper";
import OrganizationEditor from "@components/OrganisationEditor";
import Page from "@components/Page";
import { loadMessages } from "@utils/i18n";
import withAuth from "@utils/withAuth";
import { GetStaticProps } from "next";
import { FC, FormEvent, useState } from "react";
import { useTranslations } from "use-intl";

export const getStaticProps: GetStaticProps = async (context) => ({
	props: {
		messages: await loadMessages(context.locale!),
	},
});

const CreateNewOrganization: FC = () => {
	const t = useTranslations("Organizations");
	const [errorMessage, errorMessageSet] = useState<string | undefined>(undefined);
	const createOrganizationHandler = (e: FormEvent<HTMLFormElement>, newOrganization: CreateOrganizationRequest) => {
		e.preventDefault();
		apiClient.manageCulturalData
			.postOrganizations(newOrganization)
			.then((/* res */) => {
				// TODO: Navigate to created organization.
				// router.push(ROUTES.admin.organizationDetails(res.identifier));
			})
			.catch((error) => {
				errorMessageSet(`Verbindung fehlgeschlagen ${error.status}`);
			});
	};

	return (
		<Page metadata={{ title: t("create-organization") }}>
			<FormWrapper>
				<h1>Lege einen neue Organization an</h1>
				<OrganizationEditor submitHandler={createOrganizationHandler} submitLabel="Organisation anlegen" />
				{errorMessage && <span aria-live="assertive">{errorMessage}</span>}
			</FormWrapper>
		</Page>
	);
};

export default withAuth(CreateNewOrganization);
