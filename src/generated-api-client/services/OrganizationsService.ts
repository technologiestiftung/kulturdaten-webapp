/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateOrganization } from '../models/CreateOrganization';
import type { Organization } from '../models/Organization';
import type { PatchOrganization } from '../models/PatchOrganization';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class OrganizationsService {

    /**
     * @returns any OK
     * @throws ApiError
     */
    public static getOrganizations(): CancelablePromise<{
        organizations?: Array<Organization>;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/organizations',
        });
    }

    /**
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static postOrganizations(
        requestBody?: CreateOrganization,
    ): CancelablePromise<{
        identifier?: string;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/organizations',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param identifier The organization ID
     * @returns any OK
     * @throws ApiError
     */
    public static getOrganizations1(
        identifier: string,
    ): CancelablePromise<{
        organization?: Organization;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/organizations/{identifier}',
            path: {
                'identifier': identifier,
            },
            errors: {
                404: `Not Found`,
            },
        });
    }

    /**
     * @param identifier The organization ID
     * @param requestBody
     * @returns void
     * @throws ApiError
     */
    public static patchOrganizations(
        identifier: string,
        requestBody?: PatchOrganization,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/organizations/{identifier}',
            path: {
                'identifier': identifier,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                404: `Not Found`,
            },
        });
    }

    /**
     * @param identifier The organization ID
     * @returns void
     * @throws ApiError
     */
    public static deleteOrganizations(
        identifier: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/organizations/{identifier}',
            path: {
                'identifier': identifier,
            },
            errors: {
                404: `Not Found`,
            },
        });
    }

}
