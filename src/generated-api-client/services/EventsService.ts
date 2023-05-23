/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateEvent } from '../models/CreateEvent';
import type { Event } from '../models/Event';
import type { PatchEvent } from '../models/PatchEvent';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class EventsService {

    /**
     * @returns any OK
     * @throws ApiError
     */
    public static getEvents(): CancelablePromise<{
        events?: Array<Event>;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/events',
        });
    }

    /**
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static postEvents(
        requestBody?: CreateEvent,
    ): CancelablePromise<{
        identifier?: string;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/events',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param identifier The event ID
     * @returns any OK
     * @throws ApiError
     */
    public static getEvents1(
        identifier: string,
    ): CancelablePromise<{
        event?: Event;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/events/{identifier}',
            path: {
                'identifier': identifier,
            },
            errors: {
                404: `Not Found`,
            },
        });
    }

    /**
     * @param identifier The event ID
     * @param requestBody
     * @returns void
     * @throws ApiError
     */
    public static patchEvents(
        identifier: string,
        requestBody?: PatchEvent,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/events/{identifier}',
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
     * @param identifier The event ID
     * @returns void
     * @throws ApiError
     */
    public static deleteEvents(
        identifier: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/events/{identifier}',
            path: {
                'identifier': identifier,
            },
            errors: {
                404: `Not Found`,
            },
        });
    }

}
