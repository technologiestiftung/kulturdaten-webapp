/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class UsersService {

    /**
     * @returns any OK
     * @throws ApiError
     */
    public static getUsers(): CancelablePromise<{
        users?: Array<{
            identifier: string;
            email: string;
            password?: string;
            firstName?: string;
            lastName?: string;
            createdAt?: string;
            updatedAt?: string;
            permissionFlags: number;
        }>;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/users',
        });
    }

    /**
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static postUsers(
        requestBody?: {
            email: string;
            password: string;
            firstName?: string;
            lastName?: string;
        },
    ): CancelablePromise<{
        identifier?: string;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/users',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                409: `Conflict`,
            },
        });
    }

    /**
     * @param identifier The user ID
     * @returns any OK
     * @throws ApiError
     */
    public static getUsers1(
        identifier: string,
    ): CancelablePromise<{
        user?: {
            identifier: string;
            email: string;
            password?: string;
            firstName?: string;
            lastName?: string;
            createdAt?: string;
            updatedAt?: string;
            permissionFlags: number;
        };
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/users/{identifier}',
            path: {
                'identifier': identifier,
            },
            errors: {
                404: `Not Found`,
            },
        });
    }

    /**
     * @param identifier The user ID
     * @param requestBody
     * @returns void
     * @throws ApiError
     */
    public static patchUsers(
        identifier: string,
        requestBody?: {
            email?: string;
            firstName?: string;
            lastName?: string;
            permissionFlags?: number;
        },
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/users/{identifier}',
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
     * @param identifier The user ID
     * @returns void
     * @throws ApiError
     */
    public static deleteUsers(
        identifier: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/users/{identifier}',
            path: {
                'identifier': identifier,
            },
            errors: {
                404: `Not Found`,
            },
        });
    }

}
