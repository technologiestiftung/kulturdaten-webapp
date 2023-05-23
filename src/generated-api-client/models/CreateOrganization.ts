/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type CreateOrganization = {
    name?: Record<string, string>;
    description?: Record<string, string>;
    address?: {
        type?: CreateOrganization.type;
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
    origin?: {
        name?: string;
        originId?: string;
    };
};

export namespace CreateOrganization {

    export enum type {
        POSTAL_ADDRESS = 'PostalAddress',
    }


}

