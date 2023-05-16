/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type PatchEvent = {
    '@type'?: PatchEvent.'@type';
    kind?: PatchEvent.kind;
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
    visibility?: PatchEvent.visibility;
    eventStatus?: PatchEvent.eventStatus;
    eventAttendanceMode?: PatchEvent.eventAttendanceMode;
    location?: Array<Record<string, any>>;
    organizer?: Record<string, any>;
    subEvents?: Array<Record<string, any>>;
    superEvent?: Record<string, any>;
};

export namespace PatchEvent {

    export enum '@type' {
        EVENT = 'Event',
        EVENT_SERIES = 'EventSeries',
        EXHIBITION_EVENT = 'ExhibitionEvent',
    }

    export enum kind {
        CULTURE = 'culture',
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

