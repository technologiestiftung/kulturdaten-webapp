/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Audience } from './Audience';
import type { Categorization } from './Categorization';
import type { ExternalLink } from './ExternalLink';
import type { LanguageOptions } from './LanguageOptions';
import type { PeakHour } from './PeakHour';
import type { SpecialSensorStimuli } from './SpecialSensorStimuli';

export type AdditionalInformation = {
    categorization?: Categorization;
    languageOptions?: LanguageOptions;
    audience?: Audience;
    specialSensorStimuli?: SpecialSensorStimuli;
    peakHours?: Array<PeakHour>;
    externalLinks?: Array<ExternalLink>;
};

