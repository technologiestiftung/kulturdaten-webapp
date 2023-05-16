/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateUser } from '../models/CreateUser';
import type { PatchUser } from '../models/PatchUser';
import type { User } from '../models/User';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class UsersService {

    /**
     * @returns any OK
     * @throws ApiError
     */
    public static getUsers(): CancelablePromise<{
        users?: Array<User>;
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
        requestBody?: CreateUser,
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
        user?: User;
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
        requestBody?: PatchUser,
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
