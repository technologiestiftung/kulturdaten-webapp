import { GetOrganizationMembershipsResponse } from "@api/client/models/GetOrganizationMembershipsResponse";

export type Membership = Required<Required<GetOrganizationMembershipsResponse>["data"]>["memberships"][0];
