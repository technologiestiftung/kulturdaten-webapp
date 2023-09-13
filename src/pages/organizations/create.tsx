import { useRouter } from "next/router";
import { FC, FormEvent, useState } from "react";
import { CreateOrganizationRequest } from "../../api/client/models/CreateOrganizationRequest";
import FormWrapper from "../../components/FormWrapper";
import OrganizationEditor from "../../components/OrganisationEditor";
import PageWrapper from "../../components/PageWrapper";
import withAuth from "../../utils/withAuth";
import apiClient from "@/src/api/client";

const CreateNewOrganization: FC = () => {
	const [errorMessage, errorMessageSet] = useState<string | undefined>(undefined);

	const router = useRouter();

	const createOrganizationHandler = (e: FormEvent<HTMLFormElement>, newOrganization: CreateOrganizationRequest) => {
		e.preventDefault();
		console.log("CREATE Organization");

		apiClient.maintainCulturalData
			.postOrganizations(newOrganization)
			.then((res) => {
				console.log("Organization created successfully");
				// TODO: Navigate to created organization.
				// router.push(`/organizations/${res.identifier}`);
			})
			.catch((error: any) => {
				console.error("Error creating user:", error);
				// Uncomment for complete error report
				// Object.keys(error).map((key) => {
				// 	console.log(key, error[key]);
				// });
				if (error.status) {
					console.log("server error", error.status);
				} else {
					errorMessageSet(`Verbindung fehlgeschlagen ${error.status}`);
				}
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
