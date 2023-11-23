import { CreateMembershipRequest } from "@api/client/models/CreateMembershipRequest";
import { GetOrganizationMembershipsResponse } from "@api/client/models/GetOrganizationMembershipsResponse";
import { GetTagsResponse } from "@api/client/models/GetTagsResponse";
import { Location } from "@api/client/models/Location";

export type Role = CreateMembershipRequest["role"];

export type Membership = Required<Required<GetOrganizationMembershipsResponse>["data"]>["memberships"][0];

export type Borough = NonNullable<Location["borough"]>;

export type Tag = Required<Required<GetTagsResponse>["data"]>["tags"][0];

export interface PaginationType {
	page: number;
	pageSize: number;
	totalCount: number;
}
