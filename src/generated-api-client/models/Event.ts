/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AdditionalInformation } from './AdditionalInformation';
import type { Admission } from './Admission';
import type { EventDate } from './EventDate';
import type { EventLocationReference } from './EventLocationReference';
import type { InternationalizedDescriptionText } from './InternationalizedDescriptionText';
import type { Media } from './Media';
import type { OrganizerReference } from './OrganizerReference';
import type { ShortInternationalizedText } from './ShortInternationalizedText';

export type Event = {
    kind: string;
    created?: string;
    updated?: string;
    published: boolean;
    visibility: Event.visibility;
    title: ShortInternationalizedText;
    subtitle?: ShortInternationalizedText;
    summary?: ShortInternationalizedText;
    description: InternationalizedDescriptionText;
    continuously: boolean;
    eventDates?: Array<EventDate>;
    locations: Array<EventLocationReference>;
    organizer: OrganizerReference;
    media?: Media;
    admission?: Admission;
    additionalInformation?: AdditionalInformation;
};

export namespace Event {

    export enum visibility {
        PUBLIC = 'public',
        PRIVATE = 'private',
    }


}

