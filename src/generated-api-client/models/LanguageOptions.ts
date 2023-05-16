/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { InternationalizedText } from './InternationalizedText';
import type { Tag } from './Tag';

export type LanguageOptions = {
    languages?: Array<Tag>;
    additionalLanguageOptions?: Array<Tag>;
    note?: InternationalizedText;
};

