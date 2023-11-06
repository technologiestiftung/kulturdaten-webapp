import { User } from "@api/client/models/User";

export function getFullName(user: User) {
	return [user.firstName || "-", user.lastName || ""].join(" ");
}
