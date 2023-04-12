/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class OrganizationsService {

    /**
     * @returns any OK
     * @throws ApiError
     */
    public static getOrganizations(): CancelablePromise<{
        organizations?: Array<{
            identifier: string;
            name: string;
            description?: string | null;
            createdAt?: string;
            updatedAt?: string;
        }>;
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
        requestBody?: {
            name: string;
            description?: string;
        },
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
        organization?: {
            identifier: string;
            name: string;
            description?: string | null;
            createdAt?: string;
            updatedAt?: string;
        };
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
        requestBody?: {
            name?: string;
            description?: string;
        },
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
