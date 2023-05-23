/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateLocation } from '../models/CreateLocation';
import type { Location } from '../models/Location';
import type { PatchLocation } from '../models/PatchLocation';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class LocationsService {

    /**
     * @returns any OK
     * @throws ApiError
     */
    public static getLocations(): CancelablePromise<{
        locations?: Array<Location>;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/locations',
        });
    }

    /**
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static postLocations(
        requestBody?: CreateLocation,
    ): CancelablePromise<{
        identifier?: string;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/locations',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param identifier The location ID
     * @returns any OK
     * @throws ApiError
     */
    public static getLocations1(
        identifier: string,
    ): CancelablePromise<{
        location?: Location;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/locations/{identifier}',
            path: {
                'identifier': identifier,
            },
            errors: {
                404: `Not Found`,
            },
        });
    }

    /**
     * @param identifier The location ID
     * @param requestBody
     * @returns void
     * @throws ApiError
     */
    public static patchLocations(
        identifier: string,
        requestBody?: PatchLocation,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/locations/{identifier}',
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
     * @param identifier The location ID
     * @returns void
     * @throws ApiError
     */
    public static deleteLocations(
        identifier: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/locations/{identifier}',
            path: {
                'identifier': identifier,
            },
            errors: {
                404: `Not Found`,
            },
        });
    }

}
