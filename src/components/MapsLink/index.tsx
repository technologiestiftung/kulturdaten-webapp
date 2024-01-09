import { Location } from "@api/client/models/Location";
import { useTranslations } from "next-intl";
import React from "react";

interface Props {
	location: Location;
}

const MapsLink: React.FC<Props> = ({ location }) => {
	const lat = location.coordinates?.latitude;
	const lng = location.coordinates?.longitude;
	const t = useTranslations("Locations");

	let mapsUrl;
	if (lat && lng) {
		mapsUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
	} else if (location.address) {
		const { streetAddress, postalCode, addressLocality } = location.address;
		const addressQuery = encodeURIComponent(`${streetAddress}, ${postalCode} ${addressLocality}`);
		mapsUrl = `https://www.google.com/maps/search/?api=1&query=${addressQuery}`;
	}

	if (!mapsUrl) return <span>N/A</span>;

	return (
		<a href={mapsUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
			{t("open-in-maps")}
		</a>
	);
};

export default MapsLink;
