/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type PatchOrganization = {
    name?: Record<string, string>;
    description?: Record<string, string>;
    address?: {
        type?: PatchOrganization.type;
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
};

export namespace PatchOrganization {

    export enum type {
        POSTAL_ADDRESS = 'PostalAddress',
    }


}

