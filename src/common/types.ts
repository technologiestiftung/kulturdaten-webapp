import { GetOrganizationMembershipsResponse } from "@api/client/models/GetOrganizationMembershipsResponse";
import { Location } from "@api/client/models/Location";

export type Membership = Required<Required<GetOrganizationMembershipsResponse>["data"]>["memberships"][0];

export type Borough = NonNullable<Location["borough"]>;
