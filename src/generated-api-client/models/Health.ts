/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Health = {
    healthy?: boolean;
    dependencies?: Array<{
        name?: string;
        healthy?: boolean;
    }>;
};

