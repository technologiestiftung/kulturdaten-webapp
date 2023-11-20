import { Organization } from "@api/client/models/Organization";

type StatusUpdate = "archive" | "unarchive";

export function getAllowedStatusUpdates(currentStatus: Organization["status"]): Record<StatusUpdate, boolean> {
	return {
		archive: currentStatus !== "organization.archived",
		unarchive: currentStatus === "organization.archived",
	};
}
