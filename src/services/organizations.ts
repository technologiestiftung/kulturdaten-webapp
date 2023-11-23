import { Organization } from "@api/client/models/Organization";

type StatusUpdate = "publish" | "unpublish" | "archive" | "unarchive";

export function getAllowedStatusUpdates(currentStatus: Organization["status"]): Record<StatusUpdate, boolean> {
	return {
		archive: currentStatus !== "organization.archived",
		unarchive: currentStatus === "organization.archived",
		publish: currentStatus === "organization.unpublished",
		unpublish: currentStatus === "organization.published",
	};
}
