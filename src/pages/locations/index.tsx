import apiClient from "@/src/api/client";
import { useEffect, useState } from "react";
import { Location } from "../../api/client/models/Location";
import LocationTable from "../../components/LocationTable";
import PageWrapper from "../../components/PageWrapper";

const LocationList = () => {
	const [locations, setLocations] = useState<Location[] | undefined>(undefined);

	const fetchLocations = () => {
		apiClient.discoverCulturalData
			.getLocations()
			.then((res) => {
				const locationsObject = res?.data?.locations;
				setLocations(locationsObject || undefined);
			})
			.catch((error) => {
				console.log("Error fetching locations:", error);
			});
	};

	useEffect(() => {
		fetchLocations();
		console.log("LocationList");
	}, []);

	return (
		<PageWrapper>
			<div className="w-full"></div>
			{locations ? <LocationTable locations={locations} fetchLocations={fetchLocations} /> : <div>Loading...</div>}
		</PageWrapper>
	);
};

export default LocationList;
