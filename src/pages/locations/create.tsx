import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import apiClient from "../../api/client";
import { CreateLocationRequest } from "../../api/client/models/CreateLocationRequest";
import { Location } from "../../api/client/models/Location";
import FormWrapper from "../../components/FormWrapper";
import LocationEditor from "../../components/LocationEditor";
import PageWrapper from "../../components/PageWrapper";
import withAuth from "../../utils/withAuth";

const CreateNewLocation = () => {
	const [errorMessage, errorMessageSet] = useState<string | undefined>(undefined);

	const router = useRouter();

	const createLocationHandler = (e: FormEvent<HTMLFormElement>, newLocation: Location) => {
		e.preventDefault();
		console.log("CREATE Location");
		apiClient.maintainCulturalData
			.postLocations(newLocation as CreateLocationRequest)
			.then((res) => {
				const id = res.data!.locationReference!.referenceId!;
				console.log("Location created successfully", id);
				router.push(`/locations/${id}`);
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
				<h1>Lege einen neue Location an</h1>
				<LocationEditor
					submitHandler={(e, locationObject) => createLocationHandler(e, locationObject as Location)}
					submitLabel="Organisation anlegen"
				/>
				{errorMessage && <span aria-live="assertive">{errorMessage}</span>}
			</FormWrapper>
		</PageWrapper>
	);
};

export default withAuth(CreateNewLocation);
