/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type CreateEvent = {
    type?: CreateEvent.type;
    title?: Record<string, string>;
    subTitle?: Record<string, string>;
    description?: Record<string, string>;
    shortDescription?: Record<string, string>;
    startDate?: string;
    endDate?: string;
    previousStartDate?: string;
    doorTime?: string;
    typicalAgeRange?: string;
    categories?: Array<{
        inDefinedTermSet?: Record<string, any>;
        term?: Record<string, string>;
    }>;
    keywords?: Array<{
        inDefinedTermSet?: Record<string, any>;
        term?: Record<string, string>;
    }>;
    inLanguages?: Array<string>;
    isAccessibleForFree?: boolean;
    sameAs?: string;
    visibility?: CreateEvent.visibility;
    eventStatus?: CreateEvent.eventStatus;
    eventAttendanceMode?: CreateEvent.eventAttendanceMode;
    location?: Array<Record<string, any>>;
    contactPoint?: Array<{
        type?: 'ContactPoint';
        name?: Record<string, string>;
        telephone?: string;
        email?: string;
    }>;
    organizedBy?: Record<string, any>;
    eventDates?: Array<{
        startDate?: string;
        endDate?: string;
        previousStartDate?: string;
    }>;
    homepage?: string;
    origin?: {
        name?: string;
        originId?: string;
    };
};

export namespace CreateEvent {

    export enum type {
        EVENT = 'Event',
        EVENT_SERIES = 'EventSeries',
        EXHIBITION_EVENT = 'ExhibitionEvent',
    }

    export enum visibility {
        PUBLISHED = 'published',
        UNPUBLISHED = 'unpublished',
        DRAFT = 'draft',
        ARCHIVED = 'archived',
        RESTRICTED = 'restricted',
    }

    export enum eventStatus {
        CANCELLED = 'cancelled',
        POSTPONED = 'postponed',
        RESCHEDULED = 'rescheduled',
        SCHEDULED = 'scheduled',
    }

    export enum eventAttendanceMode {
        OFFLINE = 'offline',
        ONLINE = 'online',
        MIXED = 'mixed',
    }


}

