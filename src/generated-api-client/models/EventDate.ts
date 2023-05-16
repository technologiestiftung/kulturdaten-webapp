/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { InternationalizedText } from './InternationalizedText';
import type { ShortInternationalizedText } from './ShortInternationalizedText';

export type EventDate = {
    id?: string;
    start?: string;
    end?: string;
    published?: boolean;
    cancelled?: boolean;
    additionalTitle?: ShortInternationalizedText;
    description?: ShortInternationalizedText;
    locationNote?: InternationalizedText;
    ticketLink?: string;
    registrationLink?: string;
};

