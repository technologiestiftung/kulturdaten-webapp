import { Location } from "@api/client/models/Location";
import { getLocalizedLabel } from "@services/content";
import { useTranslations } from "next-intl";
import React from "react";

interface Props {
	location: Location;
}

const MapsLink: React.FC<Props> = ({ location }) => {
	const t = useTranslations("Locations");
	const lat = location.coordinates?.latitude;
	const lng = location.coordinates?.longitude;
	const locationName = getLocalizedLabel(location.title);

	let mapsUrl;
	if (location.address) {
		const { streetAddress, postalCode, addressLocality } = location.address;
		const addressQuery = encodeURIComponent(`${locationName}, ${streetAddress}, ${postalCode} ${addressLocality}`);
		mapsUrl = `https://www.google.com/maps/search/?api=1&query=${addressQuery}`;
	} else if (lat && lng) {
		mapsUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
	}

	if (!mapsUrl) return <span>N/A</span>;

	return (
		<a href={mapsUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
			{t("open-in-maps")}
		</a>
	);
};

export default MapsLink;
