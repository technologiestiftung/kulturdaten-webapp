import { Organization } from "@api/client/models/Organization";
import { User } from "@api/client/models/User";
import { Role } from "@contexts/userContext";

// TODO: Use proper type from generated API client.
export interface UserInviteRequest {
	email: string;
	role: Role;
}

export function getInitialRequest(user: User | null, organization: Organization): UserInviteRequest {
	if (user) {
		return {
			email: user.email,
			role: getRole(user, organization),
		};
	}
	const defaultRequest: UserInviteRequest = {
		email: "",
		role: "member",
	};
	return defaultRequest;
}

export function getRole(user: User, organization: Organization) {
	const role = user.memberships.find(
		({ organizationIdentifier }) => organizationIdentifier === organization.identifier,
	)!.role!;
	return role;
}
