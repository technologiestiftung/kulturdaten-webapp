import apiClient from "@api/client";
import { Location } from "@api/client/models/Location";
import { UpdateLocationRequest } from "@api/client/models/UpdateLocationRequest";
import ROUTES from "@common/routes";
import FormWrapper from "@components/FormWrapper";
import LocationEditor from "@components/LocationEditor";
import Page from "@components/Page";
import { loadMessages } from "@utils/i18n";
import withAuth from "@utils/withAuth";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { useTranslations } from "use-intl";

export const getServerSideProps: GetServerSideProps = async (context) => ({
	props: {
		messages: await loadMessages(context.locale!),
	},
});

const LocationDetails = () => {
	const t = useTranslations("Locations");
	const router = useRouter();
	const [location, locationSet] = useState<Location | null>(null);
	const identifier = router.query.identifier as string | undefined;

	const fetchLocation = useCallback(async () => {
		if (identifier) {
			const res = await apiClient.discoverCulturalData.getLocations1(identifier);
			const locationObject = res?.data?.location;
			locationSet(locationObject || null);
		}
	}, [identifier]);

	useEffect(() => {
		if (identifier !== undefined) {
			fetchLocation();
		}
	}, [identifier, fetchLocation]);

	const editLocation = async (locationObject: Location) => {
		await apiClient.maintainCulturalData.patchLocations(identifier as string, locationObject as UpdateLocationRequest);
		fetchLocation();
		router.push(ROUTES.admin.locationDetails(identifier!));
	};

	if (location === null) {
		return <div>Loading...</div>;
	} else {
		return (
			<Page metadata={{ title: t("edit-location") }}>
				<FormWrapper>
					<h1>Ort bearbeiten</h1>
					<p>Hier kannst du alle hinterlegten Infos einsehen und bearbeiten</p>
					<h2>{location.title?.de}</h2>
					<p>{location.website}</p>
					{location.borough && <p>{location.borough}</p>}
					<div className="mb-4"></div>
					<LocationEditor
						location={location}
						submitHandler={(e, locationObject) => editLocation(locationObject as Location)}
						submitLabel="Ort bearbeiten"
					/>
				</FormWrapper>
			</Page>
		);
	}
};
export default withAuth(LocationDetails);
