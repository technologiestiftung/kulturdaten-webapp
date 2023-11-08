export interface UserLike {
	firstName?: string;
	lastName?: string;
}

export function getFullName(user: UserLike) {
	return [user.firstName || "-", user.lastName || ""].join(" ").trim();
}
