import apiClient from "@api/client";
import { Location } from "@api/client/models/Location";
import LocationTable from "@components/LocationTable";
import Page from "@components/Page";
import { useEffect, useState } from "react";
import { useTranslations } from "use-intl";

const LocationsPage = () => {
	const t = useTranslations("Locations");
	const [locations, setLocations] = useState<Location[] | undefined>(undefined);

	const fetchLocations = () => {
		apiClient.discoverCulturalData.getLocations().then((res) => {
			const locationsObject = res?.data?.locations;
			setLocations(locationsObject || undefined);
		});
	};

	useEffect(() => {
		fetchLocations();
	}, []);

	return (
		<Page metadata={{ title: t("page-title") }}>
			{locations ? <LocationTable locations={locations} fetchLocations={fetchLocations} /> : <div>Loading...</div>}
		</Page>
	);
};

export default LocationsPage;
