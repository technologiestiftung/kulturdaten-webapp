import { Location } from "@api/client/models/Location";

type StatusUpdate = "archive" | "unarchive" | "publish" | "unpublish";

export function getAllowedStatusUpdates(currentStatus: Location["status"]): Record<StatusUpdate, boolean> {
	return {
		archive: currentStatus !== "location.archived",
		unarchive: currentStatus === "location.archived",
		publish: currentStatus === "location.unpublished",
		unpublish: currentStatus === "location.published",
	};
}
