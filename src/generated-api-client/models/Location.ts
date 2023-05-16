/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { InternationalizedDescriptionText } from './InternationalizedDescriptionText';
import type { ShortInternationalizedText } from './ShortInternationalizedText';

export type Location = {
    kind?: string;
    created?: string;
    updated?: string;
    published?: boolean;
    visibility?: Location.visibility;
    name?: ShortInternationalizedText;
    description?: InternationalizedDescriptionText;
};

export namespace Location {

    export enum visibility {
        PUBLIC = 'public',
        PRIVATE = 'private',
    }


}

