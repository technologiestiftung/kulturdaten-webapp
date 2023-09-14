import apiClient from "@api/client";
import { CreateOrganizationRequest } from "@api/client/models/CreateOrganizationRequest";
import withAuth from "@utils/withAuth";
import { FC, FormEvent, useState } from "react";
import FormWrapper from "../../components/FormWrapper";
import OrganizationEditor from "../../components/OrganisationEditor";
import PageWrapper from "../../components/PageWrapper";

const CreateNewOrganization: FC = () => {
	const [errorMessage, errorMessageSet] = useState<string | undefined>(undefined);
	const createOrganizationHandler = (e: FormEvent<HTMLFormElement>, newOrganization: CreateOrganizationRequest) => {
		e.preventDefault();
		apiClient.maintainCulturalData
			.postOrganizations(newOrganization)
			.then((/* res */) => {
				// TODO: Navigate to created organization.
				// router.push(`/organizations/${res.identifier}`);
			})
			.catch((error) => {
				errorMessageSet(`Verbindung fehlgeschlagen ${error.status}`);
			});
	};

	return (
		<PageWrapper>
			<FormWrapper>
				<h1>Lege einen neue Organization an</h1>
				<OrganizationEditor submitHandler={createOrganizationHandler} submitLabel="Organisation anlegen" />
				{errorMessage && <span aria-live="assertive">{errorMessage}</span>}
			</FormWrapper>
		</PageWrapper>
	);
};

export default withAuth(CreateNewOrganization);
