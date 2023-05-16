/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Event } from '../models/Event';
import type { Location } from '../models/Location';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class DiscoverCulturalDataService {

    /**
     * @returns any OK
     * @throws ApiError
     */
    public static getEvents(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/events',
        });
    }

    /**
     * @returns any OK
     * @throws ApiError
     */
    public static getEventsToday(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/events/today',
        });
    }

    /**
     * @returns any OK
     * @throws ApiError
     */
    public static getEventsPast(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/events/past',
        });
    }

    /**
     * @param id The event ID
     * @returns Event OK
     * @throws ApiError
     */
    public static getEvents1(
        id: string,
    ): CancelablePromise<Array<Event>> {
        return __request(OpenAPI, {
            method: 'GET',
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
    public static getEventsEventDates(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
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
    public static getEventsEventDates1(
        id: string,
        dateId: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/events/{id}/event-dates/{date-id}',
            path: {
                'id': id,
                'date-id': dateId,
            },
        });
    }

    /**
     * @param id The event ID
     * @param dateId The event ID
     * @returns any OK
     * @throws ApiError
     */
    public static getEventsEventDatesICalendar(
        id: string,
        dateId: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/events/{id}/event-dates/{date-id}/iCalendar',
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
    public static getEventLocations(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/event-locations',
        });
    }

    /**
     * @param id The location ID
     * @returns Location OK
     * @throws ApiError
     */
    public static getEventLocations1(
        id: string,
    ): CancelablePromise<Location> {
        return __request(OpenAPI, {
            method: 'GET',
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
    public static getOrganizers(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/organizers',
        });
    }

    /**
     * @param id The organizer ID
     * @returns any OK
     * @throws ApiError
     */
    public static getOrganizers1(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
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

    /**
     * @param id The media ID
     * @returns any OK
     * @throws ApiError
     */
    public static getMedia(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/media/{id}',
            path: {
                'id': id,
            },
        });
    }

    /**
     * @param id The media ID
     * @returns any OK
     * @throws ApiError
     */
    public static getMediaData(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/media/{id}/data',
            path: {
                'id': id,
            },
        });
    }

}
