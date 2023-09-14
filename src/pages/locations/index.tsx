import apiClient from "@api/client";
import { Location } from "@api/client/models/Location";
import { useEffect, useState } from "react";
import LocationTable from "../../components/LocationTable";
import PageWrapper from "../../components/PageWrapper";

const LocationList = () => {
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
		<PageWrapper>
			<div className="w-full"></div>
			{locations ? <LocationTable locations={locations} fetchLocations={fetchLocations} /> : <div>Loading...</div>}
		</PageWrapper>
	);
};

export default LocationList;
