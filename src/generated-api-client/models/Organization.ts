/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Organization = ({
    context?: Organization.context;
    identifier: string;
    created?: string;
    updated?: string;
    kind?: Organization.kind;
    url?: string;
    origin?: {
        name?: string;
        originId?: string;
    };
} & {
    type?: Organization.type;
    name?: Record<string, string>;
    description?: Record<string, string>;
    address?: {
        type?: Organization.type;
        streetAddress?: string;
        addressLocality?: string;
        postalCode?: string;
        description?: string;
    };
    contactPoint?: Array<{
        type?: 'ContactPoint';
        name?: Record<string, string>;
        telephone?: string;
        email?: string;
    }>;
    website?: string;
    email?: string;
    telephone?: string;
    categories?: Array<{
        inDefinedTermSet?: Record<string, any>;
        term?: Record<string, string>;
    }>;
});

export namespace Organization {

    export enum context {
        KULTURDATEN_BERLIN_API_V1_SPEC = 'kulturdaten.berlin/api/v1/spec',
    }

    export enum kind {
        CULTURE = 'culture',
    }

    export enum type {
        ORGANIZATION = 'Organization',
    }


}

