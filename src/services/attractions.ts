import { Attraction } from "@api/client/models/Attraction";

export type StatusUpdate = "archive" | "unarchive" | "publish" | "unpublish";

export function getAllowedStatusUpdates(currentStatus: Attraction["status"]): Record<StatusUpdate, boolean> {
	return {
		archive: currentStatus !== "attraction.archived",
		unarchive: currentStatus === "attraction.archived",
		publish: currentStatus === "attraction.unpublished",
		unpublish: currentStatus === "attraction.published",
	};
}
