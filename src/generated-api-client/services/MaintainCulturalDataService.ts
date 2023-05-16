/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class MaintainCulturalDataService {

    /**
     * @returns any OK
     * @throws ApiError
     */
    public static postEvents(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/events',
        });
    }

    /**
     * @returns any OK
     * @throws ApiError
     */
    public static postEventsBulkCreation(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/events/bulk-creation',
        });
    }

    /**
     * @param id The event ID
     * @returns any OK
     * @throws ApiError
     */
    public static patchEvents(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/events/{id}',
            path: {
                'id': id,
            },
        });
    }

    /**
     * @param id The event ID
     * @returns any OK
     * @throws ApiError
     */
    public static postEventsEventDates(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/events/{id}/event-dates',
            path: {
                'id': id,
            },
        });
    }

    /**
     * @param id The event ID
     * @param dateId The event ID
     * @returns any OK
     * @throws ApiError
     */
    public static patchEventsEventDates(
        id: string,
        dateId: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/events/{id}/event-dates/{date-id}',
            path: {
                'id': id,
                'date-id': dateId,
            },
        });
    }

    /**
     * @returns any OK
     * @throws ApiError
     */
    public static postEventLocations(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/event-locations',
        });
    }

    /**
     * @param id The location ID
     * @returns any OK
     * @throws ApiError
     */
    public static patchEventLocations(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/event-locations/{id}',
            path: {
                'id': id,
            },
        });
    }

    /**
     * @returns any OK
     * @throws ApiError
     */
    public static postOrganizers(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/organizers',
        });
    }

    /**
     * @param id The organizer ID
     * @returns any OK
     * @throws ApiError
     */
    public static patchOrganizers(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/organizers/{id}',
            path: {
                'id': id,
            },
        });
    }

    /**
     * @returns any OK
     * @throws ApiError
     */
    public static getKindsCultureTags(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/kinds/culture/tags',
        });
    }

}
