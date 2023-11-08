import { CreateMembershipRequest } from "@api/client/models/CreateMembershipRequest";
import { Organization } from "@api/client/models/Organization";
import { User } from "@api/client/models/User";

export function getInitialRequest(user: User | null, organization: Organization): CreateMembershipRequest {
	if (user) {
		return {
			email: user.email,
			role: getRole(user, organization) || "unassigned",
		};
	}
	const defaultRequest: CreateMembershipRequest = {
		email: "",
		role: "member",
	};
	return defaultRequest;
}

export function getRole(user: User, organization: Organization) {
	const membership = user.memberships.find(
		({ organizationIdentifier }) => organizationIdentifier === organization.identifier,
	);
	if (!membership) {
		return null;
	}
	return membership.role;
}
